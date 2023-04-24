package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.ProjectDto;

import java.util.List;
import java.util.Set;

public interface ProjectService {

    Set<ProjectDto> getAllProjectsByTeamId(Long teamId);

    ProjectDto createProject(ProjectDto projectDto);

    ProjectDto deleteProject(Long projectId);

    ProjectDto getProjectByProjectId(Long projectId);
}
