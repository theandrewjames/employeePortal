package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.ProjectDto;

import java.util.Set;

public interface TeamService {

    Set<ProjectDto> getAllProjectsByTeamId(Long teamId);
}
