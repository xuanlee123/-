package com.neighborhood.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.CommunityActivity;
import com.neighborhood.entity.ActivitySignup;
import com.neighborhood.mapper.CommunityActivityMapper;
import com.neighborhood.mapper.ActivitySignupMapper;
import com.neighborhood.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
public class ActivityServiceImpl implements ActivityService {

    @Autowired
    private CommunityActivityMapper activityMapper;
    
    @Autowired
    private ActivitySignupMapper signupMapper;

    @Override
    public Page<CommunityActivity> getActivityPage(Map<String, Object> params) {
        Integer pageNum = params.get("pageNum") != null ? Integer.parseInt(params.get("pageNum").toString()) : 1;
        Integer pageSize = params.get("pageSize") != null ? Integer.parseInt(params.get("pageSize").toString()) : 10;
        
        Page<CommunityActivity> page = new Page<>(pageNum, pageSize);
        QueryWrapper<CommunityActivity> wrapper = new QueryWrapper<>();

        if (params.get("all") == null) {
            wrapper.eq("status", 1);
        }
        
        if (params.get("status") != null) {
            wrapper.eq("status", params.get("status"));
        }
        
        wrapper.orderByDesc("start_time");
        return activityMapper.selectPage(page, wrapper);
    }

    @Override
    public CommunityActivity getActivityDetail(Long id) {
        return activityMapper.selectById(id);
    }

    @Override
    public boolean addActivity(CommunityActivity activity) {
        activity.setCreateTime(LocalDateTime.now());
        activity.setUpdateTime(LocalDateTime.now());
        activity.setStatus(1);
        activity.setCurrentParticipants(0);
        if (activity.getCreatorId() == null) {
            activity.setCreatorId(1L);
        }
        if (activity.getLocation() == null || activity.getLocation().isEmpty()) {
            activity.setLocation(activity.getAddress() != null ? activity.getAddress() : "待定");
        }
        if (activity.getMaxPeople() == null) {
            activity.setMaxPeople(0);
        }
        if (activity.getMaxParticipants() != null && activity.getMaxPeople() == 0) {
            activity.setMaxPeople(activity.getMaxParticipants());
        }
        return activityMapper.insert(activity) > 0;
    }

    @Override
    public boolean updateActivity(CommunityActivity activity) {
        activity.setUpdateTime(LocalDateTime.now());
        return activityMapper.updateById(activity) > 0;
    }

    @Override
    public boolean deleteActivity(Long id) {
        return activityMapper.deleteById(id) > 0;
    }

    @Override
    public boolean signupActivity(ActivitySignup signup) {
        signup.setStatus(1);
        signup.setSignUpTime(LocalDateTime.now());
        signup.setCreateTime(LocalDateTime.now());
        signup.setUpdateTime(LocalDateTime.now());
        
        CommunityActivity activity = activityMapper.selectById(signup.getActivityId());
        if (activity != null) {
            activity.setCurrentParticipants(activity.getCurrentParticipants() + 1);
            activityMapper.updateById(activity);
        }
        
        return signupMapper.insert(signup) > 0;
    }

    @Override
    public boolean cancelSignup(Long activityId, Long userId) {
        QueryWrapper<ActivitySignup> wrapper = new QueryWrapper<>();
        wrapper.eq("activity_id", activityId).eq("user_id", userId).eq("status", 1);
        ActivitySignup signup = signupMapper.selectOne(wrapper);
        
        if (signup != null) {
            signup.setStatus(0);
            signupMapper.updateById(signup);
            
            CommunityActivity activity = activityMapper.selectById(activityId);
            if (activity != null && activity.getCurrentParticipants() > 0) {
                activity.setCurrentParticipants(activity.getCurrentParticipants() - 1);
                activityMapper.updateById(activity);
            }
            return true;
        }
        return false;
    }

    @Override
    public Page<ActivitySignup> getSignupList(Long activityId) {
        Page<ActivitySignup> page = new Page<>(1, 100);
        QueryWrapper<ActivitySignup> wrapper = new QueryWrapper<>();
        wrapper.eq("activity_id", activityId).eq("status", 1);
        return signupMapper.selectPage(page, wrapper);
    }
}
