package com.example.backend.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.CustomerDTO;
import com.example.backend.dto.InteractionLogDTO;
import com.example.backend.mapper.CustomerMapper;
import com.example.backend.mapper.InteractionLogMapper;
import com.example.backend.model.Customer;
import com.example.backend.model.InteractionLog;
import com.example.backend.service.CustomerService;
import com.example.backend.service.InteractionLogService;

import jakarta.persistence.EntityManager;




@RestController
@CrossOrigin(origins = "*")
public class InteractionLogController {
    private final InteractionLogService interactionLogService;   
    private final InteractionLogMapper interactionLogMapper;

    private final CustomerService customerService;
    private final CustomerMapper customerMapper;

    @Autowired
    EntityManager entityManager;

    public InteractionLogController(InteractionLogService interactionLogService,
        InteractionLogMapper interactionLogMapper, 
        CustomerService customerService,
        CustomerMapper customerMapper) {

            this.interactionLogService = interactionLogService;
            this.interactionLogMapper = interactionLogMapper;
            this.customerService = customerService;
            this.customerMapper = customerMapper;
    }
    @GetMapping("/customers/{customerId}/logs")
    public ResponseEntity<List<InteractionLogDTO>> 
        findCustomerLogs(@PathVariable Long customerId,
            @RequestParam(defaultValue = "false") boolean showDeleted) {

                boolean isAdmin = false; // placeholder until security is implemented
                Session session = entityManager.unwrap(Session.class);

                if (isAdmin && showDeleted) {
                    // Admin wants to see deleted logs → disable filter
                    session.disableFilter("deletedCustomer");
                } else {
                    // Regular behavior: show only non-deleted
                    session.enableFilter("deletedCustomer").setParameter("isDeleted", false);
                }



                Optional<List<InteractionLog>> optionalInteractionLog 
                    = interactionLogService.findInteractionLogByCustomerId(customerId);

                if(optionalInteractionLog.isPresent()) {

                    List<InteractionLog> interactionLogs 
                        = optionalInteractionLog.get();

                    List<InteractionLogDTO> interactionLogDTOs
                        = new ArrayList<>();

                    for (InteractionLog il : interactionLogs) {
                        InteractionLogDTO dto = interactionLogMapper.toDto(il);
                        interactionLogDTOs.add(dto);
                    }

                    return ResponseEntity.ok(interactionLogDTOs);

                } else {
                    return ResponseEntity.notFound().build();
                }
    }
    @PostMapping("/customers/{customerId}/logs")
    public ResponseEntity<InteractionLogDTO> save(
        @PathVariable Long customerId, 
        @RequestBody InteractionLogDTO log) {
            Optional<Customer> optionalCustomer = customerService.getCustomerById(customerId);
            if (optionalCustomer.isPresent()) {
                InteractionLog interactionLog = interactionLogMapper.toEntity(log);
                interactionLog.setCustomer(optionalCustomer.get());
                InteractionLog savedLog = interactionLogService.save(interactionLog);
                return ResponseEntity.ok(interactionLogMapper.toDto(savedLog));
            } else {
                return ResponseEntity.notFound().build();
            }
    }
    @DeleteMapping("/logs/{id}")
    public ResponseEntity<Void> deleteCustomerLog(@PathVariable Long id) {
        interactionLogService.softDeleteInteractionLog(id);
        return ResponseEntity.noContent().build();
    }
}
