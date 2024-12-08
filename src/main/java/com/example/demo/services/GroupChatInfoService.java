package com.example.demo.services;


import com.example.demo.models.entities.GroupChats;
import com.example.demo.models.entities.GroupMembers;
import com.example.demo.models.entities.Users;
import com.example.demo.models.repositories.GroupChatRepository;
import com.example.demo.models.repositories.GroupMemberRepository;
import com.example.demo.models.repositories.UsersRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class GroupChatInfoService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private GroupMemberRepository groupMemberRepository;

    @Autowired
    private GroupChatRepository groupChatRepository;

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

    @Transactional
    public String AddUserToGroupChat(int userId, int groupChatId) {
        Users user = usersRepository.findByUserId(userId);

        GroupChats curGroupChat = groupChatRepository.findByGroupId(groupChatId);

        GroupMembers groupMemberExists = groupMemberRepository.findByUserIdAndGroupId(curGroupChat, user);

        if (groupMemberExists != null) {
            return "User is already a member of this group chat.";
        }

        GroupMembers newGroupMember = new GroupMembers();

        newGroupMember.setGroupId(curGroupChat);
        newGroupMember.setUserId(user);
        newGroupMember.setJoinedAt(new Date());

        groupMemberRepository.save(newGroupMember);

        return "Successfully added user to group chat";
    }
}
