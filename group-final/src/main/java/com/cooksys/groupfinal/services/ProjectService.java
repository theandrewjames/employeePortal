package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.ProjectDto;

public interface ProjectService {

    ProjectDto createProject(ProjectDto projectDto);

    void deleteProject(Long projectId);

    ProjectDto getProjectByProjectId(Long projectId);

}
