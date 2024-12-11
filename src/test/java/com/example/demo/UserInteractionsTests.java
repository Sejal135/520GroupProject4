package com.example.demo;

import com.example.demo.models.DestinationType;
import com.example.demo.models.TravelerTypes;
import com.example.demo.models.entities.*;
import com.example.demo.models.repositories.*;
import com.example.demo.services.*;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.util.*;

// Testing crud operations for ExplorerHomepageService. Uses an in-memory database created just for the purpose of this test
@Import(TestConfig.class)
@DataJpaTest
@AutoConfigureTestDatabase (connection = EmbeddedDatabaseConnection.H2)
public class UserInteractionsTests {

    @Autowired
    ExplorerHomepageService explorerHomepageService;

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    ReviewsRepository reviewsRepository;

    @Autowired
    UsersService usersService;

    @Autowired
    ReviewsService reviewsService;

    @Autowired
    PlaceRepository placeRepository;

    @Autowired
    PreferencesRepository preferencesRepository;


    @Test
    public void UserInteractionsExplorerHomepage() {
        // Arrange
        Users user1 = createUser("My username", "myemailexample@example.com");
        Users user2 = createUser("My username2", "myemailexample2@example.com");
        Users user3 = createUser("My username3", "myemailexample3@example.com");
        Users user4 = createUser("My username4", "myemailexample4@example.com");

        Places pizzaPlace = createPlace("Amherst House of Pizza", DestinationType.Dining);
        Places mountain = createPlace("Mount Baldface", DestinationType.Experiences);
        Places japan = createPlace("Hokkaido", DestinationType.Experiences);

        usersRepository.saveAll(List.of(user1, user2, user3, user4));
        placeRepository.saveAll(List.of(pizzaPlace, mountain, japan));

        Preferences user1Pref1 = createPreference(user1, TravelerTypes.ADVENTURE_TRAVELER);
        Preferences user1Pref2 = createPreference(user1, TravelerTypes.BUDGET_BACKPACKER);
        Preferences user2Pref1 = createPreference(user2, TravelerTypes.BUDGET_BACKPACKER);
        Preferences user2Pref2 = createPreference(user2, TravelerTypes.FESTIVAL_HOPPER);
        Preferences user4Pref1 = createPreference(user4, TravelerTypes.BEACH_BUM);

        preferencesRepository.saveAll(List.of(user1Pref1, user1Pref2, user2Pref1, user2Pref2, user4Pref1));

        reviewsService.AddReviewToDatabase(
                "Amherst House of Pizza - A Classic Local Gem",
                user1.getUserId(),
                pizzaPlace.getPlaceId(),
                "Amherst House of Pizza serves up delicious, no-frills comfort food..."
        );

        reviewsService.AddReviewToDatabase(
                "Mount Baldface - A Must-Hike in the Whites",
                user1.getUserId(),
                mountain.getPlaceId(),
                "Mount Baldface offers stunning panoramic views..."
        );

        reviewsService.AddReviewToDatabase(
                "My title",
                user3.getUserId(),
                japan.getPlaceId(),
                "Cool country"
        );

        // Act & Assert
        // Check shared preferences feed
        List<Reviews> paginatedFeed = explorerHomepageService.GetPaginatedExplorerFeed(new Date(), 1, 10, user2.getUserId());
        Assertions.assertThat(paginatedFeed)
                .hasSize(2)
                .extracting(Reviews::getTitle)
                .containsExactly(
                        "Mount Baldface - A Must-Hike in the Whites",
                        "Amherst House of Pizza - A Classic Local Gem"
                );

        // Check user with no shared preferences gets no results
        List<Reviews> totalFeed = explorerHomepageService.GetPaginatedExplorerFeed(new Date(), 1, 10, user4.getUserId());
        Assertions.assertThat(totalFeed).isEmpty();

        // Test follower functionality
        usersService.FollowUser(user2.getUserId(), user1.getUserId());
        Assertions.assertThat(usersService.GetFollowedList(user2.getUserId())).hasSize(1);
        Assertions.assertThat(usersService.GetFollowerCount(user1.getUserId())).isEqualTo(1);

        // Check feed of followed user reviews
        List<Reviews> followedFeed = explorerHomepageService.GetPaginatedFeed(new Date(), 1, 10, user2.getUserId());
        Assertions.assertThat(followedFeed)
                .hasSize(2)
                .allMatch(review -> review.getReviewerId().getUserId().equals(user1.getUserId()));

        // Test unfollow functionality
        usersService.UnfollowUser(user2.getUserId(), user1.getUserId());
        Assertions.assertThat(usersService.GetFollowedList(user2.getUserId())).isEmpty();
        Assertions.assertThat(explorerHomepageService.GetPaginatedFeed(new Date(), 1, 10, user2.getUserId())).isEmpty();

        // Test delete review from database

        Reviews testReviewDelete = paginatedFeed.getFirst();

        String deleteReviewResponse = reviewsService.DeleteReviewFromDatabase(testReviewDelete.getReviewId());

        Assertions.assertThat(deleteReviewResponse).isEqualTo("Successfully removed review from repository.");

        Assertions.assertThat(reviewsRepository.findByReviewId(testReviewDelete.getReviewId())).isNull();;

        // test find all reviewsForAPlace

        Reviews testReview = paginatedFeed.get(1);

        List<Reviews> reviewList = reviewsService.FindAllReviewsForPlace(testReview.getPlaceId().getPlaceId(), 5, 1, new Date());

        Assertions.assertThat(reviewList)
                .hasSize(1)
                .extracting(Reviews::getTitle)
                .containsExactly("Amherst House of Pizza - A Classic Local Gem");

        // test find all reviews for a user

        List<Reviews> userReviewsList = reviewsService.FindAllReviewsForUser(user1.getUserId(), 5, 1, new Date());

        Assertions.assertThat(userReviewsList)
                .hasSize(1)
                .extracting(Reviews::getTitle)
                .containsExactly("Amherst House of Pizza - A Classic Local Gem");
    }


