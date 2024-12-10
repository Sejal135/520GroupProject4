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

import java.util.Date;
import java.util.List;

// Testing crud operations for ExplorerHomepageService. Uses an in-memory database created just for the purpose of this test
@Import(TestConfig.class)
@DataJpaTest
@AutoConfigureTestDatabase (connection = EmbeddedDatabaseConnection.H2)
public class ExplorerHomepageServiceTests {

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
    public void ExplorerHomepageService() {

        // Arrange
        Users user1 = new Users();
        user1.setLocation("My house");
        user1.setBio("My bio");
        user1.setEmail("myemailexample@example.com");
        user1.setBirthDay(new Date());
        user1.setCreatedAt(new Date());
        user1.setUsername("My username");

        Users user2 = new Users();
        user2.setLocation("My house");
        user2.setBio("My bio");
        user2.setEmail("myemailexample2@example.com");
        user2.setBirthDay(new Date());
        user2.setCreatedAt(new Date());
        user2.setUsername("My username2");

        Users user3 = new Users();
        user3.setLocation("My house");
        user3.setBio("My bio");
        user3.setEmail("myemailexample3@example.com");
        user3.setBirthDay(new Date());
        user3.setCreatedAt(new Date());
        user3.setUsername("My username3");

        Users user4 = new Users();
        user4.setLocation("My house");
        user4.setBio("My bio");
        user4.setEmail("myemailexample4@example.com");
        user4.setBirthDay(new Date());
        user4.setCreatedAt(new Date());
        user4.setUsername("My username4");

        Users user5 = new Users();
        user5.setLocation("My house");
        user5.setBio("My bio");
        user5.setEmail("myemailexample5@example.com");
        user5.setBirthDay(new Date());
        user5.setCreatedAt(new Date());
        user5.setUsername("My username5");

        Users user6 = new Users();
        user6.setLocation("My house");
        user6.setBio("My bio");
        user6.setEmail("myemailexample6@example.com");
        user6.setBirthDay(new Date());
        user6.setCreatedAt(new Date());
        user6.setUsername("My username6");

        Users user7 = new Users();
        user7.setLocation("My house");
        user7.setBio("My bio");
        user7.setEmail("myemailexample7@example.com");
        user7.setBirthDay(new Date());
        user7.setCreatedAt(new Date());
        user7.setUsername("My username7");

        Users user8 = new Users();
        user8.setLocation("My house");
        user8.setBio("My bio");
        user8.setEmail("myemailexample8@example.com");
        user8.setBirthDay(new Date());
        user8.setCreatedAt(new Date());
        user8.setUsername("My username8");

        Places pizzaPlace = new Places();
        pizzaPlace.setPlaceType(DestinationType.Dining);
        pizzaPlace.setPlaceName("Amherst House of Pizza");

        Places mountain = new Places();
        mountain.setPlaceType(DestinationType.Experiences);
        mountain.setPlaceName("Mount Baldface");

        Places newYork = new Places();
        newYork.setPlaceType(DestinationType.Sightseeing);
        newYork.setPlaceName("New York City");

        Places museum = new Places();
        museum.setPlaceType(DestinationType.Misc);
        museum.setPlaceName("Museum of Science in Boston");

        Places japan = new Places();
        japan.setPlaceType(DestinationType.Experiences);
        japan.setPlaceName("Hokkaido");

        Places myHouse = new Places();
        myHouse.setPlaceType(DestinationType.Misc);
        myHouse.setPlaceName("My House");

        // Act
        usersRepository.save(user1);
        usersRepository.save(user2);
        usersRepository.save(user3);
        usersRepository.save(user4);
        usersRepository.save(user5);
        usersRepository.save(user6);
        usersRepository.save(user7);
        usersRepository.save(user8);

        placeRepository.save(pizzaPlace);
        placeRepository.save(mountain);
        placeRepository.save(newYork);
        placeRepository.save(museum);
        placeRepository.save(japan);
        placeRepository.save(myHouse);

        // Set preferences for testing one or more common preference

        Preferences user1Preference1 = new Preferences();
        user1Preference1.setUserId(user1);
        user1Preference1.setPreference(TravelerTypes.ADVENTURE_TRAVELER);

        Preferences user1Preference2 = new Preferences();
        user1Preference2.setUserId(user1);
        user1Preference2.setPreference(TravelerTypes.BUDGET_BACKPACKER);

        Preferences user2Preferences1 = new Preferences();
        user2Preferences1.setUserId(user2);
        user2Preferences1.setPreference(TravelerTypes.BUDGET_BACKPACKER);

        Preferences user2Preferences2 = new Preferences();
        user2Preferences2.setUserId(user2);
        user2Preferences2.setPreference(TravelerTypes.FESTIVAL_HOPPER);

        //Act
        preferencesRepository.save(user1Preference1);
        preferencesRepository.save(user1Preference2);
        preferencesRepository.save(user2Preferences1);
        preferencesRepository.save(user2Preferences2);


        //Cases to test.
        // User shares no travel type preferences, but both have left a review on the same location. Should not return anything
        // Two users share one or more preferenecs, should return reviews.
        // User shares one or more preferences with multiple other people. All of their reviews are returned.

        reviewsService.AddReviewToDatabase("Amherst House of Pizza - A Classic Local Gem", user1.getUserId(), pizzaPlace.getPlaceId(), "Amherst House of Pizza serves up delicious, " +
                "no-frills comfort food with their standout crispy-crust pizzas and generous portions. The menu offers great variety, including calzones, subs, and pasta, " +
                "all at affordable prices. The staff is friendly and efficient, though it can get busy during peak hours. The cozy, casual vibe makes it a great spot for families and " +
                "locals alike. If you’re in Amherst, this spot is worth a visit!");

        reviewsService.AddReviewToDatabase("Mount Baldface - A Must-Hike in the Whites", user1.getUserId(), mountain.getPlaceId(), "Mount Baldface offers stunning panoramic views and " +
                "an unforgettable ridgeline experience. The 9.8-mile loop is challenging, with steep sections and rocky terrain, but the vistas of the Presidential Range make it worthwhile. Perfect for " +
                "experienced hikers, this trail is a White Mountains gem.");


        List<Reviews> paginatedFeed = explorerHomepageService.GetPaginatedExplorerFeed(new Date(), 1, 10, user2.getUserId());

        Assertions.assertThat(paginatedFeed.size() == 2 && paginatedFeed.get(0).getTitle().equals("Amherst House of Pizza - A Classic Local Gem") && paginatedFeed.get(1).getTitle().equals("Mount Baldface - A Must-Hike in the Whites"));

        // Neither user is following the other. Calling

        // explorerHomepageService.GetPaginatedFeed()







    }


}
