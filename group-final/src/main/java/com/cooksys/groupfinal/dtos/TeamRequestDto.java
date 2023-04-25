package com.cooksys.groupfinal.dtos;

import java.util.Set;

import com.cooksys.groupfinal.entities.Company;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class TeamRequestDto {
	private Long id;
    
    private String name;
    
    private String description;
    
    private Company company;
    
    private Set<BasicUserDto> teammates;
    
    private boolean deleted = false;
}
