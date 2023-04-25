package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final TeamMapper teamMapper;

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    @Override
    public Set<ProjectDto> getAllProjectsByTeamId(Long teamId) {

        if(teamRepository.findById(teamId).isPresent()){
            Team team = teamRepository.findById(teamId).get();

            Set<Project> teamProjects = team.getProjects();
            Set<Project> existingProjects = new HashSet<>();

            for (Project project : teamProjects){
                if (!project.isDeleted()){
                    existingProjects.add(project);
                }
            }

            //existingProjects.removeIf((project -> !project.isActive()));

            return projectMapper.entitiesToDtos(existingProjects);
        } else {
            throw new NotFoundException("Team id: " + teamId + " does not exist.");
        }
    }
}
