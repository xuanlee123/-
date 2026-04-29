package com.neighborhood.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.Announcement;
import com.neighborhood.mapper.AnnouncementMapper;
import com.neighborhood.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
public class AnnouncementServiceImpl implements AnnouncementService {

    @Autowired
    private AnnouncementMapper announcementMapper;

    @Override
    public Page<Announcement> getAnnouncementPage(Map<String, Object> params) {
        Integer pageNum = params.get("pageNum") != null ? Integer.parseInt(params.get("pageNum").toString()) : 1;
        Integer pageSize = params.get("pageSize") != null ? Integer.parseInt(params.get("pageSize").toString()) : 10;
        
        Page<Announcement> page = new Page<>(pageNum, pageSize);
        QueryWrapper<Announcement> wrapper = new QueryWrapper<>();

        if (params.get("all") == null) {
            wrapper.eq("status", 1);
        }
        
        if (params.get("type") != null) {
            wrapper.eq("type", params.get("type"));
        }
        
        wrapper.orderByDesc("publish_time", "create_time");
        return announcementMapper.selectPage(page, wrapper);
    }

    @Override
    public Announcement getAnnouncementDetail(Long id) {
        Announcement announcement = announcementMapper.selectById(id);
        if (announcement != null) {
            announcement.setReadCount(announcement.getReadCount() + 1);
            announcementMapper.updateById(announcement);
        }
        return announcement;
    }

    @Override
    public boolean addAnnouncement(Announcement announcement) {
        announcement.setCreateTime(LocalDateTime.now());
        announcement.setUpdateTime(LocalDateTime.now());
        announcement.setReadCount(0);
        announcement.setShareCount(0);
        return announcementMapper.insert(announcement) > 0;
    }

    @Override
    public boolean updateAnnouncement(Announcement announcement) {
        announcement.setUpdateTime(LocalDateTime.now());
        return announcementMapper.updateById(announcement) > 0;
    }

    @Override
    public boolean deleteAnnouncement(Long id) {
        return announcementMapper.deleteById(id) > 0;
    }

    @Override
    public boolean publishAnnouncement(Long id) {
        Announcement announcement = announcementMapper.selectById(id);
        announcement.setStatus(1);
        announcement.setPublishTime(LocalDateTime.now());
        announcement.setUpdateTime(LocalDateTime.now());
        return announcementMapper.updateById(announcement) > 0;
    }
}
