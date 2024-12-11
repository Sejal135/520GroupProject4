package com.example.demo.models.repositories;

import com.example.demo.models.entities.Places;
import com.example.demo.models.entities.Preferences;
import com.example.demo.models.entities.Users;
import org.springframework.data.repository.CrudRepository;
import java.util.List;
// repository which allows for HQL-less queries to be executed automatically
public interface PreferencesRepository extends CrudRepository<Preferences, Integer> {

    public List<Preferences> findAllByUserId(Users user);
}
