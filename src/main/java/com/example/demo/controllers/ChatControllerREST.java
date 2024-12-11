package com.example.demo.controllers;

import com.example.demo.services.GroupChatInfoService;
import com.example.demo.models.entities.GroupChats;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ChatControllerREST {

    @Autowired
    GroupChatInfoService groupChatInfoService;

    // See REST API documentation on all relevant endpoints

    @CrossOrigin
    @GetMapping("/GetAllGroupChatsInfo")
    public List<GroupChats> listAllGroupChatMessages(@RequestParam int resultsPerPage, @RequestParam int page) {
        List<GroupChats> groupChatsList = groupChatInfoService.findGroupChatsWithHqlQuery(resultsPerPage, page);
        return groupChatsList;
    }

    @CrossOrigin
    @GetMapping("/GetAllGroupsForUser")
    public List<GroupChats> GetAllGroupsForUser(@RequestParam int userId, @RequestParam int resultsPerPage, @RequestParam int page) {
        return groupChatInfoService.findGroupChatsForUser(userId, resultsPerPage, page);
    }

    @CrossOrigin
    @PostMapping("/CreateGroupChat")
    public String CreateGroupChat(@RequestParam int userId, @RequestParam String chatName) {
        return groupChatInfoService.CreateGroupChat(userId, chatName);
    }

    @CrossOrigin
    @DeleteMapping("/DeleteGroupChat")
    public String DeleteGroupChat(@RequestParam int userId) {
        return groupChatInfoService.RemoveGroupChat(userId);
    }

    @CrossOrigin
    @GetMapping("/SearchGroupChatsBySubstring")
    public List<GroupChats> GetGroupChatsByGroupNameSubstring(@RequestParam String groupName, @RequestParam int maxResults) {
        return groupChatInfoService.GetGroupChatsBySubstring(groupName, maxResults);
    }
}
