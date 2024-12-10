package com.example.demo;

import com.example.demo.models.DestinationType;
import com.example.demo.models.entities.Comments;
import com.example.demo.models.entities.Places;
import com.example.demo.models.entities.Reviews;
import com.example.demo.models.entities.Users;
import com.example.demo.models.repositories.CommentsRepository;
import com.example.demo.models.repositories.PlaceRepository;
import com.example.demo.models.repositories.ReviewsRepository;
import com.example.demo.models.repositories.UsersRepository;
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

    // Comments currently not present in the final iteration of the project. Functionality left for potential future development.
    @Test
    public void CommentsService_GetCommentsForReview_ReturnSavedComments() {

        //Arrange
        Users userWhoLeftReview = new Users();
        userWhoLeftReview.setCreatedAt(new Date());
        userWhoLeftReview.setUsername("my username");
        userWhoLeftReview.setEmail("myemail@example.com");
        userWhoLeftReview.setBirthDay(new Date());

        Users userWhoLeftComment1 = new Users();
        userWhoLeftComment1.setCreatedAt(new Date());
        userWhoLeftComment1.setUsername("my username2");
        userWhoLeftComment1.setEmail("myemail2@example.com");
        userWhoLeftComment1.setBirthDay(new Date());

        Users userWhoLeftComment2 = new Users();
        userWhoLeftComment2.setCreatedAt(new Date());
        userWhoLeftComment2.setUsername("my username3");
        userWhoLeftComment2.setEmail("myemail3@example.com");
        userWhoLeftComment2.setBirthDay(new Date());

        Users userWhoLeftComment3 = new Users();
        userWhoLeftComment3.setCreatedAt(new Date());
        userWhoLeftComment3.setUsername("my username4");
        userWhoLeftComment3.setEmail("myemail4@example.com");
        userWhoLeftComment3.setBirthDay(new Date());

        Places placeReviewLeft = new Places();
        placeReviewLeft.setPlaceName("my place name");
        placeReviewLeft.setPlaceType(DestinationType.Experiences);

        Reviews reviewToTestCommentLifecycleOn = new Reviews();
        reviewToTestCommentLifecycleOn.setTitle("This is the title for my test review");
        reviewToTestCommentLifecycleOn.setReview("This is the review on which I will test the life cycle of a comment");
        reviewToTestCommentLifecycleOn.setReviewerId(userWhoLeftReview);
        reviewToTestCommentLifecycleOn.setTimeReviewLeft(new Date());
        reviewToTestCommentLifecycleOn.setPlusOneCount(0);
        reviewToTestCommentLifecycleOn.setPlaceId(placeReviewLeft);

        // Act
        placeRepository.save(placeReviewLeft);
        usersRepository.save(userWhoLeftReview);
        usersRepository.save(userWhoLeftComment1);
        usersRepository.save(userWhoLeftComment2);
        usersRepository.save(userWhoLeftComment3);
        reviewsRepository.save(reviewToTestCommentLifecycleOn);

        // post first comment to database
        String addedComment = commentsService.AddCommentToDatabase(userWhoLeftComment1.getUserId(), reviewToTestCommentLifecycleOn.getReviewId(), "this is my first comment left by user 1");

        Assertions.assertThat(addedComment.equals("Successfully added entry to database"));

        // check if it is there
        Assertions.assertThat(commentsRepository.findAll().spliterator().getExactSizeIfKnown() == 1);

        Date dateBetweenFirstAndSecondComment = new Date();

        // Add second comment to database
        String addSecondComment = commentsService.AddCommentToDatabase(userWhoLeftComment2.getUserId(), reviewToTestCommentLifecycleOn.getReviewId(), "this is my second comment left by review 2");

        // check if it is there
        Assertions.assertThat(commentsRepository.findAll().spliterator().getExactSizeIfKnown() == 2);

        // Testing GetCommentsForReview
        // test if only first comment is returned, as no comments after the provided timestamp should be returned
        List<Comments> reviewComments = commentsService.GetCommentsForReview(reviewToTestCommentLifecycleOn.getReviewId(), 30, 1, dateBetweenFirstAndSecondComment);

        Assertions.assertThat(reviewComments.size() == 1 && reviewComments.get(0).getCommentContent().equals("this is my first comment left by user 1"));

        // With a fresh timestamp, all comments should be returned
        List<Comments> reviewCommentsFull = commentsService.GetCommentsForReview(reviewToTestCommentLifecycleOn.getReviewId(), 30, 1, new Date());

        Assertions.assertThat(reviewCommentsFull.size() == 2);

        //Test delete functionality

        // Delete the second comment that was posted
        String commentDeleted = commentsService.DeleteCommentFromDatabase(reviewComments.get(0).getCommentId());

        Assertions.assertThat(commentDeleted.equals("Successfully removed review from repository."));

        List<Comments> finalReviewComments = commentsService.GetCommentsForReview(reviewToTestCommentLifecycleOn.getReviewId(), 30, 1, new Date());

        Assertions.assertThat(finalReviewComments.size() == 1);

        // Add the final users comment and test if deleting all comments works as intended
        commentsService.AddCommentToDatabase(userWhoLeftComment3.getUserId(), reviewToTestCommentLifecycleOn.getReviewId(), "This is my third comment left by user 3");

        List<Comments> finalReviewCommentsForDeletion = commentsService.GetCommentsForReview(reviewToTestCommentLifecycleOn.getReviewId(), 30, 1, new Date());

        commentsService.DeleteMultipleCommentsFromDatabase(finalReviewCommentsForDeletion);

        Assertions.assertThat(commentsService.GetCommentsForReview(reviewToTestCommentLifecycleOn.getReviewId(), 30, 1, new Date()).size() == 0);
    }

}
