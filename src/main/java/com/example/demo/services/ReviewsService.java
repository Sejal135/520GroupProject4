package com.example.demo.services;

import com.example.demo.models.entities.*;
import com.example.demo.models.repositories.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.stream.events.Comment;
import java.util.Date;
import java.util.List;

@Service
public class ReviewsService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ReviewsRepository reviewsRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private CommentsRepository commentsRepository;

    @Autowired CommentsService commentsService;

    @Autowired
    PlusOneRepository plusOneRepository;

    @Transactional
    public List<Reviews> FindAllReviewsForPlace(int placeId, int resultsPerPage, int page, Date reviewPostedTimestamp) {

        int skip = (page - 1) * resultsPerPage;

        // Gets resultsPerPage reviews after skip of the most recent reviews posted before reviewPostedTimestamp
        String hql =
                "FROM Reviews reviews " +
                        "JOIN Places places ON places = reviews.placeId " +
                        "WHERE places.placeId = :placeId " +
                        "AND reviews.timeReviewLeft < :reviewPostedTimestamp " +
                        "ORDER BY reviews.timeReviewLeft DESC";
        return entityManager.createQuery(hql, Reviews.class).setParameter("placeId", placeId).setParameter("reviewPostedTimestamp", reviewPostedTimestamp).setFirstResult(skip).setMaxResults(resultsPerPage).getResultList();
    }

    @Transactional
    public List<Reviews> FindAllReviewsForUser(int userId, int resultsPerPage, int page, Date datePosted) {

        int skip = (page - 1) * resultsPerPage;

        // gets the resultsPerPage most recent reviews after timestamp after skip left by user corresponding to userId
        String hql =
                "From Reviews reviews " +
                        "JOIN Users users on users = reviews.reviewerId " +
                        "where users.userId = :userId " +
                        "AND reviews.timeReviewLeft < :datePosted " +
                        "ORDER BY reviews.timeReviewLeft";
        return entityManager.createQuery(hql, Reviews.class).setParameter("userId", userId).setParameter("datePosted", datePosted).setFirstResult(skip).setMaxResults(resultsPerPage).getResultList();
    }

    @Transactional
    public String AddReviewToDatabase(String title, int userId, int placeId, String reviewContents) {

        // Gets the reviews left by user trying to add a review on this place
        String hql =
                "From Reviews reviews " +
                        "JOIN Users users on users = reviews.reviewerId " +
                        "JOIN Places places on reviews.placeId = places " +
                        "where users.userId = :userId and places.placeId = :placeId";

        List<Reviews> reviews = entityManager.createQuery(hql, Reviews.class).setParameter("userId", userId).setParameter("placeId", placeId).getResultList();
        // user cannot leave more than one review on a place
        if (!reviews.isEmpty()) {
            return "User already has review on this place";
        }

        // initialize reviews, populate with relevant data, save to reviews channel
        Reviews review = new Reviews();
        review.setTitle(title);
        review.setReview(reviewContents);

        Users user = usersRepository.findByUserId(userId);

        Places place = placeRepository.findByPlaceId(placeId);

        review.setReviewerId(user);
        review.setPlaceId(place);

        review.setTimeReviewLeft(new Date());
        review.setPlusOneCount(0);

        reviewsRepository.save(review);
        return "Successfully added entry to database";
    }

    @Transactional
    public String DeleteReviewFromDatabase(int reviewId) {
        // finds review from database
        Reviews review = reviewsRepository.findByReviewId(reviewId);
        // gets all comments associated with the review
        List<Comments> commentsList = commentsRepository.findAllByReview(review);
        // gets all plus ones on the review associated with the review
        List<PlusOnes> reviewPlusOnes = plusOneRepository.findAllByReviewId(review);
        // delete comments with foreign key relationship to table
        commentsService.DeleteMultipleCommentsFromDatabase(commentsList);
        // delete plusOnes with foreign key relationship to table
        plusOneRepository.deleteAll(reviewPlusOnes);
        // delete the review
        reviewsRepository.deleteById(reviewId);
        return "Successfully removed review from repository.";
    }

}
