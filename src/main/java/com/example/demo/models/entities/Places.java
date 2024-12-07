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
public class Places {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    private Integer placeId;

    @Column(name = "place_name", nullable = false)
    private String placeName;

    @Enumerated(EnumType.STRING)
    private DestinationType placeType;
}
