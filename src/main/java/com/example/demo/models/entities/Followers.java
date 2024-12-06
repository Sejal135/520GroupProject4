package com.example.demo.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Followers")

public class Followers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_entry_id")
    private int followEntryId;

    @ManyToOne
    @JoinColumn(name = "follower_id", referencedColumnName = "user_id", nullable = false)
    private Users followerId;

    @ManyToOne
    @JoinColumn(name = "poster_id", referencedColumnName = "user_id", nullable = false)
    private Users posterId;
}
