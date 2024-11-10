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
    public List<GroupChats> findGroupChatsWithHqlQuery() {
        String hql = "FROM GroupChats";
        return entityManager.createQuery(hql, GroupChats.class).getResultList();
    }

    @Transactional
    public List<GroupChats> findGroupChatsForUser(int userId) {
        String hql =
                "FROM GroupChats groupChats " +
                "JOIN GroupMembers groupMembers ON groupChats = groupMembers.groupId " +
                "JOIN Users users on groupMembers.userId = users " +
                "WHERE users.userId = :userId";
        return entityManager.createQuery(hql, GroupChats.class).setParameter("userId", userId).getResultList();
    }
}