    @Test
    public void UsersInteractionsFavoriteDestinationsAndPreferences() {
        // Arrange
        Users user1 = createUser("My username", "myemailexample@example.com");
        Users user2 = createUser("My username2", "myemailexample2@example.com");
        Users user3 = createUser("My username3", "myemailexample3@example.com");
        Users user4 = createUser("My username4", "myemailexample4@example.com");

        Places pizzaPlace = createPlace("Amherst House of Pizza", DestinationType.Dining);
        Places mountain = createPlace("Mount Baldface", DestinationType.Experiences);
        Places newYork = createPlace("New York City", DestinationType.Sightseeing);
        Places museum = createPlace("Museum of Science in Boston", DestinationType.Misc);
        Places japan = createPlace("Hokkaido", DestinationType.Experiences);
        Places myHouse = createPlace("My House", DestinationType.Misc);

        usersRepository.saveAll(Arrays.asList(user1, user2, user3, user4));
        placeRepository.saveAll(Arrays.asList(pizzaPlace, mountain, newYork, museum, japan, myHouse));

        Preferences user1Preference1 = createPreference(user1, TravelerTypes.ADVENTURE_TRAVELER);
        Preferences user1Preference2 = createPreference(user1, TravelerTypes.BUDGET_BACKPACKER);
        Preferences user2Preferences1 = createPreference(user2, TravelerTypes.BUDGET_BACKPACKER);
        Preferences user2Preferences2 = createPreference(user2, TravelerTypes.FESTIVAL_HOPPER);
        Preferences user4Preferences1 = createPreference(user4, TravelerTypes.BEACH_BUM);

        preferencesRepository.saveAll(Arrays.asList(user1Preference1, user1Preference2, user2Preferences1, user2Preferences2, user4Preferences1));

        // Test overflow preferences
        Preferences overFlowPreferences1 = createPreference(user1, TravelerTypes.HISTORY_BUFF);
        Preferences overFlowPreferences2 = createPreference(user1, TravelerTypes.CULTURAL_ENTHUSIAST);

        ArrayList<Preferences> testList = new ArrayList<>(Arrays.asList(
                user1Preference1, user1Preference2, user2Preferences2, user4Preferences1, overFlowPreferences1, overFlowPreferences2
        ));

        String response = usersService.SetUserPreferences(testList, user1.getUserId());
        Assertions.assertThat(response).isEqualTo("Can only set a maximum of 5 preferences, you tried to set 6 preferences.");

        // Successful preferences update
        ArrayList<Preferences> testList2 = new ArrayList<>(Arrays.asList(
                user1Preference2, overFlowPreferences1, overFlowPreferences2
        ));

        String newResponse = usersService.SetUserPreferences(testList2, user1.getUserId());
        Assertions.assertThat(newResponse).isEqualTo("successfully edited preference list");

        List<Preferences> preferencesList = usersService.FindPreferencesForUser(user1.getUserId());
        Assertions.assertThat(preferencesList).hasSize(3);

        // Test favorite destinations
        ArrayList<Integer> favoriteIdList = new ArrayList<>(Arrays.asList(
                pizzaPlace.getPlaceId(), mountain.getPlaceId(), newYork.getPlaceId(), museum.getPlaceId(), japan.getPlaceId()
        ));

        String favoriteStatus = usersService.SetFavoriteDestinations(favoriteIdList, user1.getUserId());
        Assertions.assertThat(usersService.FindFavoriteDestinationsForUser(user1.getUserId())).hasSize(5);
        Assertions.assertThat(favoriteStatus).isEqualTo("successfully edited favorite places list");

        favoriteIdList.add(myHouse.getPlaceId());
        String overflowFavoriteStatus = usersService.SetFavoriteDestinations(favoriteIdList, user1.getUserId());
        Assertions.assertThat(usersService.FindFavoriteDestinationsForUser(user1.getUserId())).hasSize(5);
        Assertions.assertThat(overflowFavoriteStatus).isEqualTo("Can only set a maximum of 5 favorite destinations, you tried to set 6");
    }

