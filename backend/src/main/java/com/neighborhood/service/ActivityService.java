package com.neighborhood.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.CommunityActivity;
import com.neighborhood.entity.ActivitySignup;
import java.util.Map;

public interface ActivityService {
    Page<CommunityActivity> getActivityPage(Map<String, Object> params);
    CommunityActivity getActivityDetail(Long id);
    boolean addActivity(CommunityActivity activity);
    boolean updateActivity(CommunityActivity activity);
    boolean deleteActivity(Long id);
    boolean signupActivity(ActivitySignup signup);
    boolean cancelSignup(Long activityId, Long userId);
    Page<ActivitySignup> getSignupList(Long activityId);
}
