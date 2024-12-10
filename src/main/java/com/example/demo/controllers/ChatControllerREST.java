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

    @GetMapping("/GetAllGroupChatsInfo")
    public List<GroupChats> listAllGroupChatMessages(@RequestParam int resultsPerPage, @RequestParam int page) {
        List<GroupChats> groupChatsList = groupChatInfoService.findGroupChatsWithHqlQuery(resultsPerPage, page);
        return groupChatsList;
    }

    @GetMapping("/GetAllGroupsForUser")
    public List<GroupChats> GetAllGroupsForUser(@RequestParam int userId, @RequestParam int resultsPerPage, @RequestParam int page) {
        return groupChatInfoService.findGroupChatsForUser(userId, resultsPerPage, page);
    }

    @PostMapping("/CreateGroupChat")
    public String CreateGroupChat(@RequestParam int userId, @RequestParam String chatName) {
        return groupChatInfoService.CreateGroupChat(userId, chatName);
    }

    @DeleteMapping("/DeleteGroupChat")
    public String DeleteGroupChat(@RequestParam int userId) {
        return groupChatInfoService.RemoveGroupChat(userId);
    }

    @GetMapping("/SearchGroupChatsBySubstring")
    public List<GroupChats> GetGroupChatsByGroupNameSubstring(@RequestParam String groupName, @RequestParam int maxResults) {
        return groupChatInfoService.GetGroupChatsBySubstring(groupName, maxResults);
    }
}
