package com.example.demo.controllers;

import com.example.demo.models.entities.Preferences;
import com.example.demo.models.entities.Users;
import com.example.demo.services.GroupChatInfoService;
import com.example.demo.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UsersControllerREST {

    @Autowired
    UsersService usersService;

    @GetMapping("/GetPreferencesForUser")
    public List<Preferences> GetUserPreferences(@RequestParam int userId) {
        return usersService.FindPreferencesForUser(userId);
    }

    @PostMapping("/CreateUser")
    public String CreateUser(@RequestBody Users user) {
        return usersService.CreateUser(user);
    }


}
