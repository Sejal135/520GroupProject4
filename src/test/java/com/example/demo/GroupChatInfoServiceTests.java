package com.example.demo;

import com.example.demo.models.DestinationType;
import com.example.demo.models.entities.*;
import com.example.demo.models.repositories.*;
import com.example.demo.services.*;
import org.apache.catalina.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Import(TestConfig.class)
@DataJpaTest
@AutoConfigureTestDatabase (connection = EmbeddedDatabaseConnection.H2)
public class GroupChatInfoServiceTests {

    @Autowired
    ExplorerHomepageService explorerHomepageService;

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    ReviewsRepository reviewsRepository;

    @Autowired
    UsersService usersService;

    @Autowired
    ReviewsService reviewsService;

    @Autowired
    PlaceRepository placeRepository;

    @Autowired
    PreferencesRepository preferencesRepository;

    @Autowired
    GroupChatInfoService groupChatInfoService;

    @Test
    public void GroupChatInfoServiceTests() {

        // Set up objects to perform tests on
        Users users1 = createUser("my username", "user1@gmail.com");

        usersRepository.save(users1);

        // Test create group chat and get group chats by substring

        String response = groupChatInfoService.CreateGroupChat(users1.getUserId(), "User 1's Group");

        Assertions.assertThat(response).startsWith("Successfully created new chat room with code:");

        // It should be the case that returning a substring should return the group chat, as it queries by
        // substring

        List<GroupChats> groupChatsList = groupChatInfoService.GetGroupChatsBySubstring("1's Gro", 5);

        Assertions.assertThat(groupChatsList)
                .hasSize(1)
                .extracting(GroupChats::getGroupName)
                .element(0)
                .isEqualTo("User 1's Group");

        // Test that having a user attempt to have more than one group chat prohibits the user from making another

        String responseBad = groupChatInfoService.CreateGroupChat(users1.getUserId(), "User 1's second group");

        Assertions.assertThat(responseBad).isEqualTo("You can only have one user per chat room, user already has a chat room");

        // Test that removing a group chat removes the group chat from the list

        String responseDeleted = groupChatInfoService.RemoveGroupChat(users1.getUserId());

        Assertions.assertThat(responseDeleted).isEqualTo("Successfully removed group chat from group chats.");

        List<GroupChats> groupChatsListEmpty = groupChatInfoService.GetGroupChatsBySubstring("User 1's Group", 5);

        Assertions.assertThat(groupChatsListEmpty).isEmpty();
    }

    private GroupChats createGroupChat(String groupName, Users user) {
        GroupChats groupChat = new GroupChats();
        groupChat.setGroupName(groupName);
        groupChat.setCreatedAt(new Date());
        groupChat.setUserId(user);
        groupChat.setJoinCode(UUID.randomUUID().toString());
        return groupChat;
    }

    private Users createUser(String username, String email) {
        Users user = new Users();
        user.setUsername(username);
        user.setEmail(email);
        user.setBio("My bio");
        user.setLocation("My house");
        user.setCreatedAt(new Date());
        user.setBirthDay(new Date());
        return user;
    }
}
