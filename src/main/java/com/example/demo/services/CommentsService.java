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
    private EntityManager entityManager;

    @Autowired
    private CommentsRepository commentsRepository;

    @Autowired
    private ReviewsRepository reviewsRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private PlusOneRepository plusOneRepository;

    @Transactional
    public List<Comments> GetCommentsForReview(int reviewId, int resultsPerPage, int page, Date datePosted) {

        int skip = (page - 1) * resultsPerPage;

        String hql =
                "FROM Comments comments " +
                        "JOIN Reviews reviews ON reviews = comments.review " +
                        "JOIN Users users on comments.user = users " +
                        "WHERE reviews.reviewId = :reviewId " +
                        "AND comments.commentTimestamp < :datePosted" +
                        "ORDER BY comments.commentTimestamp DESC";
        return entityManager.createQuery(hql, Comments.class).setParameter("reviewId", reviewId)
                .setParameter("datePosted", datePosted).setFirstResult(skip).setMaxResults(resultsPerPage).getResultList();
    }

    @Transactional
    public String AddCommentToDatabase(int userId, int reviewId, String commentContents) {

        Comments comment = new Comments();

        comment.setCommentTimestamp(new Date());

        comment.setPlusOneCount(0);

        comment.setCommentContent(commentContents);

        Reviews review = reviewsRepository.findByReviewId(reviewId);

        comment.setReview(review);

        Users user = usersRepository.findByUserId(userId);

        comment.setUser(user);

        commentsRepository.save(comment);

        return "Successfully added entry to database";
    }

    @Transactional
    public String DeleteCommentFromDatabase(int commentId) {

        Comments comment = commentsRepository.findByCommentId(commentId);

        List<PlusOnes> plusOnesList = plusOneRepository.findAllByCommentId(comment);

        plusOneRepository.deleteAll(plusOnesList);

        commentsRepository.deleteById(commentId);
        return "Successfully removed review from repository.";
    }

    @Transactional
    public String DeleteMultipleCommentsFromDatabase(List<Comments> commentIds) {

        List<PlusOnes> plusOnesList = plusOneRepository.findAllByCommentIdIn(commentIds);

        plusOneRepository.deleteAll(plusOnesList);

        commentsRepository.deleteAll(commentIds);
        return "Successfully removed review from repository.";
    }
}
