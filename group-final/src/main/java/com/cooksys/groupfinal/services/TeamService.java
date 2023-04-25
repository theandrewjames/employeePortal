package com.cooksys.groupfinal.services;

import java.util.Set;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;

public interface TeamService {

	Set<TeamDto> getTeams(Long id);

	TeamDto createTeam(Long authorId, TeamRequestDto teamRequestDto);

	TeamDto deleteTeam(Long id);

}
