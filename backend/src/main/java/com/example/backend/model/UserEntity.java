package com.example.backend.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "users", schema = "UserManagement")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq_gen")
    @SequenceGenerator(name = "user_seq_gen", sequenceName = "users_seq", allocationSize = 1)
    private Integer id;
    private String name;
    private String email;
    private String status;

    public UserEntity(String name, String email, String status) {
        this.name = name;
        this.email = email;
        this.status = status;

    }
}
