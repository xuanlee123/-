package com.neighborhood.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.Order;
import com.neighborhood.mapper.OrderMapper;
import com.neighborhood.service.OrderService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderMapper orderMapper;

    @Override
    @Transactional
    public Order createOrder(Order order) {
        String orderNo = "ORD" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        order.setOrderNo(orderNo);
        order.setStatus(0);
        order.setCreateTime(LocalDateTime.now());
        order.setUpdateTime(LocalDateTime.now());
        orderMapper.insert(order);
        return order;
    }

    @Override
    public Page<Order> getUserOrders(Long userId, Integer status, Integer pageNum, Integer pageSize) {
        Page<Order> page = new Page<>(pageNum, pageSize);
        QueryWrapper<Order> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", userId);
        if (status != null) {
            wrapper.eq("status", status);
        }
        wrapper.orderByDesc("create_time");
        Page<Order> result = orderMapper.selectPage(page, wrapper);
        return result;
    }

    @Override
    public Page<Order> getMerchantOrders(Long merchantId, Integer status, Integer pageNum, Integer pageSize) {
        Page<Order> page = new Page<>(pageNum, pageSize);
        return orderMapper.selectMerchantOrders(merchantId, status, page);
    }

    @Override
    public Order getOrderDetail(Long id) {
        return orderMapper.selectById(id);
    }

    @Override
    @Transactional
    public boolean cancelOrder(Long id, Long userId) {
        Order order = orderMapper.selectById(id);
        if (order == null || !order.getUserId().equals(userId)) {
            throw new RuntimeException("订单不存在或无权操作");
        }
        if (order.getStatus() != 0) {
            throw new RuntimeException("只有待付款的订单可以取消");
        }
        order.setStatus(4);
        order.setCancelTime(LocalDateTime.now());
        order.setUpdateTime(LocalDateTime.now());
        return orderMapper.updateById(order) > 0;
    }

    @Override
    @Transactional
    public boolean payOrder(Long id, Long userId) {
        Order order = orderMapper.selectById(id);
        if (order == null || !order.getUserId().equals(userId)) {
            throw new RuntimeException("订单不存在或无权操作");
        }
        if (order.getStatus() != 0) {
            throw new RuntimeException("只有待付款的订单可以支付");
        }
        order.setStatus(1);
        order.setPaymentTime(LocalDateTime.now());
        order.setUpdateTime(LocalDateTime.now());
        return orderMapper.updateById(order) > 0;
    }

    @Override
    @Transactional
    public boolean acceptOrder(Long id, Long merchantId) {
        Order order = orderMapper.selectById(id);
        if (order == null) {
            throw new RuntimeException("订单不存在, ID: " + id);
        }
        if (!order.getMerchantId().equals(merchantId)) {
            throw new RuntimeException("无权操作此订单, 订单商户ID: " + order.getMerchantId() + ", 当前商户ID: " + merchantId);
        }
        if (order.getStatus() != 1) {
            throw new RuntimeException("当前状态不允许接单, 订单状态: " + order.getStatus());
        }
        order.setStatus(2);
        order.setAcceptTime(LocalDateTime.now());
        order.setUpdateTime(LocalDateTime.now());
        return orderMapper.updateById(order) > 0;
    }

    @Override
    @Transactional
    public boolean completeOrder(Long id, Long merchantId) {
        Order order = orderMapper.selectById(id);
        if (order == null || !order.getMerchantId().equals(merchantId)) {
            throw new RuntimeException("订单不存在或无权操作");
        }
        if (order.getStatus() != 2) {
            throw new RuntimeException("只有服务中的订单可以完成");
        }
        order.setStatus(3);
        order.setCompleteTime(LocalDateTime.now());
        order.setUpdateTime(LocalDateTime.now());
        return orderMapper.updateById(order) > 0;
    }

    @Override
    @Transactional
    public boolean applyRefund(Long id, Long userId, String reason) {
        Order order = orderMapper.selectById(id);
        if (order == null || !order.getUserId().equals(userId)) {
            throw new RuntimeException("订单不存在或无权操作");
        }
        if (order.getStatus() != 1 && order.getStatus() != 2) {
            throw new RuntimeException("当前状态不允许申请退款");
        }
        order.setStatus(5);
        order.setRefundReason(reason);
        order.setUpdateTime(LocalDateTime.now());
        return orderMapper.updateById(order) > 0;
    }

    @Override
    @Transactional
    public boolean merchantRejectRefund(Long id, Long merchantId, String reason) {
        Order order = orderMapper.selectById(id);
        if (order == null || !order.getMerchantId().equals(merchantId)) {
            throw new RuntimeException("订单不存在或无权操作");
        }
        if (order.getStatus() != 5) {
            throw new RuntimeException("只有退款中的订单可以拒绝");
        }
        order.setStatus(order.getStatus() == 5 ? 1 : order.getStatus());
        order.setMerchantRefuseReason(reason);
        order.setRefuseTime(LocalDateTime.now());
        order.setUpdateTime(LocalDateTime.now());
        return orderMapper.updateById(order) > 0;
    }

    @Override
    @Transactional
    public boolean merchantRejectOrder(Long id, Long merchantId, String reason) {
        Order order = orderMapper.selectById(id);
        if (order == null || !order.getMerchantId().equals(merchantId)) {
            throw new RuntimeException("订单不存在或无权操作");
        }
        if (order.getStatus() != 0) {
            throw new RuntimeException("当前状态不允许拒单");
        }
        order.setStatus(4);
        order.setMerchantRefuseReason(reason);
        order.setCancelTime(LocalDateTime.now());
        order.setUpdateTime(LocalDateTime.now());
        return orderMapper.updateById(order) > 0;
    }

    @Override
    public Map<String, Object> getMerchantOrderCounts(Long merchantId) {
        Map<String, Object> counts = new HashMap<>();

        QueryWrapper<Order> wrapper = new QueryWrapper<>();
        wrapper.eq("merchant_id", merchantId);
        counts.put("all", orderMapper.selectCount(wrapper));

        QueryWrapper<Order> pendingWrapper = new QueryWrapper<>();
        pendingWrapper.eq("merchant_id", merchantId).eq("status", 1);
        counts.put("pending", orderMapper.selectCount(pendingWrapper));

        QueryWrapper<Order> processingWrapper = new QueryWrapper<>();
        processingWrapper.eq("merchant_id", merchantId).eq("status", 2);
        counts.put("processing", orderMapper.selectCount(processingWrapper));

        QueryWrapper<Order> completedWrapper = new QueryWrapper<>();
        completedWrapper.eq("merchant_id", merchantId).eq("status", 3);
        counts.put("completed", orderMapper.selectCount(completedWrapper));

        return counts;
    }

    @Override
    public Map<String, Object> getOrderStatistics(Long merchantId) {
        Map<String, Object> result = new HashMap<>();
        QueryWrapper<Order> wrapper = new QueryWrapper<>();
        wrapper.eq("merchant_id", merchantId);
        
        Long totalCount = orderMapper.selectCount(wrapper);
        wrapper.eq("status", 3);
        Long completedCount = orderMapper.selectCount(wrapper);
        
        wrapper.eq("status", 1).or().eq("status", 2);
        Long pendingCount = orderMapper.selectCount(wrapper);
        
        result.put("totalCount", totalCount);
        result.put("completedCount", completedCount);
        result.put("pendingCount", pendingCount);
        return result;
    }

    @Override
    public Page<Order> getAdminOrders(Integer status, Integer pageNum, Integer pageSize) {
        Page<Order> page = new Page<>(pageNum, pageSize);
        return orderMapper.selectAdminOrders(status, page);
    }

    @Override
    public Map<String, Object> getAdminOrderCounts() {
        Map<String, Object> counts = new HashMap<>();

        counts.put("all", orderMapper.selectCount(new QueryWrapper<>()));

        QueryWrapper<Order> pendingWrapper = new QueryWrapper<>();
        pendingWrapper.eq("status", 0);
        counts.put("pending", orderMapper.selectCount(pendingWrapper));

        QueryWrapper<Order> paidWrapper = new QueryWrapper<>();
        paidWrapper.eq("status", 1);
        counts.put("paid", orderMapper.selectCount(paidWrapper));

        QueryWrapper<Order> processingWrapper = new QueryWrapper<>();
        processingWrapper.eq("status", 2);
        counts.put("processing", orderMapper.selectCount(processingWrapper));

        QueryWrapper<Order> completedWrapper = new QueryWrapper<>();
        completedWrapper.eq("status", 3);
        counts.put("completed", orderMapper.selectCount(completedWrapper));

        return counts;
    }

    @Override
    @Transactional
    public boolean confirmAdminPayment(Long id) {
        Order order = orderMapper.selectById(id);
        if (order == null) {
            throw new RuntimeException("订单不存在");
        }
        if (order.getStatus() != 0) {
            throw new RuntimeException("只有待付款的订单可以确认");
        }
        order.setStatus(1);
        order.setPaymentTime(LocalDateTime.now());
        order.setUpdateTime(LocalDateTime.now());
        return orderMapper.updateById(order) > 0;
    }
}
