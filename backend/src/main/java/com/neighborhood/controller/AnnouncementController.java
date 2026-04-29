package com.neighborhood.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.Announcement;
import com.neighborhood.service.AnnouncementService;
import com.neighborhood.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/announcement")
@CrossOrigin
public class AnnouncementController {

    @Autowired
    private AnnouncementService announcementService;

    @GetMapping("/list")
    public Result getAnnouncementList(@RequestParam Map<String, Object> params) {
        Page<Announcement> page = announcementService.getAnnouncementPage(params);
        return Result.success(page);
    }

    @GetMapping("/detail/{id}")
    public Result getAnnouncementDetail(@PathVariable Long id) {
        Announcement announcement = announcementService.getAnnouncementDetail(id);
        return Result.success(announcement);
    }

    @PostMapping("/add")
    public Result addAnnouncement(@RequestBody Announcement announcement, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        announcement.setCreatorId(userId);
        try {
            boolean success = announcementService.addAnnouncement(announcement);
            return success ? Result.success() : Result.error("添加失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("/update")
    public Result updateAnnouncement(@RequestBody Announcement announcement) {
        try {
            boolean success = announcementService.updateAnnouncement(announcement);
            return success ? Result.success() : Result.error("修改失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public Result deleteAnnouncement(@PathVariable Long id) {
        boolean success = announcementService.deleteAnnouncement(id);
        return success ? Result.success() : Result.error("删除失败");
    }

    @PutMapping("/publish/{id}")
    public Result publishAnnouncement(@PathVariable Long id) {
        boolean success = announcementService.publishAnnouncement(id);
        return success ? Result.success() : Result.error("发布失败");
    }
}
