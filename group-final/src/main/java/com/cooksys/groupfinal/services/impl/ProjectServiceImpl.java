package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    private final TeamRepository teamRepository;
    private final TeamMapper teamMapper;

    @Override
    public Set<ProjectDto> getAllProjectsByTeamId(Long teamId) {

        if(teamRepository.findById(teamId).isPresent()){
            Team team = teamRepository.findById(teamId).get();
            System.out.println(teamMapper.entityToDto(team));

            Set<Project> teamProjects = team.getProjects();
            Set<Project> existingProjects = new HashSet<>();

            for (Project project : teamProjects){
                if (!project.isDeleted()){
                    existingProjects.add(project);
                }
            }

            return projectMapper.entitiesToDtos(existingProjects);
        } else {
            throw new NotFoundException("Team id: " + teamId + " does not exist.");
        }
    }

    @Override
    public ProjectDto createProject(ProjectDto projectDto) {

        if(teamRepository.findById(projectDto.getTeam().getId()).isPresent()){
            Team team = teamRepository.findById(projectDto.getTeam().getId()).get();

            Project project = projectRepository.saveAndFlush(projectMapper.dtoToEntity(projectDto));
            project.setTeam(team);

            return projectMapper.entityToDto(projectRepository.saveAndFlush(project));
        } else {
            throw new BadRequestException("No Team exists with this id: " + projectDto.getTeam().getId());
        }

    }

    @Override
    public ProjectDto deleteProject(Long projectId) {
        if (projectRepository.findById(projectId).isPresent()){
            Project projectToDelete = projectRepository.findById(projectId).get();

            projectToDelete.setDeleted(true);
            projectToDelete.setActive(false);
            projectToDelete.setTeam(null);
            return projectMapper.entityToDto(projectToDelete);

        } else {
            throw new NotFoundException("No Project exists with this id: " + projectId);
        }
    }

    @Override
    public ProjectDto getProjectByProjectId(Long projectId) {
        if (projectRepository.findById(projectId).isPresent()){
            return projectMapper.entityToDto(projectRepository.findById(projectId).get());
        } else {
            throw new NotFoundException("No project exists with this id: " + projectId);
        }
    }
}
