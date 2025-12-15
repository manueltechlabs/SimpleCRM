package com.example.backend.controller;

import com.example.backend.dto.CustomerDTO;
import com.example.backend.mapper.CustomerMapper;
import com.example.backend.model.Customer;
import com.example.backend.service.CustomerService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class CustomerController {

    private static final Logger log = LoggerFactory.getLogger(CustomerController.class);


    private final CustomerService customerService;
    
    private final CustomerMapper customerMapper;

    public CustomerController(CustomerService customerService, CustomerMapper customerMapper) {
        this.customerService = customerService;
        this.customerMapper = customerMapper;
    }

    @GetMapping("/customers/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        Optional<Customer> optionalCustomer = customerService.getCustomerById(id);
        return optionalCustomer.isPresent()
            ? ResponseEntity.ok(optionalCustomer.get())
            : ResponseEntity.notFound().build();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/customers")
    public ResponseEntity<List<Customer>> getUsers() {
        return new ResponseEntity<>(customerService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/customers")
    public ResponseEntity<CustomerDTO> save(@RequestBody CustomerDTO customerDTO) {
        Customer customer = customerMapper.toEntity(customerDTO);
        Customer savedCustomer = customerService.save(customer);
        return ResponseEntity.ok(customerMapper.toDto(savedCustomer));        
    }

    @PostMapping(path = "/customers/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CustomerDTO> updateCustomer(@PathVariable Long id, @RequestBody CustomerDTO dto) {
        Optional<Customer> optionalCustomer = customerService.getCustomerById(id);
        if (optionalCustomer.isPresent()) {
            Customer customer = optionalCustomer.get();
            // Use mapper to apply non-null fields from DTO to entity
            customerMapper.updateCustomerFromDto(customer, dto);
            Customer updatedCustomer = customerService.save(customer);
            return ResponseEntity.ok(customerMapper.toDto(updatedCustomer));
            
        } else {
            return ResponseEntity.notFound().build();
        }        
    }

    @DeleteMapping("/customers/{id}")
    public ResponseEntity<Integer> deleteCustomer(@PathVariable Long id) {
        log.info("DELETE /customers - Request received for id: {}", id);
        Optional<Customer> optionalCustomer = customerService.deleteCustomer(id);
        return optionalCustomer.isPresent()
        ? ResponseEntity.ok(optionalCustomer.get().getId())
        : ResponseEntity.notFound().build();
    }
}