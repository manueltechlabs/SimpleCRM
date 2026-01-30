package com.example.backend.configuration;


import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.backend.model.Customer;
import com.example.backend.model.InteractionLog;
import com.example.backend.model.InteractionType;
import com.example.backend.model.User;
import com.example.backend.service.CustomerService;
import com.example.backend.service.InteractionLogService;


@Component
public class SeedData implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(SeedData.class);

    @Autowired
    private CustomerService customerService;

    @Autowired
    private InteractionLogService interactionLogService;

    @Override
    public void run(String... args) throws Exception {
        customerService.save(new Customer(
            null,
            "John Doe",
            "john.doe@email.com",
            "+1-555-0123",
            "123 Main St, New York, NY",
            LocalDateTime.now(),
            null
        ));

        customerService.save(new Customer(
            null,
            "Jane Smith",
            "jane.smith@email.com",
            "+1-555-0124",
            "456 Oak Ave, Los Angeles, CA",
            LocalDateTime.now(),
            null
        ));

        customerService.save(new Customer(
            null,
            "Alice Johnson",
            "alice.johnson@email.com",
            "+1-555-0125",
            "789 Pine Rd, Chicago, IL",
            LocalDateTime.now(),
            null
        ));

        customerService.save(new Customer(
            null,
            "Bob Brown",
            "bob.brown@email.com",
            "+1-555-0126",
            "321 Elm St, Houston, TX",
            LocalDateTime.now(),
            null
        ));

        customerService.save(new Customer(
            null,
            "Charlie Wilson",
            "charlie.wilson@email.com",
            "+1-555-0127",
            "654 Maple Dr, Phoenix, AZ",
            LocalDateTime.now(),
            null
        ));
        // After saving all customers
        List<Customer> customers = customerService.findAll(); // Implement this method

        // Assign logs to first 4 customers
        for (int i = 0; i < 4; i++) {
            Customer c = customers.get(i);
            for (int j = 0; j < (i + 1); j++) { // 1 to 4 logs per customer
                InteractionLog log = new InteractionLog();
                log.setInteractionType(InteractionType.CALL); // Ensure this enum exists
                log.setSubject("Follow-up " + (j + 1));
                log.setNotes("Discussed account details.");
                log.setCustomer(c);
                log.setUser(User.SALES);
                interactionLogService.save(log); // Use your service
            }
        }
        // Leave last customer (e.g., Charlie Wilson) without logs
    }
}