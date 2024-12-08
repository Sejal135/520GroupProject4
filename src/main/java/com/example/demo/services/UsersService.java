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
        String hql =
                "FROM Preferences preferences " +
                        "JOIN Users users ON users = preferences.userId " +
                        "WHERE users.userId = :userId";
        return entityManager.createQuery(hql, Preferences.class).setParameter("userId", userId).getResultList();
    }

    @Transactional
    public List<FavoriteDestinations> FindFavoriteDestinationsForUser(int userId) {
        String hql =
                "FROM FavoriteDestinations favoriteDestinations " +
                        "JOIN Users users ON users = favoriteDestinations.userId " +
                        "WHERE users.userId = :userId";
        return entityManager.createQuery(hql, FavoriteDestinations.class).setParameter("userId", userId).getResultList();
    }

    @Transactional
    public String SetUserPreferences(List<Preferences> preferencesList, int userId) {
        if (preferencesList.size() > 5) {
            return "Can only set a maximum of 5 preferences, you tried to set " + preferencesList.size() + " preferences.";
        }
        List<Preferences> preExistingPreferences = FindPreferencesForUser(userId);

        Users user = usersRepository.findByUserId(userId);

        for (Preferences preferece : preExistingPreferences) {
            preferencesRepository.deleteById(preferece.getPreferenceId());
        }

        for (Preferences preference : preferencesList) {
            preference.setUserId(user);
            preferencesRepository.save(preference);
        }

        return "successfully edited preference list";
    }

    @Transactional
    public String SetFavoriteDestinations(List<Integer> favoritePlacesIds, int userId) {
        if (favoritePlacesIds.size() > 5) {
            return "Can only set a maximum of 5 favorite destinations, you tried to set " + favoritePlacesIds.size();
        }
        List<FavoriteDestinations> preExistingFavoriteDestinations = FindFavoriteDestinationsForUser(userId);

        Users user = usersRepository.findByUserId(userId);

        for (FavoriteDestinations destination : preExistingFavoriteDestinations) {
            favoritePlacesRepository.deleteById(destination.getFavoritePlaceEntryId());
        }

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
        user.setCreatedAt(new Date());

        user.setEmail(user.getEmail().trim().toLowerCase());

        usersRepository.save(user);

        return "Successfully created user";
    }

    @Transactional
    public Users GetUserProfile(int userId) {
        return usersRepository.findByUserId(userId);
    }

    @Transactional
    public Users GetUserProfileByEmail(String email) {
        String hql =
                "FROM Users users " +
                        "WHERE LOWER(users.email) = LOWER(:email)";
        Users user = entityManager.createQuery(hql, Users.class).setParameter("email", email.trim()).getSingleResult();

        return user;
    }

    @Transactional
    public String FollowUser(int followerId, int posterId) {
        if (followerId == posterId) {
            return "You cannot follow yourself.";
        }

        Users follower = usersRepository.findByUserId(followerId);

        Users poster = usersRepository.findByUserId(posterId);

        String hql =
                "FROM Followers followers " +
                        "WHERE followers.followerId = :followerId " +
                        "AND followers.posterId = :posterId";
        List<Followers> followersList = entityManager.createQuery(hql, Followers.class).setParameter("followerId", follower).setParameter("posterId", poster).getResultList();

        if (followersList.size() != 0) {
            return "User is already following the poster";
        }

        Followers followers = new Followers();
        followers.setFollowerId(follower);
        followers.setPosterId(poster);

        followersRepository.save(followers);
        return "User " + follower.getUsername() + " successfully followed " + poster.getUsername();
    }

    @Transactional
    public String UnfollowUser(int followerId, int posterId) {
        if (followerId == posterId) {
            return "You cannot unfollow yourself";
        }

        Users follower = usersRepository.findByUserId(followerId);

        Users poster = usersRepository.findByUserId(posterId);

        String hql =
                "FROM Followers followers " +
                        "WHERE followers.followerId = :followerId " +
                        "AND followers.posterId = :posterId";
        List<Followers> followersList = entityManager.createQuery(hql, Followers.class).setParameter("followerId", follower).setParameter("posterId", poster).getResultList();

        if (followersList.isEmpty()) {
            return "User is currently not following the poster";
        }

        for (Followers curFollower : followersList) {
            followersRepository.deleteById(curFollower.getFollowEntryId());
        }

        return "User " + follower.getUsername() + "successfully unfollowed " + poster.getUsername();
    }

    @Transactional
    public Long GetFollowerCount(int userId) {

        Users user = usersRepository.findByUserId(userId);

        String hql =
                "SELECT COUNT(*) FROM Followers followers " +
                        "WHERE followers.posterId = :userId";
        Query query = (Query) entityManager.createQuery(hql).setParameter("userId", user);
        Long count = (Long) query.getSingleResult();
        return count;
    }

    @Transactional
    public List<Followers> GetFollowedList(int userId) {

        Users user = usersRepository.findByUserId(userId);

        String hql =
                "FROM Followers followers " +
                        "WHERE followers.followerId = :userId";
        return entityManager.createQuery(hql, Followers.class).setParameter("userId", user).getResultList();
    }

    @Transactional
    public List<ItineraryItem> GetAllItemsForAnItinerary(int itineraryId) {

        ItineraryReferenceTable itineraryReference = itineraryReferenceTableRepository.findByItineraryId(itineraryId);

        return itineraryItemRepository.findAllByItineraryReferenceIdOrderByTimeItemAtAsc(itineraryReference);
    }

    @Transactional
    public List<List<ItineraryItem>> GetAllItemsAUsersItineraries(int userId) {

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
        ItineraryReferenceTable reference = itineraryReferenceTableRepository.findByItineraryId(itineraryReferenceId);

        item.setItineraryReferenceId(reference);

        itineraryItemRepository.save(item);

        return "Successfully saved item to itinerary";
    }

    @Transactional
    public String DeleteItineraryItem(int itineraryItemId) {
        ItineraryItem item = itineraryItemRepository.findByItineraryItemId(itineraryItemId);

        itineraryItemRepository.delete(item);

        return "Successfully deleted itinerary item";
    }
}
