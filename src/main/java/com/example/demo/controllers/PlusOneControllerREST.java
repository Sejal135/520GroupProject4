package com.example.demo.controllers;

import com.example.demo.models.entities.Reviews;
import com.example.demo.services.PlusOneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlusOneControllerREST {

    @Autowired
    PlusOneService plusOneService;


    @GetMapping("/IncrementPlusOne")
    public String IncrementPlusOne(@RequestParam int reviewId, @RequestParam int userId) {
        return plusOneService.IncrementPlusOne(reviewId, userId);
    }

    @GetMapping("/DecrementPlusOne")
    public String DecrementPlusOne(@RequestParam int reviewId, @RequestParam int userId) {
        return plusOneService.DecrementPlusOne(reviewId, userId);
    }

    @GetMapping("/IncrementCommentPlusOne")
    public String IncrementCommentPlusOne(@RequestParam int commentId, @RequestParam int userId) {
        return plusOneService.IncrementCommentPlusOne(commentId, userId);
    }

    @GetMapping("/DecrementCommentPlusOne")
    public String DecrementCommentPlusOne(@RequestParam int commentId, @RequestParam int userId) {
        return plusOneService.DecrementPlusOneForComment(commentId, userId);
    }
}