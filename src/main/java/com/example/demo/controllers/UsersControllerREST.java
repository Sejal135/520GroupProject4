package com.example.demo.controllers;

import com.example.demo.models.entities.*;
import com.example.demo.services.CommentsService;
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
    CommentsService commentsService;

    @Autowired
    GroupChatInfoService groupChatInfoService;

    @Autowired
    ExplorerHomepageService explorerHomepageService;

    @CrossOrigin
    @GetMapping("/GetPreferencesForUser")
    public List<Preferences> GetUserPreferences(@RequestParam int userId) {
        return usersService.FindPreferencesForUser(userId);
    }

    @CrossOrigin
    @PostMapping("/SetUserPreferences")
    public String SetUserPreferences(@RequestParam int userId, @RequestBody List<Preferences> userPreferences) {
        return usersService.SetUserPreferences(userPreferences, userId);
    }

    @CrossOrigin
    @GetMapping("/GetFavoriteDestinations")
    public List<FavoriteDestinations> GetFavoriteDestinations(@RequestParam int userId) {
        return usersService.FindFavoriteDestinationsForUser(userId);
    }

    @CrossOrigin
    @PostMapping("/SetFavoriteDestinations")
    public String SetFavoriteDestinations(@RequestParam int userId, @RequestBody List<Integer> favoritePlaceIds) {
        return usersService.SetFavoriteDestinations(favoritePlaceIds, userId);
    }

    @CrossOrigin
    @PostMapping("/CreateUser")
    public String CreateUser(@RequestBody Users user) {
        return usersService.CreateUser(user);
    }

    @CrossOrigin
    @GetMapping("/GetUserProfileInfo")
    public Users GetUserProfile(@RequestParam int userId) {
        return usersService.GetUserProfile(userId);
    }

    @CrossOrigin
    @GetMapping("/GetUserProfileByEmail")
    public Users GetUserProfileByEmail(@RequestParam String email) {
        return usersService.GetUserProfileByEmail(email);
    }

    @CrossOrigin
    @PostMapping("/FollowUser")
    public String FollowUser(@RequestParam int followerId, @RequestParam int userId) {
        return usersService.FollowUser(followerId, userId);
    }

    @CrossOrigin
    @PostMapping("/UnfollowUser")
    public String UnfollowUser(@RequestParam int followerId, @RequestParam int userId) {
        return usersService.UnfollowUser(followerId, userId);
    }

    @CrossOrigin
    @GetMapping("/GetFollowerCount")
    public Long GetFollowerCount(@RequestParam int userId) {
        return usersService.GetFollowerCount(userId);
    }

    @CrossOrigin
    @GetMapping("/GetUsersExplorerHomePageResults")
    public List<Reviews> GetPaginatedFeed(@RequestParam int userId, @RequestParam int page, @RequestParam int resultsPerPage, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")Date datePosted) {
        return explorerHomepageService.GetPaginatedFeed(datePosted, page, resultsPerPage, userId);
    }

    @CrossOrigin
    @GetMapping("/GetExplorerPageSuggestions")
    public List<Reviews> GetPaginatedExplorerFeed(@RequestParam int userId, @RequestParam int page, @RequestParam int resultsPerPage, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")Date datePosted) {
        return explorerHomepageService.GetPaginatedExplorerFeed(datePosted, page, resultsPerPage, userId);
    }

    @CrossOrigin
    @GetMapping("/GetItineraryInfoByItineraryId")
    public List<ItineraryItem> GetItineraryById(@RequestParam int itineraryId) {
        return usersService.GetAllItemsForAnItinerary(itineraryId);
    }

    @CrossOrigin
    @GetMapping("/GetItinerariesForUser")
    public List<List<ItineraryItem>> GetUserItinerariesById(@RequestParam int userId) {
        return usersService.GetAllItemsAUsersItineraries(userId);
    }

    @CrossOrigin
    @PostMapping("/CreateItinerary")
    public String CreateItinerary(@RequestParam int userId, @RequestParam String itineraryName, @RequestBody List<ItineraryItem> itineraryItems) {
        return usersService.AddItineraryToDatabase(userId, itineraryName, itineraryItems);
    }

    @CrossOrigin
    @DeleteMapping("/DeleteItinerary")
    public String DeleteItinerary(@RequestParam int referenceId) {
        return usersService.DeleteItineraryFromDatabase(referenceId);
    }

    @CrossOrigin
    @PostMapping("/AddItineraryItem")
    public String AddItineraryItem(@RequestParam int referenceId, @RequestBody ItineraryItem itemToAdd) {
        return usersService.AddItineraryItem(referenceId, itemToAdd);
    }

    @CrossOrigin
    @DeleteMapping("/DeleteItineraryItem")
    public String DeleteItineraryItem(@RequestParam int itineraryItemId) {
        return usersService.DeleteItineraryItem(itineraryItemId);
    }

    @CrossOrigin
    @PostMapping("/AddCommentToDatabase")
    public String AddCommentToDatabase(@RequestParam int userId, @RequestParam int reviewId, @RequestParam String commentContents) {
        return commentsService.AddCommentToDatabase(userId, reviewId, commentContents);
    }

    @CrossOrigin
    @DeleteMapping("/RemoveCommentFromDatabase")
    public String RemoveCommentFromDatabase(@RequestParam int commentId) {
        return commentsService.DeleteCommentFromDatabase(commentId);
    }

    @CrossOrigin
    @PostMapping("/AddUserToGroupChat")
    public String AddUserToGroupChat(@RequestParam int groupId, @RequestParam int userId){
        return groupChatInfoService.AddUserToGroupChat(userId, groupId);
    }
}
