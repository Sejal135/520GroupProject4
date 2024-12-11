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
import java.util.UUID;

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

    // Note, this functionality was originally made with the intention of having a user be able to join a
    // specific group chat and not a chat room. As a result, the implemented back-end functionality is not tested
    // for this endpoint.
    @Transactional
    public List<GroupChats> findGroupChatsWithHqlQuery(int resultsPerPage, int page) {

        int skip = (page - 1) * resultsPerPage;

        // gets every groupchat
        String hql = "FROM GroupChats groupChats ORDER BY groupChats.groupId";
        return entityManager.createQuery(hql, GroupChats.class).setFirstResult(skip).setMaxResults(resultsPerPage).getResultList();
    }

    // Note, this functionality was originally made with the intention of having a user be able to join a
    // specific group chat and not a chat room. As a result, the implemented back-end functionality is not tested
    // for this endpoint.
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

    // Note, this functionality was originally made with the intention of having a user be able to join a
    // specific group chat and not a chat room. As a result, the implemented back-end functionality is not tested
    // for this endpoint.
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


    @Transactional
    public String CreateGroupChat(int userId, String groupName) {
        // gets user to create group chat for
        Users user = usersRepository.findByUserId(userId);

        // check if the user has a chat room open already
        GroupChats chatRoomExists = groupChatRepository.findByUserId(user);

        if (chatRoomExists != null) {
            return "You can only have one user per chat room, user already has a chat room";
        }

        // if not, create the chat room object, give it a unique room code, and save it to the database
        GroupChats newChatRoom = new GroupChats();
        newChatRoom.setCreatedAt(new Date());
        newChatRoom.setGroupName(groupName);
        String uuid = UUID.randomUUID().toString();
        newChatRoom.setJoinCode(uuid);
        newChatRoom.setUserId(user);

        groupChatRepository.save(newChatRoom);
        return "Successfully created new chat room with code: " + uuid;
    }

    @Transactional
    public String RemoveGroupChat(int userId) {
        Users user = usersRepository.findByUserId(userId);

        // gets chat room to delete and deletes it
        GroupChats chatRoomToDelete = groupChatRepository.findByUserId(user);
        groupChatRepository.delete(chatRoomToDelete);
        return "Successfully removed group chat from group chats.";
    }

    @Transactional
    public List<GroupChats> GetGroupChatsBySubstring(String groupName, int maxResults) {
        // gets group chats by substring, and orders them by length. That way, we can search by substring, and all
        // results will be found. It won't be possible to have a substring that matches the place exactly and it does
        // not appear as a search result
        String hql =
                "FROM GroupChats groupChats " +
                        "WHERE groupChats.groupName LIKE :groupName " +
                        "ORDER BY LENGTH(groupChats.groupName)";
        return entityManager.createQuery(hql, GroupChats.class).setParameter("groupName", "%" + groupName + "%").setMaxResults(maxResults).getResultList();
    }
}
