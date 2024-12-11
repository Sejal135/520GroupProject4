package com.example.demo.models.entities;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.catalina.User;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Group Chats")
// Creates group chats table in the database and serves as an object for the database response to map to
public class GroupChats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id")
    private Integer groupId;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @Column(name = "group_name", nullable = false, unique = true)
    private String groupName;

    @Column(name = "join_code", nullable = false, unique = true)
    private String joinCode;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private Users userId;


}
