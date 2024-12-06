package com.example.demo.models.repositories;

import com.example.demo.models.entities.Comments;
import org.springframework.data.repository.CrudRepository;

public interface CommentsRepository extends CrudRepository<Comments, Integer> {

}
