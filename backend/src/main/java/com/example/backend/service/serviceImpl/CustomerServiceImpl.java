package com.example.backend.service.serviceImpl;

import com.example.backend.model.Customer;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.getCustomerById(id);
    }

    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    public Customer save(Customer customer) {
        return customerRepository.save(customer);
    }

    public Optional<Customer> updateCustomer(Long id, Customer customer) {
        Optional<Customer> optionalCustomer = customerRepository.findById(id);
        if (optionalCustomer.isPresent()) {
            Customer existingCustomer = optionalCustomer.get();
            // Apply updates only if fields are not null
            if (customer.getName() != null) {
                existingCustomer.setName(customer.getName());
            }
            if (customer.getEmail() != null) {
                existingCustomer.setEmail(customer.getEmail());
            }
            if (customer.getPhone() != null) {
                existingCustomer.setPhone(customer.getPhone());
            }
            if (customer.getAddress() != null) {
                existingCustomer.setAddress(customer.getAddress());
            }
            Customer savedCustomer = customerRepository.save(existingCustomer);
            return Optional.of(savedCustomer);
        }
        return Optional.empty();
    }

    public Optional<Customer> deleteCustomer(Long id) {
        Optional<Customer> optionalCustomer = customerRepository.findById(id);

        if(optionalCustomer.isPresent()) {
            customerRepository.deleteById(id);
        }
        return optionalCustomer;
    }
}