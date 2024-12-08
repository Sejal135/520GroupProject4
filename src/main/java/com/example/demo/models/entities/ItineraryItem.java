package com.example.demo.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Itinerary Item")
public class ItineraryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "itinerary_item_id")
    private int itineraryItemId;

    @Column(name = "itinerary_item_header", length = 500, nullable = false)
    private String itineraryItemHeader;

    @Column(name = "itinerary_item_description", length = 1000, nullable = false)
    private String itineraryItemDescription;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    @Column(name = "time_item_at", nullable = false)
    private Date timeItemAt;

    @ManyToOne
    @JoinColumn(name = "itinerary_reference_id", nullable = false)
    private ItineraryReferenceTable itineraryReferenceId;
}
