package com.neighborhood.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.Announcement;
import java.util.Map;

public interface AnnouncementService {
    Page<Announcement> getAnnouncementPage(Map<String, Object> params);
    Announcement getAnnouncementDetail(Long id);
    boolean addAnnouncement(Announcement announcement);
    boolean updateAnnouncement(Announcement announcement);
    boolean deleteAnnouncement(Long id);
    boolean publishAnnouncement(Long id);
}
