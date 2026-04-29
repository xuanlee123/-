package com.neighborhood.controller;

import com.neighborhood.service.AdminService;
import com.neighborhood.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/dashboard")
    public Result getDashboardStats() {
        Map<String, Object> stats = adminService.getDashboardStats();
        return Result.success(stats);
    }
}
