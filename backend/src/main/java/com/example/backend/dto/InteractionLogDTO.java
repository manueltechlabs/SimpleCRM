package com.example.backend.dto;

import java.time.LocalDateTime;

import com.example.backend.model.InteractionType;
import com.example.backend.model.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InteractionLogDTO {

    Long id;

    CustomerDTO customer;

    InteractionType interactionType;

    String subject;

    String notes;

    LocalDateTime createdAt;
    
    User user;
    
}
