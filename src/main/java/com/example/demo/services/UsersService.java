package com.example.demo.services;

import com.example.demo.models.entities.*;
import com.example.demo.models.repositories.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class UsersService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private PreferencesRepository preferencesRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private FavoritePlacesRepository favoritePlacesRepository;

    @Autowired
    private FollowersRepository followersRepository;

    @Autowired
    private ItineraryReferenceTableRepository itineraryReferenceTableRepository;

    @Autowired
    private ItineraryItemRepository itineraryItemRepository;

    @Transactional
    public List<Preferences> FindPreferencesForUser(int userId) {
        // gets preferences for a user
        String hql =
                "FROM Preferences preferences " +
                        "JOIN Users users ON users = preferences.userId " +
                        "WHERE users.userId = :userId";
        return entityManager.createQuery(hql, Preferences.class).setParameter("userId", userId).getResultList();
    }

    @Transactional
    public List<FavoriteDestinations> FindFavoriteDestinationsForUser(int userId) {
        // gets favorite destinations for a user
        String hql =
                "FROM FavoriteDestinations favoriteDestinations " +
                        "JOIN Users users ON users = favoriteDestinations.userId " +
                        "WHERE users.userId = :userId";
        return entityManager.createQuery(hql, FavoriteDestinations.class).setParameter("userId", userId).getResultList();
    }

    @Transactional
    public String SetUserPreferences(List<Preferences> preferencesList, int userId) {
        // a user can only set 5 preferences, verify that the user is not trying to set more than 5
        if (preferencesList.size() > 5) {
            return "Can only set a maximum of 5 preferences, you tried to set " + preferencesList.size() + " preferences.";
        }
        List<Preferences> preExistingPreferences = FindPreferencesForUser(userId);

        Users user = usersRepository.findByUserId(userId);

        // remove all pre-existing preferences left by the user
        for (Preferences preferece : preExistingPreferences) {
            preferencesRepository.deleteById(preferece.getPreferenceId());
        }

        // add all preferences submitted by the user to be updated
        for (Preferences preference : preferencesList) {
            Preferences newPreferences = new Preferences();
            newPreferences.setPreference(preference.getPreference());
            newPreferences.setUserId(user);
            preferencesRepository.save(newPreferences);
        }

        return "successfully edited preference list";
    }

    @Transactional
    public String SetFavoriteDestinations(List<Integer> favoritePlacesIds, int userId) {
        // only 5 or less favorite destinations can be set
        if (favoritePlacesIds.size() > 5) {
            return "Can only set a maximum of 5 favorite destinations, you tried to set " + favoritePlacesIds.size();
        }
        List<FavoriteDestinations> preExistingFavoriteDestinations = FindFavoriteDestinationsForUser(userId);

        Users user = usersRepository.findByUserId(userId);

        // remove all pre-existing favorite destinations for the user
        for (FavoriteDestinations destination : preExistingFavoriteDestinations) {
            favoritePlacesRepository.deleteById(destination.getFavoritePlaceEntryId());
        }

        // addd all destinations to be set by the user
        for (Integer favoritePlaceId : favoritePlacesIds) {
            FavoriteDestinations newDestination = new FavoriteDestinations();
            newDestination.setPlaceId(placeRepository.findByPlaceId(favoritePlaceId));
            newDestination.setUserId(user);
            favoritePlacesRepository.save(newDestination);
        }

        return "successfully edited favorite places list";
    }

    @Transactional
    public String CreateUser(Users user) {
        // set created at timestamp
        user.setCreatedAt(new Date());

        // store email in database as lowercase and without whitespace to make it easier to find in future queries
        user.setEmail(user.getEmail().trim().toLowerCase());

        //save user to database
        usersRepository.save(user);

        return "Successfully created user";
    }

    @Transactional
    public String EditUserProfile(int userId, String username, String profilePicture, String bio, String location) {
        // find user
        Users user = usersRepository.findByUserId(userId);

        // edit fields which should be saveable by the user
        user.setUsername(username);
        user.setProfilePic(profilePicture);
        user.setBio(bio);
        user.setLocation(location);
        // save the updated user to the database
        usersRepository.save(user);

        return "Successfully updated profile for user.";
    }

    // get user profile by userId
    @Transactional
    public Users GetUserProfile(int userId) {
        return usersRepository.findByUserId(userId);
    }

    @Transactional
    public Users GetUserProfileByEmail(String email) {
        // get users based by lowercase variant of email
        String hql =
                "FROM Users users " +
                        "WHERE LOWER(users.email) = LOWER(:email)";
        Users user = entityManager.createQuery(hql, Users.class).setParameter("email", email.trim()).getSingleResult();

        return user;
    }

    @Transactional
    public String FollowUser(int followerId, int posterId) {
        // Verify the user is not trying to follow themselves
        if (followerId == posterId) {
            return "You cannot follow yourself.";
        }

        // find both the user being followed and the user attempting to follow
        Users follower = usersRepository.findByUserId(followerId);

        Users poster = usersRepository.findByUserId(posterId);

        // verify that the user is not already following the poster
        String hql =
                "FROM Followers followers " +
                        "WHERE followers.followerId = :followerId " +
                        "AND followers.posterId = :posterId";
        List<Followers> followersList = entityManager.createQuery(hql, Followers.class).setParameter("followerId", follower).setParameter("posterId", poster).getResultList();

        if (followersList.size() != 0) {
            return "User is already following the poster";
        }

        // set followers object with appropriate fields and save to the database
        Followers followers = new Followers();
        followers.setFollowerId(follower);
        followers.setPosterId(poster);

        followersRepository.save(followers);
        return "User " + follower.getUsername() + " successfully followed " + poster.getUsername();
    }

    @Transactional
    public String UnfollowUser(int followerId, int posterId) {
        // verify the user is not trying to unfollow themselves
        if (followerId == posterId) {
            return "You cannot unfollow yourself";
        }

        // get both the poster and unfollower
        Users follower = usersRepository.findByUserId(followerId);

        Users poster = usersRepository.findByUserId(posterId);

        // find all instances where the user is unfollowing the other user
        String hql =
                "FROM Followers followers " +
                        "WHERE followers.followerId = :followerId " +
                        "AND followers.posterId = :posterId";
        List<Followers> followersList = entityManager.createQuery(hql, Followers.class).setParameter("followerId", follower).setParameter("posterId", poster).getResultList();

        // if the user attempting to unfollow is not following the poster, return the message stating so
        if (followersList.isEmpty()) {
            return "User is currently not following the poster";
        }

        // Delete follower from repository. Done as for-each loop in case somehow duplicate entries have been created
        // in the database
        for (Followers curFollower : followersList) {
            followersRepository.deleteById(curFollower.getFollowEntryId());
        }

        return "User " + follower.getUsername() + "successfully unfollowed " + poster.getUsername();
    }

    @Transactional
    public Long GetFollowerCount(int userId) {

        Users user = usersRepository.findByUserId(userId);
        // counts all instances of records in the database with posterId equal to userId
        String hql =
                "SELECT COUNT(*) FROM Followers followers " +
                        "WHERE followers.posterId = :userId";
        Query query = (Query) entityManager.createQuery(hql).setParameter("userId", user);
        Long count = (Long) query.getSingleResult();
        return count;
    }

    @Transactional
    public List<Followers> GetFollowedList(int userId) {

        // gets a list of everyone following the user
        Users user = usersRepository.findByUserId(userId);

        String hql =
                "FROM Followers followers " +
                        "WHERE followers.followerId = :userId";
        return entityManager.createQuery(hql, Followers.class).setParameter("userId", user).getResultList();
    }

    @Transactional
    public List<ItineraryItem> GetAllItemsForAnItinerary(int itineraryId) {
        // gets the itinerary reference and finds all foreign keys pointing to it in chronological order of items
        // scheduled in the itinerary
        ItineraryReferenceTable itineraryReference = itineraryReferenceTableRepository.findByItineraryId(itineraryId);

        return itineraryItemRepository.findAllByItineraryReferenceIdOrderByTimeItemAtAsc(itineraryReference);
    }

    @Transactional
    public List<List<ItineraryItem>> GetAllItemsAUsersItineraries(int userId) {
        // returns a list of all itineraries made by the user, in reverse chronological order of when the
        // record in the itinerary reference table was created.
        Users user = usersRepository.findByUserId(userId);

        List<ItineraryReferenceTable> allItineraries = itineraryReferenceTableRepository.findAllByUserForItineraryOrderByItineraryTimestampDesc(user);

        ArrayList<List<ItineraryItem>> itineraries = new ArrayList<List<ItineraryItem>>();

        for (ItineraryReferenceTable reference : allItineraries) {
            itineraries.add(itineraryItemRepository.findAllByItineraryReferenceIdOrderByTimeItemAtAsc(reference));
        }
        return itineraries;
    }

    @Transactional
    public String AddItineraryToDatabase(int userId, String itineraryName, List<ItineraryItem> itineraryItems) {
        // performs the logic of creating the itinerary reference, and adding the provided itineraryitems to the
        // itinerary items table

        Users user = usersRepository.findByUserId(userId);

        ItineraryReferenceTable reference = new ItineraryReferenceTable();

        reference.setItineraryName(itineraryName);

        reference.setItineraryTimestamp(new Date());

        reference.setUserForItinerary(user);

        itineraryReferenceTableRepository.save(reference);

        for (ItineraryItem item : itineraryItems) {
            item.setItineraryReferenceId(reference);
            itineraryItemRepository.save(item);
        }

        return "Successfully saved itinerary information to database";
    }

    @Transactional
    public String DeleteItineraryFromDatabase(int itineraryReferenceId) {
        // Deletes all itineraryIrmes with foreign key to reference, then the reference itself
        ItineraryReferenceTable reference = itineraryReferenceTableRepository.findByItineraryId(itineraryReferenceId);

        List<ItineraryItem> itineraryItems = itineraryItemRepository.findAllByItineraryReferenceIdOrderByTimeItemAtAsc(reference);

        for (ItineraryItem item : itineraryItems) {
            itineraryItemRepository.delete(item);
        }
        itineraryReferenceTableRepository.delete(reference);

        return "Successfully deleted itinerary";
    }

    @Transactional
    public String AddItineraryItem(int itineraryReferenceId, ItineraryItem item) {
        // adds an itinerary item in the proper spot provided the correct timestamp
        ItineraryReferenceTable reference = itineraryReferenceTableRepository.findByItineraryId(itineraryReferenceId);

        item.setItineraryReferenceId(reference);

        itineraryItemRepository.save(item);

        return "Successfully saved item to itinerary";
    }

    @Transactional
    public String DeleteItineraryItem(int itineraryItemId) {
        // deletes the provided itinerary item
        ItineraryItem item = itineraryItemRepository.findByItineraryItemId(itineraryItemId);

        itineraryItemRepository.delete(item);

        return "Successfully deleted itinerary item";
    }
}
