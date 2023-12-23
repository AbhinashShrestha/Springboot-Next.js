package com.mero.animewatchlist.model;

//import com.mero.animewatchlist.entities.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@Table(name = "animelist")
public class AnimeList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Status status;

    private Type genre;

    @Column(name = "dateStarted")
    private LocalDate dateStarted;

    @Column(name = "dateCompleted")
    private LocalDate dateCompleted;

    private String url;

//    @ManyToOne
//    @JoinColumn(name = "user_id",columnDefinition = "Integer")
//    private User user;

}
