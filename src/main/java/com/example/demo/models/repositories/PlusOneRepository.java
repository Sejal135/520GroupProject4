package com.example.demo.models.repositories;

import com.example.demo.models.entities.Comments;
import com.example.demo.models.entities.PlusOnes;
import com.example.demo.models.entities.Reviews;
import com.example.demo.models.entities.Users;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PlusOneRepository extends CrudRepository<PlusOnes, Integer> {

    public List<PlusOnes> findAllByReviewId(Reviews reviewId);

    public List<PlusOnes> findAllByCommentId(Comments commentId);

    public List<PlusOnes> findAllByCommentIdIn(List<Comments> commentIds);

    PlusOnes findByUserIdAndReviewId(Users curUser, Reviews reviews);
    PlusOnes findByUserIdAndCommentId(Users curUser, Comments commentId);
}
