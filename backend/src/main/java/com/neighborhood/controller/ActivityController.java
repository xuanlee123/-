package com.neighborhood.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.CommunityActivity;
import com.neighborhood.entity.ActivitySignup;
import com.neighborhood.service.ActivityService;
import com.neighborhood.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/activity")
@CrossOrigin
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @GetMapping("/list")
    public Result getActivityList(@RequestParam Map<String, Object> params) {
        Page<CommunityActivity> page = activityService.getActivityPage(params);
        return Result.success(page);
    }

    @GetMapping("/detail/{id}")
    public Result getActivityDetail(@PathVariable Long id) {
        CommunityActivity activity = activityService.getActivityDetail(id);
        return Result.success(activity);
    }

    @PostMapping("/add")
    public Result addActivity(@RequestBody CommunityActivity activity, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        activity.setCreatorId(userId);
        try {
            boolean success = activityService.addActivity(activity);
            return success ? Result.success() : Result.error("添加失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("/update")
    public Result updateActivity(@RequestBody CommunityActivity activity) {
        try {
            boolean success = activityService.updateActivity(activity);
            return success ? Result.success() : Result.error("修改失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public Result deleteActivity(@PathVariable Long id) {
        boolean success = activityService.deleteActivity(id);
        return success ? Result.success() : Result.error("删除失败");
    }

    @PostMapping("/signup")
    public Result signupActivity(@RequestBody ActivitySignup signup, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        signup.setUserId(userId);
        try {
            boolean success = activityService.signupActivity(signup);
            return success ? Result.success() : Result.error("报名失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @DeleteMapping("/cancel/{activityId}")
    public Result cancelSignup(@PathVariable Long activityId, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        try {
            boolean success = activityService.cancelSignup(activityId, userId);
            return success ? Result.success() : Result.error("取消失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("/signup/list/{activityId}")
    public Result getSignupList(@PathVariable Long activityId) {
        Page<ActivitySignup> page = activityService.getSignupList(activityId);
        return Result.success(page);
    }
}
