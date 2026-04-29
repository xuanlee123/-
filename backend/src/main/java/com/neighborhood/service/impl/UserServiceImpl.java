package com.neighborhood.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.User;
import com.neighborhood.mapper.UserMapper;
import com.neighborhood.service.UserService;
import com.neighborhood.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;
    
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public User login(String phone, String password, Integer role) {
        User user = userMapper.selectByPhone(phone);
        if (user == null) {
            throw new RuntimeException("用户不存在");
        }
        if (user.getStatus() == 0) {
            throw new RuntimeException("账号已被禁用");
        }
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("密码错误");
        }
        if (role != null && !role.equals(user.getRole())) {
            String roleName = "";
            if (role == 1) roleName = "居民";
            else if (role == 2) roleName = "商户";
            else if (role == 3) roleName = "管理员";
            throw new RuntimeException("该账号不是" + roleName + "账号，请选择正确的角色登录");
        }
        return user;
    }

    @Override
    public User wxLogin(String openid) {
        User user = userMapper.selectByOpenid(openid);
        if (user == null) {
            throw new RuntimeException("用户不存在，请先注册");
        }
        if (user.getStatus() == 0) {
            throw new RuntimeException("账号已被禁用");
        }
        return user;
    }

    @Override
    public User register(User user) {
        User existUser = userMapper.selectByPhone(user.getPhone());
        if (existUser != null) {
            throw new RuntimeException("该手机号已注册");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreateTime(LocalDateTime.now());
        user.setUpdateTime(LocalDateTime.now());
        user.setStatus(1);
        if (user.getRole() == null) {
            user.setRole(1); // 默认居民角色
        }
        userMapper.insert(user);
        return user;
    }

    @Override
    public User getUserInfo(Long userId) {
        return userMapper.selectById(userId);
    }

    @Override
    public User updateUserInfo(User user) {
        user.setUpdateTime(LocalDateTime.now());
        userMapper.updateById(user);
        return userMapper.selectById(user.getId());
    }

    @Override
    public boolean changePassword(Long userId, String oldPassword, String newPassword) {
        User user = userMapper.selectById(userId);
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("原密码错误");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setUpdateTime(LocalDateTime.now());
        return userMapper.updateById(user) > 0;
    }

    @Override
    public Page<User> getUserPage(Map<String, Object> params) {
        int pageNum = params.containsKey("pageNum") ? Integer.parseInt(params.get("pageNum").toString()) : 1;
        int pageSize = params.containsKey("pageSize") ? Integer.parseInt(params.get("pageSize").toString()) : 10;
        String keyword = params.containsKey("keyword") ? params.get("keyword").toString() : null;
        String roleStr = params.containsKey("role") ? params.get("role").toString() : null;
        String statusStr = params.containsKey("status") ? params.get("status").toString() : null;

        Page<User> page = new Page<>(pageNum, pageSize);
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.orderByDesc("create_time");

        if (keyword != null && !keyword.isEmpty()) {
            wrapper.and(w -> w.like("username", keyword).or().like("phone", keyword));
        }
        if (roleStr != null && !roleStr.isEmpty()) {
            wrapper.eq("role", Integer.parseInt(roleStr));
        }
        if (statusStr != null && !statusStr.isEmpty()) {
            wrapper.eq("status", Integer.parseInt(statusStr));
        }

        return userMapper.selectPage(page, wrapper);
    }

    @Override
    public boolean updateUserStatus(Long userId, Integer status) {
        User user = new User();
        user.setId(userId);
        user.setStatus(status);
        user.setUpdateTime(LocalDateTime.now());
        return userMapper.updateById(user) > 0;
    }

    @Override
    public boolean resetPassword(Long userId, String newPassword) {
        User user = new User();
        user.setId(userId);
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setUpdateTime(LocalDateTime.now());
        return userMapper.updateById(user) > 0;
    }
}
