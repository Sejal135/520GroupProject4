package com.example.demo.services;

import com.example.demo.models.entities.Places;
import com.example.demo.models.entities.Reviews;
import com.example.demo.models.entities.Users;
import com.example.demo.models.repositories.PlaceRepository;
import com.example.demo.models.repositories.ReviewsRepository;
import com.example.demo.models.repositories.UsersRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
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
    public List<Reviews> FindAllReviewsForPlace(int placeId) {
        String hql =
                "FROM Reviews reviews " +
                        "JOIN Places places ON places = reviews.placeId " +
                        "WHERE places.placeId = :placeId";
        return entityManager.createQuery(hql, Reviews.class).setParameter("placeId", placeId).getResultList();
    }

    @Transactional
    public List<Reviews> FindAllReviewsForUser(int userId) {
        String hql =
                "From Reviews reviews " +
                        "JOIN Users users on users = reviews.reviewerId " +
                        "where users.userId = :userId";
        return entityManager.createQuery(hql, Reviews.class).setParameter("userId", userId).getResultList();
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
        return "Successfullly removed review from repository.";
    }

}