    @Test
    public void TestUserMethods() {

        //Create the initial user using the create user method in the service
        Users user1 = createUser("user1", "user1@gmail.com");
        String firstResponse = usersService.CreateUser(user1);

        // Test if the returned string is expected and the user exists in the database
        Assertions.assertThat(firstResponse).isEqualTo("Successfully created user");

        // Check users table directly
        Users returnedUser = usersRepository.findByUserId(user1.getUserId());
        Assertions.assertThat(returnedUser.getUsername()).isEqualTo("user1");
        Assertions.assertThat(returnedUser.getEmail()).isEqualTo("user1@gmail.com");

        // Check if the user returned by the user service's GetUserProfile method has the same properties as the returned user
        Users comparisonUser = usersService.GetUserProfile(user1.getUserId());
        Assertions.assertThat(comparisonUser.getEmail()).isEqualTo("user1@gmail.com");
        Assertions.assertThat(comparisonUser.getUsername()).isEqualTo("user1");
        Assertions.assertThat(comparisonUser.getUserId()).isEqualTo(user1.getUserId());

        // Check edit functionality of the users repository
        String secondResponse = usersService.EditUserProfile(user1.getUserId(), "user1NewUserName",
                null, "my new bio", "my house");

        Users getEditedProfile = usersRepository.findByUserId(user1.getUserId());
        Assertions.assertThat(getEditedProfile.getUserId()).isEqualTo(user1.getUserId());
        Assertions.assertThat(getEditedProfile.getUsername()).isEqualTo("user1NewUserName");
        Assertions.assertThat(getEditedProfile.getProfilePic()).isNull();
        Assertions.assertThat(getEditedProfile.getBio()).isEqualTo("my new bio");
        Assertions.assertThat(getEditedProfile.getLocation()).isEqualTo("my house");

        // check get user profile by email. It should be the case that the passed email shouldn't contain whitespace
        // and that the passed email is robust to capitalization differences
        Users getProfileByEmail = usersService.GetUserProfileByEmail("    usEr1@GmaIL.CoM   ");
        Assertions.assertThat(getProfileByEmail.getUserId()).isEqualTo(user1.getUserId());
        Assertions.assertThat(getProfileByEmail.getUsername()).isEqualTo("user1NewUserName");
        Assertions.assertThat(getProfileByEmail.getProfilePic()).isNull();
        Assertions.assertThat(getProfileByEmail.getBio()).isEqualTo("my new bio");
        Assertions.assertThat(getProfileByEmail.getLocation()).isEqualTo("my house");
    }

