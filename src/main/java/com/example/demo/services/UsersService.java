package com.example.demo.services;

import com.example.demo.models.entities.Preferences;
import com.example.demo.models.entities.Reviews;
import com.example.demo.models.entities.Users;
import com.example.demo.models.repositories.PreferencesRepository;
import com.example.demo.models.repositories.UsersRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class UsersService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private UsersRepository usersRepository;

    @Transactional
    public List<Preferences> FindPreferencesForUser(int userId) {
        String hql =
                "FROM Preferences preferences " +
                        "JOIN Users users ON users = preferences.userId " +
                        "WHERE users.userId = :userId";
        return entityManager.createQuery(hql, Preferences.class).setParameter("userId", userId).getResultList();
    }

    @Transactional
    public String CreateUser(Users user) {
        user.setCreatedAt(new Date());

        usersRepository.save(user);

        return "Successfully created user";
    }
}
