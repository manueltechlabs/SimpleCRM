package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> getCustomerById(Long id);
    @Query("SELECT c FROM Customer c JOIN c.interactionLog i ORDER BY i.createdAt DESC")
    Page<Customer> findTopByLatestInteraction(Pageable pageable);   
}
