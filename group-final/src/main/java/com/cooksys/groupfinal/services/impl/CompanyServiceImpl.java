package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.*;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.*;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
	
	private final CompanyRepository companyRepository;
	private final TeamRepository teamRepository;
	private final UserRepository userRepository;
	private final AnnouncementRepository announcementRepository;
	private final FullUserMapper fullUserMapper;
	private final BasicUserMapper basicUserMapper;
	private final AnnouncementMapper announcementMapper;
	private final TeamMapper teamMapper;
	private final ProjectMapper projectMapper;
	
	private Company findCompany(Long id) {
        Optional<Company> companySearch = companyRepository.findById(id);
        if (companySearch.isEmpty()) {
            throw new NotFoundException("A company with the provided id does not exist.");
        }
        Company company = companySearch.get();
        if (company.isDeleted()) {
        	throw new NotFoundException("A company with the provided id does not exist.");
        } else {
        	return company;
        }
    }
	
	private Team findTeam(Long id) {
        Optional<Team> team = teamRepository.findById(id);
        if (team.isEmpty()) {
            throw new NotFoundException("A team with the provided id does not exist.");
        }
        return team.get();
    }
	
	private User findUser(Long id) {
		Optional<User> user = userRepository.findById(id);
		if (user.isEmpty()) {
			throw new NotFoundException("That user doesn't exist.");
		}
		return user.get();
	}
	
	@Override
	public Set<FullUserDto> getAllUsers(Long id) {
		Company company = findCompany(id);
		Set<User> filteredUsers = new HashSet<>();
		company.getEmployees().forEach(filteredUsers::add);
		filteredUsers.removeIf(user -> !user.isActive());
		return fullUserMapper.entitiesToFullUserDtos(filteredUsers);
	}

	@Override
	public Set<AnnouncementDto> getAllAnnouncements(Long id) {
		Company company = findCompany(id);
		List<Announcement> sortedList = new ArrayList<Announcement>(company.getAnnouncements());
		sortedList.sort(Comparator.comparing(Announcement::getDate).reversed());
		Set<Announcement> sortedSet = new HashSet<Announcement>(sortedList);
		return announcementMapper.entitiesToDtos(sortedSet);
	}

	@Override
	public Set<TeamDto> getAllTeams(Long id) {
		Company company = findCompany(id);
		return teamMapper.entitiesToDtos(company.getTeams());
	}

	@Override
	public Set<ProjectDto> getAllProjects(Long companyId, Long teamId) {
		Company company = findCompany(companyId);
		Team team = findTeam(teamId);
		if (!company.getTeams().contains(team)) {
			throw new NotFoundException("A team with id " + teamId + " does not exist at company with id " + companyId + ".");
		}
		Set<Project> filteredProjects = new HashSet<>();
		team.getProjects().forEach(filteredProjects::add);
		filteredProjects.removeIf(project -> project.isDeleted());
		return projectMapper.entitiesToDtos(filteredProjects);
	}

	@Override
	public BasicUserDto createUser(Long id, UserRequestDto userRequestDto) {
		Company company = findCompany(id);
		User user = basicUserMapper.requestDtoToEntity(userRequestDto);
		if(company.getEmployees().contains(user)) {
			throw new BadRequestException("This user already exists");
		}
		user.setActive(true);
		userRepository.saveAndFlush(user);
		company.getEmployees().add(user);
		companyRepository.saveAndFlush(company);
		return basicUserMapper.entityToBasicUserDto(user);
	}


	@Override
	public AnnouncementDto createAnnouncement(AnnouncementRequestDto announcementRequestDto, Long id) {
		
		if (!announcementRequestDto.getAuthor().isAdmin()) {

			throw new NotAuthorizedException("You are not authorized to post this announcement.");
		}

		Company company = findCompany(id);
		Announcement announcement = announcementRepository.saveAndFlush(announcementMapper.dtoToEntity(announcementRequestDto));
		announcement.setCompany(company);
		
		User author = findUser(announcement.getAuthor().getId());
		announcement.setAuthor(author);		
		
		return announcementMapper.entityToDto(announcementRepository.saveAndFlush(announcement));
	}

	@Override
	public void deleteUser(Long id, Long userId) {
		Optional<User> user = userRepository.findById(userId);
		if(!user.isPresent()) {
			throw new BadRequestException("No user found");
		}
		user.get().setActive(false);
		userRepository.saveAndFlush(user.get());
	}

}
