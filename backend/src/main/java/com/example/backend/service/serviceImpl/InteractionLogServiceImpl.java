package com.example.backend.service.serviceImpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.example.backend.model.InteractionLog;
import com.example.backend.model.User;
import com.example.backend.repository.InteractionLogRepository;
import com.example.backend.service.InteractionLogService;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
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

    @Override
    @Transactional
    public InteractionLog softDeleteInteractionLog(Long id) {
        Optional<InteractionLog> optionalLog = interactionLogRepository.findById(id);
        if (optionalLog.isPresent()) {
            InteractionLog log =  optionalLog.get();
            log.setDeleted(true);
            log.setDeletedAt(LocalDateTime.now());
            log.setDeletedBy(User.SALES);            
            return interactionLogRepository.save(log);
        } else throw new EmptyResultDataAccessException("Interaction log not found with id " + id, 1);
    }
}