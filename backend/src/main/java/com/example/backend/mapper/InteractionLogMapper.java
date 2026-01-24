package com.example.backend.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.example.backend.dto.InteractionLogDTO;
import com.example.backend.model.InteractionLog;



@Mapper(componentModel = "spring")
public interface InteractionLogMapper {

    InteractionLogDTO toDto(InteractionLog interactionLog);

    InteractionLog toEntity(InteractionLogDTO interactionLogDTO);

    // Ignore values null for the customer.
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateInteractionLogFromDto(@MappingTarget InteractionLog entity, InteractionLogDTO dto);

}
