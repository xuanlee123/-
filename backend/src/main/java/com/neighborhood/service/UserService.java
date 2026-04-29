package com.neighborhood.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.User;

import java.util.Map;

public interface UserService {
    User login(String phone, String password, Integer role);
    User wxLogin(String openid);
    User register(User user);
    User getUserInfo(Long userId);
    User updateUserInfo(User user);
    boolean changePassword(Long userId, String oldPassword, String newPassword);
    Page<User> getUserPage(Map<String, Object> params);
    boolean updateUserStatus(Long userId, Integer status);
    boolean resetPassword(Long userId, String newPassword);
}
