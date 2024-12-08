package com.example.demo.services;

import com.example.demo.models.entities.Places;
import com.example.demo.models.entities.Reviews;
import com.example.demo.models.entities.Users;
import com.example.demo.models.repositories.PlaceRepository;
import com.example.demo.models.repositories.ReviewsRepository;
import com.example.demo.models.repositories.UsersRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    @Transactional
    public List<Reviews> FindAllReviewsForPlace(int placeId, int resultsPerPage, int page, Date reviewPostedTimestamp) {

        int skip = (page - 1) * resultsPerPage;

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

        String hql =
                "From Reviews reviews " +
                        "JOIN Users users on users = reviews.reviewerId " +
                        "JOIN Places places on reviews.placeId = places " +
                        "where users.userId = :userId and places.placeId = :placeId";

        List<Reviews> reviews = entityManager.createQuery(hql, Reviews.class).setParameter("userId", userId).setParameter("placeId", placeId).getResultList();
        if (!reviews.isEmpty()) {
            return "User already has review on this place";
        }

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
        reviewsRepository.deleteById(reviewId);
        return "Successfully removed review from repository.";
    }

}
