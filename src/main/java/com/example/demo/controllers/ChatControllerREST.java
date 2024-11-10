package com.example.demo.controllers;

import com.example.demo.services.GroupChatInfoService;
import com.example.demo.models.entities.GroupChats;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class ChatControllerREST {

    @Autowired
    GroupChatInfoService groupChatInfoService;

    @GetMapping("/GetAllGroupChatsInfo")
    public List<GroupChats> listAllGroupChatMessages() {
        List<GroupChats> groupChatsList = groupChatInfoService.findGroupChatsWithHqlQuery();
        return groupChatsList;
    }

    @GetMapping("/GetAllGroupsForUser")
    public List<GroupChats> GetAllGroupsForUser(@RequestParam int userId) {
        return groupChatInfoService.findGroupChatsForUser(userId);
    }
}
