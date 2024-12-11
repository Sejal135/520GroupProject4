package com.example.demo.services;

import com.example.demo.models.entities.Comments;
import com.example.demo.models.entities.PlusOnes;
import com.example.demo.models.entities.Reviews;
import com.example.demo.models.entities.Users;
import com.example.demo.models.repositories.CommentsRepository;
import com.example.demo.models.repositories.PlusOneRepository;
import com.example.demo.models.repositories.ReviewsRepository;
import com.example.demo.models.repositories.UsersRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlusOneService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ReviewsRepository reviewsRepository;

    @Autowired
    private CommentsRepository commentsRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private PlusOneRepository plusOneRepository;

    @Transactional
    public String IncrementPlusOne(int reviewId, int userId) {

        // get review to increment plus one on
        Reviews curReview = reviewsRepository.findByReviewId(reviewId);

        // get user plus one-ing the review
        Users curUser = usersRepository.findByUserId(userId);

        // if either don't exist, return status stating so
        if (curReview == null || curUser == null) {
            return "Review or user not found";
        }

        // if the plus one already exists, don't let the user plus-one it.
        PlusOnes plusOneAlreadyExists = plusOneRepository.findByUserIdAndReviewId(curUser, curReview);

        if (plusOneAlreadyExists != null) {
            return "PlusOne already exists in database for user";
        }

        // create plus one object and save it to the database
        PlusOnes plusOneToCreate = new PlusOnes();

        plusOneToCreate.setUserId(curUser);

        plusOneToCreate.setReviewId(curReview);

        plusOneRepository.save(plusOneToCreate);

        // increment the plus one count on the current review (seems dangerous, but this is the only place
        // in the entire code base where changing both of these values are possible).
        curReview.setPlusOneCount(curReview.getPlusOneCount() + 1);

        // save the review with the updated plus one count
        reviewsRepository.save(curReview);

        return "Successfully incremented the +1";
    }

    @Transactional
    public String DecrementPlusOne(int reviewId, int userId) {

        // get review to decrement plus one count
        Reviews curReview = reviewsRepository.findByReviewId(reviewId);

        // remaining logic is the same as before
        Users curUser = usersRepository.findByUserId(userId);

        if (curReview == null || curUser == null) {
            return "Review or user not found";
        }

        PlusOnes plusOneAlreadyExists = plusOneRepository.findByUserIdAndReviewId(curUser, curReview);

        if (plusOneAlreadyExists == null) {
            return "User has not +1ed this review";
        }

        plusOneRepository.deleteById(plusOneAlreadyExists.getPlusOneId());

        curReview.setPlusOneCount(curReview.getPlusOneCount() - 1);

        reviewsRepository.save(curReview);

        return "Successfully decremented the +1";
    }

    @Transactional
    public String IncrementCommentPlusOne(int commentId, int userId) {
        // get comment to increment plus one count
        Comments curComment = commentsRepository.findByCommentId(commentId);

        // remaining logic is the same as incrementing the plus one on a review
        Users curUser = usersRepository.findByUserId(userId);

        if (curComment == null || curUser == null) {
            return "Comment or user not found";
        }

        PlusOnes plusOneAlreadyExists = plusOneRepository.findByUserIdAndCommentId(curUser, curComment);

        if (plusOneAlreadyExists != null) {
            return "PlusOne already exists in database for user";
        }

        PlusOnes plusOneToCreate = new PlusOnes();

        plusOneToCreate.setUserId(curUser);

        plusOneToCreate.setCommentId(curComment);

        plusOneRepository.save(plusOneToCreate);

        curComment.setPlusOneCount(curComment.getPlusOneCount() + 1);

        commentsRepository.save(curComment);

        return "Successfully incremented the +1";
    }

    @Transactional
    public String DecrementPlusOneForComment(int commentId, int userId) {

        // get comment to decrement plus one on
        Comments curComment = commentsRepository.findByCommentId(commentId);

        // remaining logic is the same as decrementing the review
        Users curUser = usersRepository.findByUserId(userId);

        if (curComment == null || curUser == null) {
            return "Review or user not found";
        }

        PlusOnes plusOneAlreadyExists = plusOneRepository.findByUserIdAndCommentId(curUser, curComment);

        if (plusOneAlreadyExists == null) {
            return "User has not +1ed this review";
        }

        plusOneRepository.deleteById(plusOneAlreadyExists.getPlusOneId());

        curComment.setPlusOneCount(curComment.getPlusOneCount() - 1);

        commentsRepository.save(curComment);

        return "Successfully decremented the +1";
    }

}
