package com.example.demo.services;


import com.example.demo.models.entities.GroupChats;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GroupChatInfoService {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public List<GroupChats> findGroupChatsWithHqlQuery(int resultsPerPage, int page) {

        int skip = (page - 1) * resultsPerPage;

        String hql = "FROM GroupChats groupChats ORDER BY groupChats.groupId";
        return entityManager.createQuery(hql, GroupChats.class).setFirstResult(skip).setMaxResults(resultsPerPage).getResultList();
    }

    @Transactional
    public List<GroupChats> findGroupChatsForUser(int userId, int resultsPerPage, int page) {

        int skip = (page - 1) * resultsPerPage;

        String hql =
                "FROM GroupChats groupChats " +
                "JOIN GroupMembers groupMembers ON groupChats = groupMembers.groupId " +
                "JOIN Users users on groupMembers.userId = users " +
                "WHERE users.userId = :userId " +
                        "ORDER BY groupName ASC";
        return entityManager.createQuery(hql, GroupChats.class).setParameter("userId", userId).setFirstResult(skip).setMaxResults(resultsPerPage).getResultList();
    }
}
