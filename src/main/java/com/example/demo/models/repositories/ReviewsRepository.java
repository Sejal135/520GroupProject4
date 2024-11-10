package com.example.demo.models.repositories;

import com.example.demo.models.entities.Reviews;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ReviewsRepository extends CrudRepository<Reviews, Integer> {

    public Reviews findByReviewId(Integer reviewId);
}
