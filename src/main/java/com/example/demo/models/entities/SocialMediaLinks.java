package com.example.demo.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "social_media_links")
// creates the social media links table in the database, currently has no functionality
public class SocialMediaLinks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "social_media_links_id")
    private Integer socialMedialLinksId;

    @Column(name = "linkedin_link")
    private String linkedInLink;
}
