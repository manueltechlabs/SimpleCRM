package com.example.backend.configuration;


import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.backend.model.Customer;
import com.example.backend.service.CustomerService;


@Component
public class SeedData implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(SeedData.class);

    @Autowired
    private CustomerService customerService;

    @Override
    public void run(String... args) throws Exception {
        customerService.save(new Customer(
            null,
            "John Doe",
            "john.doe@email.com",
            "+1-555-0123",
            "123 Main St, New York, NY",
            LocalDateTime.now()
        ));

        customerService.save(new Customer(
            null,
            "Jane Smith",
            "jane.smith@email.com",
            "+1-555-0124",
            "456 Oak Ave, Los Angeles, CA",
            LocalDateTime.now()
        ));

        customerService.save(new Customer(
            null,
            "Alice Johnson",
            "alice.johnson@email.com",
            "+1-555-0125",
            "789 Pine Rd, Chicago, IL",
            LocalDateTime.now()
        ));

        customerService.save(new Customer(
            null,
            "Bob Brown",
            "bob.brown@email.com",
            "+1-555-0126",
            "321 Elm St, Houston, TX",
            LocalDateTime.now()
        ));

        customerService.save(new Customer(
            null,
            "Charlie Wilson",
            "charlie.wilson@email.com",
            "+1-555-0127",
            "654 Maple Dr, Phoenix, AZ",
            LocalDateTime.now()
        ));   
    }
}