package com.example.demo.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.sql.Timestamp;
import java.time.LocalDate;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Group Members")
public class GroupMembers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Integer memberId;

    @Column(name = "joined_at", nullable = false)
    private Date joinedAt;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    private GroupChats groupId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users userId;
}