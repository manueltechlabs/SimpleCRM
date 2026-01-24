package com.example.backend.service.serviceImpl;

import java.util.List;
import java.util.Optional;

import com.example.backend.model.InteractionLog;
import com.example.backend.repository.InteractionLogRepository;
import com.example.backend.service.InteractionLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;   

@Service
public class InteractionLogServiceImpl implements InteractionLogService{

    @Autowired
    InteractionLogRepository interactionLogRepository;

    @Override
    public Optional<List<InteractionLog>> findInteractionLogByCustomerId(Long customerId) {
        return interactionLogRepository.findInteractionLogByCustomerId(customerId);
    }

    @Override
    public InteractionLog save(InteractionLog log) {
        return interactionLogRepository.save(log);
    }
    
}