package com.example.demo.services;

import com.example.demo.models.entities.*;
import com.example.demo.models.repositories.CommentsRepository;
import com.example.demo.models.repositories.PlusOneRepository;
import com.example.demo.models.repositories.ReviewsRepository;
import com.example.demo.models.repositories.UsersRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.stream.events.Comment;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service

public class CommentsService {

    @PersistenceContext
    public EntityManager entityManager;

    @Autowired
    public CommentsRepository commentsRepository;

    @Autowired
    public ReviewsRepository reviewsRepository;

    @Autowired
    public UsersRepository usersRepository;

    @Autowired
    public PlusOneRepository plusOneRepository;

    @Transactional
    public List<Comments> GetCommentsForReview(int reviewId, int resultsPerPage, int page, Date datePosted) {

        int skip = (page - 1) * resultsPerPage;

        // fetches the more recent comments for any given review before the provided timestamp
        String hql =
                "FROM Comments comments " +
                        "JOIN Reviews reviews ON reviews = comments.review " +
                        "JOIN Users users on comments.user = users " +
                        "WHERE reviews.reviewId = :reviewId " +
                        "AND comments.commentTimestamp < :datePosted " +
                        "ORDER BY comments.commentTimestamp DESC";
        return entityManager.createQuery(hql, Comments.class).setParameter("reviewId", reviewId)
                .setParameter("datePosted", datePosted).setFirstResult(skip).setMaxResults(resultsPerPage).getResultList();
    }

    // adds a comment to the database
    @Transactional
    public String AddCommentToDatabase(int userId, int reviewId, String commentContents) {

        // create comment object
        Comments comment = new Comments();

        comment.setCommentTimestamp(new Date());

        comment.setPlusOneCount(0);

        comment.setCommentContent(commentContents);

        // find review to post the comment on
        Reviews review = reviewsRepository.findByReviewId(reviewId);

        // set the review property on the comment object
        comment.setReview(review);

        // get the user who posted the review
        Users user = usersRepository.findByUserId(userId);

        // set the user who comented on the review
        comment.setUser(user);

        // add the comment to the database
        commentsRepository.save(comment);

        return "Successfully added entry to database";
    }

    @Transactional
    public String DeleteCommentFromDatabase(int commentId) {

        // find the comment to be deleted
        Comments comment = commentsRepository.findByCommentId(commentId);

        // get all plus ones associated with the comment. There is a foreign key from
        // plusOnes to comment, so all plusones on the comment must be deleted first
        List<PlusOnes> plusOnesList = plusOneRepository.findAllByCommentId(comment);

        plusOneRepository.deleteAll(plusOnesList);

        // delete the comment
        commentsRepository.deleteById(commentId);
        return "Successfully removed review from repository.";
    }

    @Transactional
    public String DeleteMultipleCommentsFromDatabase(List<Comments> commentIds) {

        // Finds all plus ones to be deleted on all comments
        List<PlusOnes> plusOnesList = plusOneRepository.findAllByCommentIdIn(commentIds);

        //deletes the plusones
        plusOneRepository.deleteAll(plusOnesList);

        // deletes all comments in the list
        commentsRepository.deleteAll(commentIds);
        return "Successfully removed review from repository.";
    }
}
