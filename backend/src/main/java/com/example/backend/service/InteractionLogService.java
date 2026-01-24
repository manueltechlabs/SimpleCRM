package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.backend.model.InteractionLog;

@Service("interactionLogService")
public interface InteractionLogService {

    public Optional<List<InteractionLog>> findInteractionLogByCustomerId(Long customerId);

    public InteractionLog save(InteractionLog log);

}
