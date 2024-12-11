package com.example.demo.controllers;

import com.example.demo.models.ChatMessage;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ChatController {

    // Handles the sending of messages to other chats over the established handshake connnection
    // Implementation mostly the same as provided by Ali Bouali, changes were made to add a room id so that multiple
    // chat rooms can exist concurrently
    @CrossOrigin
    @MessageMapping("/chat.sendMessage/{roomId}")
    @SendTo("/topic/{roomId}")
    public ChatMessage sendMessage(
            @PathVariable String roomId, @Payload ChatMessage chatMessage
    ) {
        return chatMessage;
    }

    // Handles the adding of a user to a new chat room
    @CrossOrigin
    @MessageMapping("/chat.addUser/{roomId}")
    @SendTo("/topic/{roomId}")
    public ChatMessage addUser(
            @PathVariable String roomId,
            @Payload ChatMessage chatMessage,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }
}
