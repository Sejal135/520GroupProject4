package com.example.demo.controllers;

import com.example.demo.models.entities.*;
import com.example.demo.services.ExplorerHomepageService;
import com.example.demo.services.GroupChatInfoService;
import com.example.demo.services.UsersService;
import com.nimbusds.oauth2.sdk.auth.JWTAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
public class UsersControllerREST {

    @Autowired
    UsersService usersService;

    @Autowired
    ExplorerHomepageService explorerHomepageService;

    @GetMapping("/GetPreferencesForUser")
    public List<Preferences> GetUserPreferences(@RequestParam int userId) {
        return usersService.FindPreferencesForUser(userId);
    }

    @PostMapping("/SetUserPreferences")
    public String SetUserPreferences(@RequestParam int userId, @RequestBody List<Preferences> userPreferences) {
        return usersService.SetUserPreferences(userPreferences, userId);
    }

    @GetMapping("/GetFavoriteDestinations")
    public List<FavoriteDestinations> GetFavoriteDestinations(@RequestParam int userId) {
        return usersService.FindFavoriteDestinationsForUser(userId);
    }

    @PostMapping("/SetFavoriteDestinations")
    public String SetFavoriteDestinations(@RequestParam int userId, @RequestBody List<Integer> favoritePlaceIds) {
        return usersService.SetFavoriteDestinations(favoritePlaceIds, userId);
    }

    @PostMapping("/CreateUser")
    public String CreateUser(@RequestBody Users user) {
        return usersService.CreateUser(user);
    }

    @GetMapping("/GetUserProfileInfo")
    public Users GetUserProfile(@RequestParam int userId) {
        return usersService.GetUserProfile(userId);
    }

    @PostMapping("/FollowUser")
    public String FollowUser(@RequestParam int followerId, @RequestParam int userId) {
        return usersService.FollowUser(followerId, userId);
    }

    @PostMapping("/UnfollowUser")
    public String UnfollowUser(@RequestParam int followerId, @RequestParam int userId) {
        return usersService.UnfollowUser(followerId, userId);
    }

    @GetMapping("/GetFollowerCount")
    public Long GetFollowerCount(@RequestParam int userId) {
        return usersService.GetFollowerCount(userId);
    }

    @GetMapping("/GetUsersExplorerHomePageResults")
    public List<Reviews> GetPaginatedFeed(@RequestParam int userId, @RequestParam int page, @RequestParam int resultsPerPage, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")Date datePosted) {
        return explorerHomepageService.GetPaginatedFeed(datePosted, page, resultsPerPage, userId);
    }

    @GetMapping("/GetItineraryInfoByItineraryId")
    public List<ItineraryItem> GetItineraryById(@RequestParam int itineraryId) {
        return usersService.GetAllItemsForAnItinerary(itineraryId);
    }

    @GetMapping("/GetItinerariesForUser")
    public List<List<ItineraryItem>> GetUserItinerariesById(@RequestParam int userId) {
        return usersService.GetAllItemsAUsersItineraries(userId);
    }

    @PostMapping("/CreateItinerary")
    public String CreateItinerary(@RequestParam int userId, @RequestParam String itineraryName, @RequestBody List<ItineraryItem> itineraryItems) {
        return usersService.AddItineraryToDatabase(userId, itineraryName, itineraryItems);
    }

    @DeleteMapping("/DeleteItinerary")
    public String DeleteItinerary(@RequestParam int referenceId) {
        return usersService.DeleteItineraryFromDatabase(referenceId);
    }

    @PostMapping("/AddItineraryItem")
    public String AddItineraryItem(@RequestParam int referenceId, @RequestBody ItineraryItem itemToAdd) {
        return usersService.AddItineraryItem(referenceId, itemToAdd);
    }

    @DeleteMapping("/DeleteItineraryItem")
    public String DeleteItineraryItem(@RequestParam int itineraryItemId) {
        return usersService.DeleteItineraryItem(itineraryItemId);
    }
}
