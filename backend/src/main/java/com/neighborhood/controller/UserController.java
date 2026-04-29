package com.neighborhood.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.User;
import com.neighborhood.service.UserService;
import com.neighborhood.util.JwtUtil;
import com.neighborhood.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public Result login(@RequestBody Map<String, String> params) {
        String phone = params.get("phone");
        String password = params.get("password");
        String roleStr = params.get("role");
        Integer role = (roleStr != null && !roleStr.isEmpty()) ? Integer.valueOf(roleStr) : null;

        try {
            User user = userService.login(phone, password, role);
            String token = jwtUtil.generateToken(user.getId(), user.getUsername(), user.getRole());
            
            Map<String, Object> data = new HashMap<>();
            data.put("token", token);
            data.put("userInfo", user);
            
            return Result.success(data);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PostMapping("/register")
    public Result register(@RequestBody Map<String, Object> params) {
        try {
            User user = new User();
            user.setUsername((String) params.get("username"));
            user.setPassword((String) params.get("password"));
            user.setPhone((String) params.get("phone"));
            // 处理 role 字段：前端可能传数字或字符串
            Object roleObj = params.get("role");
            if (roleObj != null) {
                if (roleObj instanceof Integer) {
                    user.setRole((Integer) roleObj);
                } else {
                    user.setRole(Integer.valueOf(roleObj.toString()));
                }
            }
            
            User newUser = userService.register(user);
            String token = jwtUtil.generateToken(newUser.getId(), newUser.getUsername(), newUser.getRole());
            
            Map<String, Object> data = new HashMap<>();
            data.put("token", token);
            data.put("userInfo", newUser);
            
            return Result.success(data);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("/info")
    public Result getUserInfo(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        User user = userService.getUserInfo(userId);
        return Result.success(user);
    }

    @PutMapping("/update")
    public Result updateUserInfo(@RequestBody User user, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        user.setId(userId);
        try {
            User updatedUser = userService.updateUserInfo(user);
            return Result.success(updatedUser);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("/password")
    public Result changePassword(@RequestBody Map<String, String> params, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        String oldPassword = params.get("oldPassword");
        String newPassword = params.get("newPassword");

        try {
            boolean success = userService.changePassword(userId, oldPassword, newPassword);
            return success ? Result.success() : Result.error("修改失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("/admin/list")
    public Result getUserList(@RequestParam Map<String, Object> params) {
        Page<User> page = userService.getUserPage(params);
        return Result.success(page);
    }

    @PutMapping("/admin/status/{userId}")
    public Result updateUserStatus(@PathVariable Long userId, @RequestBody Map<String, Integer> body) {
        Integer status = body.get("status");
        try {
            boolean success = userService.updateUserStatus(userId, status);
            return success ? Result.success() : Result.error("操作失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("/admin/reset-password/{userId}")
    public Result resetPassword(@PathVariable Long userId, @RequestBody Map<String, String> body) {
        String newPassword = body.get("newPassword");
        try {
            boolean success = userService.resetPassword(userId, newPassword);
            return success ? Result.success() : Result.error("重置失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}
