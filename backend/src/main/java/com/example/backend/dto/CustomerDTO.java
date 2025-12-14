package com.example.backend.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;

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
public class CustomerDTO {
    private String name;
    private String email;
    private String phone;
    private String address;
    private LocalDateTime createdAt;

    // @JsonSetter(nulls = Nulls.SET)
    // public void setName(String name) { this.name = name; }

    // @JsonSetter(nulls = Nulls.SET)
    // public void setEmail(String email) { this.email = email; }

    // @JsonSetter(nulls = Nulls.SET)
    // public void setPhone(String phone) { this.phone = phone; }

    // @JsonSetter(nulls = Nulls.SET)
    // public void setAddress(String address) { this.address = address; }
}
