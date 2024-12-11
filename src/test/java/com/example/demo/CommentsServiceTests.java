package com.example.demo;

import com.example.demo.models.DestinationType;
import com.example.demo.models.entities.Comments;
import com.example.demo.models.entities.Places;
import com.example.demo.models.entities.Reviews;
import com.example.demo.models.entities.Users;
import com.example.demo.models.repositories.*;
import com.example.demo.services.CommentsService;
import com.example.demo.services.PlacesService;
import com.example.demo.services.UsersService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.util.Date;
import java.util.List;

@Import(TestConfig.class)
@DataJpaTest
@AutoConfigureTestDatabase (connection = EmbeddedDatabaseConnection.H2)
public class CommentsServiceTests {

    @Autowired
    private CommentsService commentsService;
    @Autowired
    private UsersService usersService;
    @Autowired
    private PlacesService placesService;
    @Autowired
    private PlaceRepository placeRepository;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private CommentsRepository commentsRepository;
    @Autowired
    private ReviewsRepository reviewsRepository;
    @Autowired
    private FavoritePlacesRepository favoritePlacesRepository;

    // Comments currently not present in the final iteration of the project. Functionality left for potential future development.
    @Test
    public void CommentsService_GetCommentsForReview_ReturnSavedComments() {
        // Arrange
        Users userWhoLeftReview = new Users();
        userWhoLeftReview.setCreatedAt(new Date());
        userWhoLeftReview.setUsername("reviewer");
        userWhoLeftReview.setEmail("reviewer@example.com");
        userWhoLeftReview.setBirthDay(new Date());

        Users userWhoLeftComment1 = new Users();
        userWhoLeftComment1.setCreatedAt(new Date());
        userWhoLeftComment1.setUsername("commenter1");
        userWhoLeftComment1.setEmail("commenter1@example.com");
        userWhoLeftComment1.setBirthDay(new Date());

        Users userWhoLeftComment2 = new Users();
        userWhoLeftComment2.setCreatedAt(new Date());
        userWhoLeftComment2.setUsername("commenter2");
        userWhoLeftComment2.setEmail("commenter2@example.com");
        userWhoLeftComment2.setBirthDay(new Date());

        Users userWhoLeftComment3 = new Users();
        userWhoLeftComment3.setCreatedAt(new Date());
        userWhoLeftComment3.setUsername("commenter3");
        userWhoLeftComment3.setEmail("commenter3@example.com");
        userWhoLeftComment3.setBirthDay(new Date());

        Places place = new Places();
        place.setPlaceName("Sample Place");
        place.setPlaceType(DestinationType.Experiences);

        Reviews review = new Reviews();
        review.setTitle("Test Review");
        review.setReview("Review content for testing.");
        review.setReviewerId(userWhoLeftReview);
        review.setTimeReviewLeft(new Date());
        review.setPlusOneCount(0);
        review.setPlaceId(place);

        // Save entities
        placeRepository.save(place);
        usersRepository.save(userWhoLeftReview);
        usersRepository.save(userWhoLeftComment1);
        usersRepository.save(userWhoLeftComment2);
        usersRepository.save(userWhoLeftComment3);
        reviewsRepository.save(review);

        // Act
        // Add first comment
        String addedComment = commentsService.AddCommentToDatabase(
                userWhoLeftComment1.getUserId(), review.getReviewId(), "First comment");
        Assertions.assertThat(addedComment).isEqualTo("Successfully added entry to database");
        Assertions.assertThat(commentsRepository.findAll()).hasSize(1);

        // Timestamp for filtering comments
        Date timestamp = new Date();

        // Add second comment
        commentsService.AddCommentToDatabase(
                userWhoLeftComment2.getUserId(), review.getReviewId(), "Second comment");
        Assertions.assertThat(commentsRepository.findAll()).hasSize(2);

        // Test fetching comments before a timestamp
        List<Comments> commentsBeforeTimestamp = commentsService.GetCommentsForReview(
                review.getReviewId(), 30, 1, timestamp);
        Assertions.assertThat(commentsBeforeTimestamp).hasSize(1);
        Assertions.assertThat(commentsBeforeTimestamp.get(0).getCommentContent())
                .isEqualTo("First comment");

        // Fetch all comments
        List<Comments> allComments = commentsService.GetCommentsForReview(
                review.getReviewId(), 30, 1, new Date());
        Assertions.assertThat(allComments).hasSize(2);

        // Test delete functionality
        commentsService.DeleteCommentFromDatabase(allComments.get(1).getCommentId());
        Assertions.assertThat(commentsService.GetCommentsForReview(
                review.getReviewId(), 30, 1, new Date())).hasSize(1);

        // Add another comment and test batch delete
        commentsService.AddCommentToDatabase(
                userWhoLeftComment3.getUserId(), review.getReviewId(), "Third comment");
        List<Comments> commentsForDeletion = commentsService.GetCommentsForReview(
                review.getReviewId(), 30, 1, new Date());
        commentsService.DeleteMultipleCommentsFromDatabase(commentsForDeletion);

        Assertions.assertThat(commentsService.GetCommentsForReview(
                review.getReviewId(), 30, 1, new Date())).isEmpty();
    }

}
