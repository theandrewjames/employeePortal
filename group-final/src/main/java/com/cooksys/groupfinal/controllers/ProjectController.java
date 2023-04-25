package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.services.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {
	
	private final ProjectService projectService;

	@GetMapping
	public List<ProjectDto> getAllProjects(){
		return projectService.getAllProjects();
	}

	@GetMapping("/{projectId}")
	public ProjectDto getProjectByProjectId(@PathVariable Long projectId){
		return projectService.getProjectByProjectId(projectId);
	}

	@PostMapping
	public ProjectDto createProject(@RequestBody Map<String, Object> json ){
		return projectService.createProject(json);
	}

	@DeleteMapping("/{projectId}")
	public void deleteProject(@PathVariable Long projectId){
		projectService.deleteProject(projectId);
	}

	@PatchMapping("/{projectId}")
	public ProjectDto updateActiveProject(@PathVariable Long projectId, @RequestBody ProjectDto projectDto){
		return projectService.updateActiveProject(projectId, projectDto);
	}

}
