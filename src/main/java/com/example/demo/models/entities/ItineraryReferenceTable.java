package com.example.demo.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Itinerary Reference")
// Creates the itinerary reference table, and serves as an object for the database response to map to
public class ItineraryReferenceTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "itinerary_reference_id")
    private int itineraryId;

    @Column(name = "itinerary_name", nullable = false)
    private String itineraryName;

    @Column(name = "itinerary_created_at", nullable = false)
    private Date itineraryTimestamp;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users userForItinerary;

}
