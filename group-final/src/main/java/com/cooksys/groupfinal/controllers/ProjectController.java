package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.services.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {
	
	private final ProjectService projectService;


	//@GetMapping("/")
//	public List<ProjectDto> getAllProjectsByTeam(){
//		return projectService.getAllProjectsByTeam();
//	}

	@GetMapping("/{projectId}")
	public ProjectDto getProjectByProjectId(@PathVariable Long projectId){
		return projectService.getProjectByProjectId(projectId);
	}

	@PostMapping
	public ProjectDto createProject(@RequestBody Map<String, Object> json ){
		return projectService.createProject(json);
	}
//	public ProjectDto createProject(@RequestBody ProjectDto projectDto){
//		return projectService.createProject(projectDto);
//	}

	@DeleteMapping("/{projectId}")
	public void deleteProject(@PathVariable Long projectId){
		projectService.deleteProject(projectId);
	}

}
