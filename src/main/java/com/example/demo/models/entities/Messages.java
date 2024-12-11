package com.example.demo.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Messages")
// creates messages table in the database, and serves as an object for the database response to map to
public class Messages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Integer messageId;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    private GroupChats groupId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users senderId;

    @Column(name = "content", nullable = false)
    private String content;
}
