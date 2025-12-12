package com.example.backend.configuration;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.backend.model.UserEntity;
import com.example.backend.persistence.UserRepository;


@Component
public class SeedData implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(SeedData.class);

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        userRepository.save(new UserEntity("User1", "user1@mail.com", "active"));
        userRepository.save(new UserEntity("User2", "user2@mail.com", "active"));
        userRepository.save(new UserEntity("User3", "user3@mail.com", "active"));
    }
}