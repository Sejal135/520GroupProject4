package com.example.demo.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Plus Ones")
// creates plus ones table in the database, and serves as an object for the database response to map to
public class PlusOnes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plus_one_id")
    private Integer plusOneId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users userId;

    @ManyToOne
    @JoinColumn(name = "review_id")
    private Reviews reviewId;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comments commentId;
}
