package com.example.demo.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;
import java.util.Date;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Comments")
public class Comments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Integer comment_id;

    @Column(name = "comment_timestamp", nullable = false)
    private Date commentTimestamp;

    @Column(name = "plus_one_count", nullable = false)
    private int plusOneCount;

    @Column(name = "comment_content", nullable = false)
    private String commentContent;

    @ManyToOne
    @JoinColumn(name = "review_id")
    private Reviews review;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;
}
