package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.ProjectDto;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {
	
	private final ProjectService projectService;


	@GetMapping("/{projectId}")
	public ProjectDto getProjectByProjectId(@PathVariable Long projectId){
		return projectService.getProjectByProjectId(projectId);
	}

	@PostMapping
	public ProjectDto createProject(@RequestBody ProjectDto projectDto){
		return projectService.createProject(projectDto);
	}

	@DeleteMapping("/{projectId}")
	public ProjectDto deleteProject(@PathVariable Long projectId){
		return projectService.deleteProject(projectId);
	}

}
