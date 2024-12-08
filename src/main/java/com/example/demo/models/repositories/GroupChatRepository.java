package com.example.demo.models.repositories;

import com.example.demo.models.entities.GroupChats;
import org.springframework.data.repository.CrudRepository;

public interface GroupChatRepository extends CrudRepository<GroupChats, Integer> {

    public GroupChats findByGroupId(int groupId);

}
