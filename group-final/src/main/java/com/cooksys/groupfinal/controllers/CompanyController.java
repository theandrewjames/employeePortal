package com.cooksys.groupfinal.controllers;

import java.util.Set;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.User;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.services.CompanyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/company")
@RequiredArgsConstructor
public class CompanyController {
	
	private final CompanyService companyService;
	
	@GetMapping("/{id}/users")
    public Set<FullUserDto> getAllUsers(@PathVariable Long id) {
        return companyService.getAllUsers(id);
    }

    @PostMapping("/{id}/users")
    public BasicUserDto createUser(@PathVariable Long id, @RequestBody UserRequestDto userRequestDto) {
	    return companyService.createUser(id, userRequestDto);
    }
	@DeleteMapping("/{id}/users/{userId}/delete")
	public void deleteUser(@PathVariable Long id, @PathVariable Long userId) {
		companyService.deleteUser(id, userId);
	}
	@GetMapping("/{id}/announcements")
    public Set<AnnouncementDto> getAllAnnouncements(@PathVariable Long id) {
        return companyService.getAllAnnouncements(id);
    }

	@GetMapping("/{id}/teams")
    public Set<TeamDto> getAllTeams(@PathVariable Long id) {
        return companyService.getAllTeams(id);
    }
	
	@GetMapping("/{companyId}/teams/{teamId}/projects") 
	public Set<ProjectDto> getAllProjects(@PathVariable Long companyId, @PathVariable Long teamId) {
		return companyService.getAllProjects(companyId, teamId);
	}
	
	@PostMapping("/{id}/announcements")
	public AnnouncementDto createAnnouncement(@RequestBody AnnouncementRequestDto announcementRequestDto, @PathVariable Long id) {
		return companyService.createAnnouncement(announcementRequestDto, id);
	}

}
