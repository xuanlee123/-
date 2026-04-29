package com.neighborhood.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.neighborhood.entity.Merchant;
import com.neighborhood.entity.Order;
import com.neighborhood.entity.User;
import com.neighborhood.mapper.MerchantMapper;
import com.neighborhood.mapper.OrderMapper;
import com.neighborhood.mapper.UserMapper;
import com.neighborhood.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private MerchantMapper merchantMapper;

    @Override
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.plusDays(1).atStartOfDay();

        // Total users
        Long totalUsers = userMapper.selectCount(null);
        stats.put("users", totalUsers);

        // Today's orders
        QueryWrapper<Order> todayOrdersWrapper = new QueryWrapper<>();
        todayOrdersWrapper.ge("create_time", startOfDay).lt("create_time", endOfDay);
        Long todayOrders = orderMapper.selectCount(todayOrdersWrapper);
        stats.put("todayOrders", todayOrders);

        // Pending merchants
        QueryWrapper<Merchant> pendingWrapper = new QueryWrapper<>();
        pendingWrapper.eq("status", 0);
        Long pendingMerchants = merchantMapper.selectCount(pendingWrapper);
        stats.put("pendingMerchants", pendingMerchants);
        stats.put("pendingAudit", pendingMerchants);

        // Total merchants
        Long totalMerchants = merchantMapper.selectCount(null);
        stats.put("merchants", totalMerchants);

        // Complaints (orders with complaint status - using status 5 as complaint)
        QueryWrapper<Order> complaintWrapper = new QueryWrapper<>();
        complaintWrapper.eq("status", 5);
        Long complaints = orderMapper.selectCount(complaintWrapper);
        stats.put("complaints", complaints);

        // Today's income
        QueryWrapper<Order> incomeWrapper = new QueryWrapper<>();
        incomeWrapper.ge("create_time", startOfDay)
                     .lt("create_time", endOfDay)
                     .eq("status", 4); // Completed orders
        Double todayIncome = 0.0;
        List<Order> incomeList = orderMapper.selectList(incomeWrapper);
        if (incomeList != null) {
            for (Order order : incomeList) {
                if (order.getPrice() != null) {
                    todayIncome += order.getPrice().doubleValue();
                }
            }
        }
        stats.put("todayIncome", String.format("%.2f", todayIncome / 100.0));

        // Other stats for dashboard
        stats.put("pendingOrders", 0L);
        stats.put("processingOrders", 0L);
        stats.put("completedOrders", 0L);
        stats.put("posts", 0L);
        stats.put("comments", 0L);
        stats.put("reports", 0L);
        stats.put("activities", 0L);
        stats.put("services", 0L);
        stats.put("coupons", 0L);
        stats.put("announcements", 0L);
        stats.put("monthIncome", "0.00");

        return stats;
    }
}
