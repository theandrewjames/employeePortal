package com.cooksys.groupfinal.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/announcements")
@RequiredArgsConstructor
public class AnnouncementController {
	
	private final AnnouncementService announcementService;
	
	@GetMapping("/{id}")
	public AnnouncementDto getAnnouncementById(@PathVariable Long id) {
		return announcementService.getAnnouncementById(id);
	}
	
	@DeleteMapping("/{id}")
	public AnnouncementDto deleteAnnouncement(@RequestBody BasicUserDto basicUserDto, @PathVariable Long id) {
		return announcementService.deleteAnnouncement(basicUserDto, id);
	}

}
