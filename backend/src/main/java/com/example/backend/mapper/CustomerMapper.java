package com.example.backend.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.example.backend.dto.CustomerDTO;
import com.example.backend.model.Customer;



@Mapper(componentModel = "spring")
//@Mapper(componentModel = "spring", uses = CustomerMapper.class)
public interface CustomerMapper {
    // CustomerMapper INSTANCE = Mappers.getMapper(CustomerMapper.class);
    CustomerDTO toDto(Customer customer);

    Customer toEntity(CustomerDTO customerDTO);

    // Ignore values null for the customer.
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCustomerFromDto(@MappingTarget Customer entity, CustomerDTO dto);

}