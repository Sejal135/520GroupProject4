package com.example.demo.models.repositories;

import com.example.demo.models.entities.Followers;
import org.springframework.data.repository.CrudRepository;

public interface FollowersRepository extends CrudRepository<Followers, Integer> {
}