    @Test
    public void TestItineraryMethods(){

        // Set up the initial data, create a user to link an itinerary to
        Users user1 = createUser("user1", "user1@gmail.com");
        usersRepository.save(user1);

        // Create itinerary for user using UsersService

        ItineraryItem item1 = createItineraryItem(null, "Activity 1", "Activity 1 desc");

        ItineraryItem item2 = createItineraryItem(null, "Activity 2", "Activity 2 desc");

        ItineraryItem item3 = createItineraryItem(null, "Activity 3", "Activity 3 desc");

        ArrayList<ItineraryItem> listOfItineraryItems = new ArrayList<>(Arrays.asList(item1, item2, item3));

        String itineraryResponse = usersService.AddItineraryToDatabase(user1.getUserId(),
                "My activities plans", listOfItineraryItems);

        Assertions.assertThat(itineraryResponse).isEqualTo("Successfully saved itinerary information to database");

        // Attempt to get itinerary just added to database

        // test getting all itineraries on this one
        List<List<ItineraryItem>> usersItineraryItems = usersService.GetAllItemsAUsersItineraries(user1.getUserId());

        Assertions.assertThat(usersItineraryItems).hasSize(1);

        List<ItineraryItem> activityItinerary = usersItineraryItems.getFirst();

        Assertions.assertThat(activityItinerary)
                .hasSize(3)
                .extracting(ItineraryItem::getItineraryItemHeader)
                .containsExactly("Activity 1", "Activity 2", "Activity 3");

        // Attempt to add a new ItineraryItem to the database.

        int itineraryReferenceId = activityItinerary.getFirst().getItineraryReferenceId().getItineraryId();

        ItineraryItem item4 = createItineraryItem(null, "Activity 4", "Activity 4 desc");

        String addItineraryResponse = usersService.AddItineraryItem(itineraryReferenceId, item4);

        Assertions.assertThat(addItineraryResponse).isEqualTo("Successfully saved item to itinerary");

        List<ItineraryItem> activityItineraryRemovedItem = usersService.GetAllItemsForAnItinerary(itineraryReferenceId);

        Assertions.assertThat(activityItineraryRemovedItem)
                .hasSize(4)
                .extracting(ItineraryItem::getItineraryItemHeader)
                .containsExactly("Activity 1", "Activity 2", "Activity 3", "Activity 4");

        // Attempt to remove itinerary item from the database

        String removeItineraryResponse = usersService.DeleteItineraryItem(activityItinerary.get(2).getItineraryItemId());

        Assertions.assertThat(removeItineraryResponse).isEqualTo("Successfully deleted itinerary item");

        // test getting itinerary with itinerary item removed directly from the id
        List<ItineraryItem> itineraryItemsThirdItemRemoved = usersService.GetAllItemsForAnItinerary(itineraryReferenceId);

        Assertions.assertThat(itineraryItemsThirdItemRemoved)
                .hasSize(3)
                .extracting(ItineraryItem::getItineraryItemHeader)
                .containsExactly("Activity 1", "Activity 2", "Activity 4");

        // test deleting entire itinerary

        String deleteResponse = usersService.DeleteItineraryFromDatabase(itineraryReferenceId);

        Assertions.assertThat(deleteResponse).isEqualTo("Successfully deleted itinerary");

        List<List<ItineraryItem>> emptyItinerary = usersService.GetAllItemsAUsersItineraries(user1.getUserId());

        Assertions.assertThat(emptyItinerary).isEmpty();;
    }



    private Users createUser(String username, String email) {
        Users user = new Users();
        user.setUsername(username);
        user.setEmail(email);
        user.setBio("My bio");
        user.setLocation("My house");
        user.setCreatedAt(new Date());
        user.setBirthDay(new Date());
        return user;
    }

    private Places createPlace(String name, DestinationType type) {
        Places place = new Places();
        place.setPlaceName(name);
        place.setPlaceType(type);
        return place;
    }

    private Preferences createPreference(Users user, TravelerTypes type) {
        Preferences preference = new Preferences();
        preference.setUserId(user);
        preference.setPreference(type);
        return preference;
    }

    private ItineraryItem createItineraryItem(ItineraryReferenceTable reference, String header, String description) {
        ItineraryItem item = new ItineraryItem();
        item.setItineraryReferenceId(reference);
        item.setItineraryItemHeader(header);
        item.setItineraryItemDescription(description);
        item.setTimeItemAt(new Date());
        return item;
    }

    private ItineraryReferenceTable createItineraryReferenceTable(Users user, String name) {
        ItineraryReferenceTable table = new ItineraryReferenceTable();
        table.setUserForItinerary(user);
        table.setItineraryTimestamp(new Date());
        table.setItineraryName(name);
        return table;
    }


}
