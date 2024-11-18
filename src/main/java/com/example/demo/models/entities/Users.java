package com.example.demo.models.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "bio", length = 65535, columnDefinition = "Text")
    private String bio;

    @Column(name = "profile_pic", length = 65535, columnDefinition = "Text")
    private String profilePic;

    @Column(name = "email", length = 1000)
    private String email;

    @OneToOne
    @JoinColumn(name = "social_media_links_id")
    private SocialMediaLinks socialMediaLinks;

    @OneToOne
    @JoinColumn(name = "travel_preferences")
    private Preferences preferences;

    // Social media links will go here


}
