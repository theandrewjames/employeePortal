package com.cooksys.groupfinal.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {
	
	private final AnnouncementRepository announcementRepository;
	private final AnnouncementMapper announcementMapper;
	
	public Announcement findAnnouncement(Long id) {
		
		Optional<Announcement> announcementSearch = announcementRepository.findById(id);
		
		if (announcementSearch.isEmpty()) {
			throw new NotFoundException("Branch 1");
		}
		
		Announcement announcement = announcementSearch.get();
		if (announcement.isDeleted()) {
			throw new NotFoundException("Branch 2");
		} else {
			return announcement;
		}
	}
	
	@Override
	public AnnouncementDto getAnnouncementById(Long id) {
		
		Announcement announcment = findAnnouncement(id);
		
		return announcementMapper.entityToDto(announcment);
		
	}

}