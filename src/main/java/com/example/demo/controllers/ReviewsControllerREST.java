package com.example.demo.controllers;

import com.example.demo.models.entities.Reviews;
import com.example.demo.services.ReviewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class ReviewsControllerREST {

    @Autowired
    ReviewsService reviewsService;

    @GetMapping("/GetAllReviewsForAPlace")
    public List<Reviews> GetAllReviewsForAPlace(@RequestParam int placeId) {
        return reviewsService.FindAllReviewsForPlace(placeId);
    }

    @PostMapping("/AddReviewToDatabase")
    public String AddReviewToDatabase(@RequestParam String title, @RequestParam int userId, int placeId, String reviewContents) {
        reviewsService.AddReviewToDatabase(title, userId, placeId, reviewContents);
        return "Hello";
    }

    @DeleteMapping("/DeleteReview")
    public String DeleteReviewFromDatabase(@RequestParam int reviewId) {
        return reviewsService.DeleteReviewFromDatabase(reviewId);
    }
}
