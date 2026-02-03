package com.example.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.InteractionLog;

public interface InteractionLogRepository extends JpaRepository<InteractionLog, Long> {

    Optional<List<InteractionLog>> findInteractionLogByCustomerId(Long id);
}