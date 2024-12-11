package com.example.demo.models.repositories;

import com.example.demo.models.entities.GroupChats;
import com.example.demo.models.entities.Users;
import org.springframework.data.repository.CrudRepository;
// repository which allows for HQL-less queries to be executed automatically
public interface GroupChatRepository extends CrudRepository<GroupChats, Integer> {

    public GroupChats findByGroupId(int groupId);

    public GroupChats findByUserId(Users userId);

}
