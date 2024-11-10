package com.example.demo.models.repositories;

import com.example.demo.models.entities.Users;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UsersRepository extends CrudRepository<Users, Integer> {

    public Users findByUserId(Integer userId);
}
