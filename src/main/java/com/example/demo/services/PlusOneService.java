package com.example.demo.services;

import com.example.demo.models.entities.PlusOnes;
import com.example.demo.models.entities.Reviews;
import com.example.demo.models.entities.Users;
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
    private UsersRepository usersRepository;

    @Autowired
    private PlusOneRepository plusOneRepository;

    @Transactional
    public String IncrementPlusOne(int reviewId, int userId) {

        Reviews curReview = reviewsRepository.findByReviewId(reviewId);

        Users curUser = usersRepository.findByUserId(userId);

        if (curReview == null || curUser == null) {
            return "Review or user not found";
        }

        PlusOnes plusOneAlreadyExists = plusOneRepository.findByUserId(curUser);

        if (plusOneAlreadyExists != null) {
            return "PlusOne already exists in database for user";
        }

        PlusOnes plusOneToCreate = new PlusOnes();

        plusOneToCreate.setUserId(curUser);

        plusOneToCreate.setReviewId(curReview);

        plusOneRepository.save(plusOneToCreate);

        curReview.setPlusOneCount(curReview.getPlusOneCount() + 1);

        reviewsRepository.save(curReview);

        return "Successfully incremented the +1";
    }

    @Transactional
    public String DecrementPlusOne(int reviewId, int userId) {

        Reviews curReview = reviewsRepository.findByReviewId(reviewId);

        Users curUser = usersRepository.findByUserId(userId);

        if (curReview == null || curUser == null) {
            return "Review or user not found";
        }

        PlusOnes plusOneAlreadyExists = plusOneRepository.findByUserId(curUser);

        if (plusOneAlreadyExists == null) {
            return "User has not +1ed this review";
        }

        plusOneRepository.deleteById(plusOneAlreadyExists.getPlusOneId());

        curReview.setPlusOneCount(curReview.getPlusOneCount() - 1);

        reviewsRepository.save(curReview);

        return "Successfully decremented the +1";
    }
}
