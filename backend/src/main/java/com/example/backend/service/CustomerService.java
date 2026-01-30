package com.example.backend.service;

import com.example.backend.model.Customer;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("customerService")
public interface CustomerService {


    public Optional<Customer> getCustomerById(Long id);

    public List<Customer> findAll();


    public Customer save(Customer customer);


    public Optional<Customer> updateCustomer(Long id, Customer customer);


    public Optional<Customer> deleteCustomer(Long id);

    public Optional<Customer> getLastInteractedCustomer();
}