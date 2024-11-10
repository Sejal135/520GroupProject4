package com.example.demo.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.catalina.User;
import org.hibernate.annotations.Type;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Reviews")
public class Reviews {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private int reviewId;

    @Column(name = "review_title", nullable = false, length = 65535, columnDefinition = "Text")
    private String title;

    @Column(name = "review_contents", nullable = false, length = 65535, columnDefinition = "Text")
    private String review;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users reviewerId;

    @Column(name = "time_review_left", nullable = false)
    private Date timeReviewLeft;

    @Column(name = "plus_one_count", nullable = false)
    private int plusOneCount;

    @ManyToOne
    @JoinColumn(name = "place_id", nullable = false)
    private Places placeId;
}
