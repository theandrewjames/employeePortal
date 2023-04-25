package com.cooksys.groupfinal.controllers;

import java.util.Set;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;
import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class TeamController {
	
	private final TeamService teamService;
	
	@GetMapping("/user/{id}")
	public Set<TeamDto> getTeams(@PathVariable Long id){
		return teamService.getTeams(id);
	};
	
	@PostMapping("/{authorId}")
	public TeamDto createTeam(@PathVariable Long authorId, @RequestBody TeamRequestDto teamRequestDto) {
		return teamService.createTeam(authorId,teamRequestDto);
	}
	
	@DeleteMapping("/{id}")
	public TeamDto deleteTeam(@PathVariable Long id) {
		return teamService.deleteTeam(id);
	}
}
