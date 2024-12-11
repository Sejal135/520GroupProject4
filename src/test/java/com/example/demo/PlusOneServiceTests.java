package com.example.demo;

import com.example.demo.models.DestinationType;
import com.example.demo.models.TravelerTypes;
import com.example.demo.models.entities.*;
import com.example.demo.models.repositories.*;
import com.example.demo.services.*;
import org.assertj.core.api.Assertions;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.util.*;

// Testing crud operations for ExplorerHomepageService. Uses an in-memory database created just for the purpose of this test
@Import(TestConfig.class)
@DataJpaTest
@AutoConfigureTestDatabase (connection = EmbeddedDatabaseConnection.H2)
public class PlusOneServiceTests {

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    ReviewsRepository reviewsRepository;

    @Autowired
    CommentsRepository commentsRepository;

    @Autowired
    PlaceRepository placeRepository;

    @Autowired
    PlusOneService plusOneService;

    @Test
    public void TestPlusOneFunctionality() {

        // set up users, reviews, comments, and places

        Places place = createPlace("placename", DestinationType.Misc);

        Users user1 = createUser("user1", "user1@email.com");

        Users user2 = createUser("user2", "user2@email.com");

        placeRepository.save(place);
        usersRepository.save(user1);
        usersRepository.save(user2);

        Reviews review = createReview(user2, "blah blah blah", "blah", place);

        reviewsRepository.save(review);

        Comments comment1 = createComment("alsdkfjkl", user1, review);

        Reviews nullReview = createReview(user2, "asdf", "asdf", place);

        commentsRepository.save(comment1);

        // Have user1 increment non-existent review's plus one count, and review's plus one count

        String nullResponse = plusOneService.IncrementPlusOne(review.getReviewId() + 1, user1.getUserId());

        Assertions.assertThat(nullResponse).isEqualTo("Review or user not found");

        String firstResponse = plusOneService.IncrementPlusOne(review.getReviewId(), user1.getUserId());

        Assertions.assertThat(firstResponse).isEqualTo("Successfully incremented the +1");

        // attempt to have user1 increment the plusOneCount for this review

        String cannotIncrementResponse = plusOneService.IncrementPlusOne(review.getReviewId(), user1.getUserId());

        Assertions.assertThat(cannotIncrementResponse).isEqualTo("PlusOne already exists in database for user");

        // Attempt to have user1 decrement the plusOneCount for this review

        String decrementResponse = plusOneService.DecrementPlusOne(review.getReviewId(), user1.getUserId());

        Assertions.assertThat(decrementResponse).isEqualTo("Successfully decremented the +1");

        // Attempt to decrement the count when the user has not plusOned it

        String cannotDecrementResponse = plusOneService.DecrementPlusOne(review.getReviewId(), user1.getUserId());

        Assertions.assertThat(cannotDecrementResponse).isEqualTo("User has not +1ed this review");

        // Have user1 attempt to decrement the non-existant review

        String nullDecrementResponse = plusOneService.DecrementPlusOne(review.getReviewId() + 1, user1.getUserId());

        Assertions.assertThat(nullDecrementResponse).isEqualTo("Review or user not found");

        // Repeat for comments, starting with incrementing non-existant comment

        String commentNullIncrementResponse = plusOneService.IncrementCommentPlusOne(comment1.getCommentId() + 1, user2.getUserId());

        Assertions.assertThat(commentNullIncrementResponse).isEqualTo("Comment or user not found");

        // Increment existing comment

        String commentIncrementResponse = plusOneService.IncrementCommentPlusOne(comment1.getCommentId(), user2.getUserId());

        Assertions.assertThat(commentIncrementResponse).isEqualTo("Successfully incremented the +1");

        String commentIncrementBeyondOne = plusOneService.IncrementCommentPlusOne(comment1.getCommentId(), user2.getUserId());

        Assertions.assertThat(commentIncrementBeyondOne).isEqualTo("PlusOne already exists in database for user");

        String commentDecrementPlusOne = plusOneService.DecrementPlusOneForComment(comment1.getCommentId(), user2.getUserId());

        Assertions.assertThat(commentDecrementPlusOne).isEqualTo("Successfully decremented the +1");

        String commentCantDecrementPlusOne = plusOneService.DecrementPlusOneForComment(comment1.getCommentId(), user2.getUserId());

        Assertions.assertThat(commentCantDecrementPlusOne).isEqualTo("User has not +1ed this review");
    }

    private Users createUser(String username, String email) {
        Users user = new Users();
        user.setUsername(username);
        user.setEmail(email);
        user.setBio("My bio");
        user.setLocation("My house");
        user.setCreatedAt(new Date());
        user.setBirthDay(new Date());
        return user;
    }

    private Places createPlace(String name, DestinationType type) {
        Places place = new Places();
        place.setPlaceName(name);
        place.setPlaceType(type);
        return place;
    }

    private Reviews createReview(Users reviewer, String reviewContents, String reviewTitle, Places places) {
        Reviews review = new Reviews();
        review.setReviewerId(reviewer);
        review.setReview(reviewContents);
        review.setPlusOneCount(0);
        review.setTitle(reviewTitle);
        review.setTimeReviewLeft(new Date());
        review.setPlaceId(places);
        return review;
    }

    private Comments createComment(String commentContent, Users user, Reviews reviews) {
        Comments comment = new Comments();
        comment.setCommentContent(commentContent);
        comment.setCommentTimestamp(new Date());
        comment.setUser(user);
        comment.setReview(reviews);
        comment.setPlusOneCount(0);
        return comment;
    }

}
