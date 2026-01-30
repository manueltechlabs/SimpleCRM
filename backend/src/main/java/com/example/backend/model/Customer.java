package com.example.backend.model;


import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "customers", schema = "SimpleCRM")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private LocalDateTime createdAt;

    // Interaction logs are inmutable. PERSIST: Ensures new logs are saved when the customer is saved.
    // FetchType.LAZY on the interactionLog collection to avoid loading all logs unless explicitly accessed.
    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY)
    private Set<InteractionLog> interactionLog = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}