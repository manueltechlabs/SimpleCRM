package com.example.backend.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;

import org.hibernate.type.descriptor.java.BooleanJavaType;

import jakarta.persistence.Column;
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
@FilterDef(
    name = "deletedCustomer",
    parameters = @ParamDef(name = "isDeleted", type = BooleanJavaType.class),
    defaultCondition = "deleted = :isDeleted"
)
@Filter(name = "deletedCustomer")
public class InteractionLog {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private InteractionType interactionType;

    private String subject;

    private String notes;

    private User user;

    private LocalDateTime createdAt;

    @Column(nullable = false)
    private boolean deleted = false;

    private LocalDateTime deletedAt;

    private User deletedBy;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id", nullable = false) // foreign key
    private Customer customer;    

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
