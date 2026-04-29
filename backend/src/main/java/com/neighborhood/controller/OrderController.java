package com.neighborhood.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.Merchant;
import com.neighborhood.entity.Order;
import com.neighborhood.mapper.MerchantMapper;
import com.neighborhood.service.OrderService;
import com.neighborhood.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/order")
@CrossOrigin
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private MerchantMapper merchantMapper;

    @PostMapping("/create")
    public Result createOrder(@RequestBody Order order, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Result.error("用户未登录或登录已过期");
        }
        order.setUserId(userId);
        try {
            Order newOrder = orderService.createOrder(order);
            return Result.success(newOrder);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("/user/list")
    public Result getUserOrders(
            @RequestParam(required = false) Integer status,
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize,
            HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        Page<Order> page = orderService.getUserOrders(userId, status, pageNum, pageSize);
        return Result.success(page);
    }

    @GetMapping("/merchant/list")
    public Result getMerchantOrders(
            @RequestParam(required = false) Integer status,
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize,
            HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Result.error("用户未登录");
        }
        Merchant merchant = merchantMapper.selectOne(new QueryWrapper<Merchant>().eq("user_id", userId));
        if (merchant == null) {
            return Result.success(new Page<>());
        }
        Page<Order> page = orderService.getMerchantOrders(merchant.getId(), status, pageNum, pageSize);
        return Result.success(page);
    }

    @GetMapping("/merchant/counts")
    public Result getMerchantOrderCounts(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Result.error("用户未登录");
        }
        Merchant merchant = merchantMapper.selectOne(new QueryWrapper<Merchant>().eq("user_id", userId));
        if (merchant == null) {
            Map<String, Object> emptyCounts = new HashMap<>();
            emptyCounts.put("all", 0);
            emptyCounts.put("pending", 0);
            emptyCounts.put("processing", 0);
            emptyCounts.put("completed", 0);
            return Result.success(emptyCounts);
        }
        Map<String, Object> counts = orderService.getMerchantOrderCounts(merchant.getId());
        return Result.success(counts);
    }

    @GetMapping("/detail/{id}")
    public Result getOrderDetail(@PathVariable Long id) {
        Order order = orderService.getOrderDetail(id);
        return Result.success(order);
    }

    @PutMapping("/cancel/{id}")
    public Result cancelOrder(@PathVariable Long id, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        try {
            boolean success = orderService.cancelOrder(id, userId);
            return success ? Result.success() : Result.error("取消失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("/pay/{id}")
    public Result payOrder(@PathVariable Long id, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        try {
            boolean success = orderService.payOrder(id, userId);
            return success ? Result.success() : Result.error("支付失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("/accept/{id}")
    public Result acceptOrder(@PathVariable Long id, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Result.error("用户未登录");
        }
        Merchant merchant = merchantMapper.selectOne(new QueryWrapper<Merchant>().eq("user_id", userId));
        if (merchant == null) {
            return Result.error("您不是商户，无权操作");
        }
        try {
            boolean success = orderService.acceptOrder(id, merchant.getId());
            return success ? Result.success() : Result.error("接单失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("/complete/{id}")
    public Result completeOrder(@PathVariable Long id, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Result.error("用户未登录");
        }
        Merchant merchant = merchantMapper.selectOne(new QueryWrapper<Merchant>().eq("user_id", userId));
        if (merchant == null) {
            return Result.error("您不是商户，无权操作");
        }
        try {
            boolean success = orderService.completeOrder(id, merchant.getId());
            return success ? Result.success() : Result.error("完成失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("/refund/{id}")
    public Result applyRefund(@PathVariable Long id, @RequestBody Map<String, String> params, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        String reason = params.get("reason");
        try {
            boolean success = orderService.applyRefund(id, userId, reason);
            return success ? Result.success() : Result.error("申请失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("/reject/{id}")
    public Result merchantRejectOrder(@PathVariable Long id, @RequestBody Map<String, String> params, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Result.error("用户未登录");
        }
        Merchant merchant = merchantMapper.selectOne(new QueryWrapper<Merchant>().eq("user_id", userId));
        if (merchant == null) {
            return Result.error("您不是商户，无权操作");
        }
        String reason = params.get("reason");
        try {
            boolean success = orderService.merchantRejectOrder(id, merchant.getId(), reason);
            return success ? Result.success() : Result.error("拒单失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("/statistics")
    public Result getStatistics(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Result.error("用户未登录");
        }
        Merchant merchant = merchantMapper.selectOne(new QueryWrapper<Merchant>().eq("user_id", userId));
        if (merchant == null) {
            Map<String, Object> emptyStats = new HashMap<>();
            emptyStats.put("totalCount", 0);
            emptyStats.put("completedCount", 0);
            emptyStats.put("pendingCount", 0);
            return Result.success(emptyStats);
        }
        Map<String, Object> statistics = orderService.getOrderStatistics(merchant.getId());
        return Result.success(statistics);
    }

    @GetMapping("/admin/list")
    public Result getAdminOrders(
            @RequestParam(required = false) Integer status,
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize) {
        Page<Order> page = orderService.getAdminOrders(status, pageNum, pageSize);
        return Result.success(page);
    }

    @GetMapping("/admin/counts")
    public Result getAdminOrderCounts() {
        Map<String, Object> counts = orderService.getAdminOrderCounts();
        return Result.success(counts);
    }

    @PutMapping("/admin/confirm/{id}")
    public Result confirmAdminPayment(@PathVariable Long id) {
        try {
            boolean success = orderService.confirmAdminPayment(id);
            return success ? Result.success() : Result.error("确认失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}
