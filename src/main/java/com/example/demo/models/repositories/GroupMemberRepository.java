package com.example.demo.models.repositories;

import com.example.demo.models.entities.GroupChats;
import com.example.demo.models.entities.GroupMembers;
import com.example.demo.models.entities.Users;
import org.springframework.data.repository.CrudRepository;

public interface GroupMemberRepository extends CrudRepository<GroupMembers, Integer> {

    public GroupMembers findByUserIdAndGroupId(GroupChats chats, Users user);
}
