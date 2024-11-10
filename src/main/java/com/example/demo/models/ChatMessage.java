package com.example.demo.models;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {

    private String roomId;

    private String content;

    private String sender;

    private MessageType type;
}
