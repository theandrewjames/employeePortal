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

}
