package com.example.demo.services;

import com.example.demo.models.entities.Followers;
import com.example.demo.models.entities.Reviews;
import com.example.demo.models.entities.Users;
import com.example.demo.models.repositories.UsersRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service

public class ExplorerHomepageService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private UsersService usersService;

    public List<Reviews> GetPaginatedFeed(Date datePosted, int page, int resultsPerPage, int userId) {

        Users user = usersRepository.findByUserId(userId);

        if (user == null) {
            return new ArrayList<Reviews>();
        }

        List<Followers> followersList = usersService.GetFollowedList(userId);

        // I really wish I could use C# LINQ here
        ArrayList<Integer> followersListInteger = new ArrayList<Integer>();
        for (Followers follower : followersList) {
            followersListInteger.add(follower.getPosterId().getUserId());
        }

        int skip = resultsPerPage * (page - 1);

        String hql =
                "FROM Reviews reviews " +
                        "JOIN Users users on users = reviews.reviewerId " +
                        "WHERE users.userId IN :userId " +
                        "AND reviews.timeReviewLeft < :datePosted " +
                        "ORDER BY reviews.timeReviewLeft DESC";
        return entityManager.createQuery(hql, Reviews.class).setParameter("userId", followersListInteger)
                .setParameter("datePosted", datePosted).setFirstResult(skip).setMaxResults(resultsPerPage)
                .getResultList();

    }
}
