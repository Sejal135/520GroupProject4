package com.example.demo.models.entities;

import com.example.demo.models.DestinationType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Places")
// creates places table in the database, and serves as an object for the database response to map to
public class Places {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    private Integer placeId;

    @Column(name = "place_name", nullable = false)
    private String placeName;

    @Column(name = "place_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private DestinationType placeType;
}
