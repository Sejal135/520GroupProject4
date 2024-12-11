package com.example.demo.models.repositories;

import com.example.demo.models.entities.Followers;
import org.springframework.data.repository.CrudRepository;
// repository which allows for HQL-less queries to be executed automatically
public interface FollowersRepository extends CrudRepository<Followers, Integer> {
}
