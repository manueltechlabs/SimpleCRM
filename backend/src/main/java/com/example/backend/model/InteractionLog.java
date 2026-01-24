package com.example.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
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
@Table(name = "interaction_log", schema = "SimpleCRM")
public class InteractionLog {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;

    InteractionType interactionType;

    String subject;

    String notes;

    LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id", nullable = false) // foreign key
    private Customer customer;
    
    User user;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
