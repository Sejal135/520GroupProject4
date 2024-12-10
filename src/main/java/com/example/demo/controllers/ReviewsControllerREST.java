package com.example.demo.controllers;

import com.example.demo.models.entities.Comments;
import com.example.demo.models.entities.Reviews;
import com.example.demo.services.CommentsService;
import com.example.demo.services.ReviewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
public class ReviewsControllerREST {

    @Autowired
    ReviewsService reviewsService;

    @Autowired
    CommentsService commentsService;

    @CrossOrigin
    @GetMapping("/GetAllReviewsForAPlace")
    public List<Reviews> GetAllReviewsForAPlace(@RequestParam int placeId, @RequestParam int resultsPerPage, @RequestParam int page, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")Date datePosted) {
        return reviewsService.FindAllReviewsForPlace(placeId, resultsPerPage, page, datePosted);
    }

    @CrossOrigin
    @GetMapping("/GetAllReviewsForAUser")
    public List<Reviews> GetAllReviewsForAUser(@RequestParam int userId, @RequestParam int resultsPerPage, @RequestParam int page, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")Date datePosted) {
        return reviewsService.FindAllReviewsForUser(userId, resultsPerPage, page, datePosted);
    }

    @CrossOrigin
    @PostMapping("/AddReviewToDatabase")
    public String AddReviewToDatabase(@RequestParam String title, @RequestParam int userId, int placeId, String reviewContents) {
        return reviewsService.AddReviewToDatabase(title, userId, placeId, reviewContents);
    }

    @CrossOrigin
    @DeleteMapping("/DeleteReview")
    public String DeleteReviewFromDatabase(@RequestParam int reviewId) {
        return reviewsService.DeleteReviewFromDatabase(reviewId);
    }

    @CrossOrigin
    @GetMapping("/GetAllCommentsForAReview")
    public List<Comments> GetAllCommentsForAReview(@RequestParam int reviewId, @RequestParam int page, @RequestParam int resultsPerPage, @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")Date datePosted) {
        return commentsService.GetCommentsForReview(reviewId, resultsPerPage, page, datePosted);
    }


}
