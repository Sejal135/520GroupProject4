package com.example.demo.models.repositories;

import com.example.demo.models.entities.Comments;
import com.example.demo.models.entities.Reviews;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

// repository which allows for HQL-less queries to be executed automatically
public interface CommentsRepository extends CrudRepository<Comments, Integer> {

    Comments findByCommentId(int commentId);

    List<Comments> findByCommentIdIn(List<Integer> commentIds);

    List<Comments> findAllByReview(Reviews review);
}
