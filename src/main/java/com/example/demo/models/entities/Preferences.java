package com.example.demo.models.entities;

import com.example.demo.models.TravelerTypes;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Preferences")
public class Preferences {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "preference_id")
    private Integer preferenceId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users userId;

    @Column(name = "preferences", nullable = false)
    @Enumerated(EnumType.STRING)
    TravelerTypes preference;
}
