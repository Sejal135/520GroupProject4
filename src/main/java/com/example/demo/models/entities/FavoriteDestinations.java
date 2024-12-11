package com.example.demo.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Favorite Destinations")
// Creates favorite destinations table in database and serves as an object for the database response to map to
public class FavoriteDestinations {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FavoritePlacesEntryId")
    private Integer favoritePlaceEntryId;

    @ManyToOne
    @JoinColumn(name = "place_id", nullable = false)
    private Places placeId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users userId;
}
