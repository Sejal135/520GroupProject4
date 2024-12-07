package com.example.demo.models.repositories;

import com.example.demo.models.entities.Comments;
import com.example.demo.models.entities.PlusOnes;
import com.example.demo.models.entities.Reviews;
import com.example.demo.models.entities.Users;
import org.springframework.data.repository.CrudRepository;

public interface PlusOneRepository extends CrudRepository<PlusOnes, Integer> {

    public PlusOnes findByReviewId(Reviews reviewId);

    public PlusOnes findByUserId(Users userId);

    PlusOnes findByUserIdAndReviewId(Users curUser, Reviews reviews);
    PlusOnes findByUserIdAndCommentId(Users curUser, Comments commentId);
}
