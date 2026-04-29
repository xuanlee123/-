package com.neighborhood.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.Order;
import java.util.Map;

public interface OrderService {
    Order createOrder(Order order);
    Page<Order> getUserOrders(Long userId, Integer status, Integer pageNum, Integer pageSize);
    Page<Order> getMerchantOrders(Long merchantId, Integer status, Integer pageNum, Integer pageSize);
    Order getOrderDetail(Long id);
    boolean cancelOrder(Long id, Long userId);
    boolean payOrder(Long id, Long userId);
    boolean acceptOrder(Long id, Long merchantId);
    boolean completeOrder(Long id, Long merchantId);
    boolean applyRefund(Long id, Long userId, String reason);
    boolean merchantRejectRefund(Long id, Long merchantId, String reason);
    boolean merchantRejectOrder(Long id, Long merchantId, String reason);
    Map<String, Object> getMerchantOrderCounts(Long merchantId);
    Map<String, Object> getOrderStatistics(Long merchantId);
    Page<Order> getAdminOrders(Integer status, Integer pageNum, Integer pageSize);
    Map<String, Object> getAdminOrderCounts();
    boolean confirmAdminPayment(Long id);
}
