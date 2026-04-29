package com.neighborhood.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.Evaluation;
import com.neighborhood.entity.Merchant;
import com.neighborhood.entity.Order;
import com.neighborhood.entity.ServiceInfo;
import com.neighborhood.mapper.EvaluationMapper;
import com.neighborhood.mapper.MerchantMapper;
import com.neighborhood.mapper.OrderMapper;
import com.neighborhood.mapper.ServiceMapper;
import com.neighborhood.service.MerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MerchantServiceImpl implements MerchantService {

    @Autowired
    private MerchantMapper merchantMapper;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private ServiceMapper serviceMapper;

    @Autowired
    private EvaluationMapper evaluationMapper;

    @Override
    public Merchant getMerchantByUserId(Long userId) {
        QueryWrapper<Merchant> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", userId);
        return merchantMapper.selectOne(wrapper);
    }

    @Override
    public Map<String, Object> getMerchantStats(Long userId) {
        Map<String, Object> stats = new HashMap<>();

        Merchant merchant = getMerchantByUserId(userId);
        if (merchant == null) {
            stats.put("todayOrders", 0);
            stats.put("monthOrders", 0);
            stats.put("totalOrders", 0);
            stats.put("todayIncome", 0);
            stats.put("services", 0);
            stats.put("coupons", 0);
            stats.put("pendingOrders", 0);
            stats.put("totalEvaluations", 0);
            stats.put("pendingEvaluations", 0);
            stats.put("averageScore", 0);
            stats.put("totalBalance", 0);
            stats.put("availableBalance", 0);
            stats.put("frozenBalance", 0);
            return stats;
        }

        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.plusDays(1).atStartOfDay();

        LocalDate firstDayOfMonth = today.withDayOfMonth(1);
        LocalDateTime startOfMonth = firstDayOfMonth.atStartOfDay();

        // Today's orders
        QueryWrapper<Order> todayWrapper = new QueryWrapper<>();
        todayWrapper.eq("merchant_id", merchant.getId())
                    .ge("create_time", startOfDay)
                    .lt("create_time", endOfDay);
        Long todayOrders = orderMapper.selectCount(todayWrapper);

        // Month orders (completed = status 3)
        QueryWrapper<Order> monthWrapper = new QueryWrapper<>();
        monthWrapper.eq("merchant_id", merchant.getId())
                    .ge("create_time", startOfMonth)
                    .eq("status", 3);
        Long monthOrders = orderMapper.selectCount(monthWrapper);

        // Total orders
        QueryWrapper<Order> totalWrapper = new QueryWrapper<>();
        totalWrapper.eq("merchant_id", merchant.getId());
        Long totalOrders = orderMapper.selectCount(totalWrapper);

        // Today's income (status 3 = completed)
        QueryWrapper<Order> incomeWrapper = new QueryWrapper<>();
        incomeWrapper.eq("merchant_id", merchant.getId())
                     .ge("create_time", startOfDay)
                     .lt("create_time", endOfDay)
                     .eq("status", 3);
        Double todayIncomeAmount = 0.0;
        List<Order> incomeList = orderMapper.selectList(incomeWrapper);
        if (incomeList != null) {
            for (Order order : incomeList) {
                if (order.getPrice() != null) {
                    todayIncomeAmount += order.getPrice().doubleValue();
                }
            }
        }

        // Service count
        QueryWrapper<ServiceInfo> serviceWrapper = new QueryWrapper<>();
        serviceWrapper.eq("merchant_id", merchant.getId()).eq("deleted", 0);
        Long serviceCount = serviceMapper.selectCount(serviceWrapper);

        // Pending orders count (status = 1, paid but not accepted)
        QueryWrapper<Order> pendingWrapper = new QueryWrapper<>();
        pendingWrapper.eq("merchant_id", merchant.getId()).eq("status", 1);
        Long pendingOrders = orderMapper.selectCount(pendingWrapper);

        // Evaluation stats
        QueryWrapper<Evaluation> evalAllWrapper = new QueryWrapper<>();
        evalAllWrapper.eq("merchant_id", merchant.getId()).eq("status", 1);
        Long totalEvaluations = evaluationMapper.selectCount(evalAllWrapper);

        QueryWrapper<Evaluation> evalPendingWrapper = new QueryWrapper<>();
        evalPendingWrapper.eq("merchant_id", merchant.getId()).eq("status", 0);
        Long pendingEvaluations = evaluationMapper.selectCount(evalPendingWrapper);

        // Calculate average score from recent evaluations
        double avgScore = 0.0;
        List<Evaluation> recentEvals = evaluationMapper.selectList(
            new QueryWrapper<Evaluation>().eq("merchant_id", merchant.getId()).eq("status", 1).last("LIMIT 100")
        );
        if (recentEvals != null && !recentEvals.isEmpty()) {
            int totalScore = recentEvals.stream().mapToInt(Evaluation::getScore).sum();
            avgScore = (double) totalScore / recentEvals.size();
        }

        // Balance (simplified - can be enhanced with actual wallet table)
        double totalBalance = todayIncomeAmount / 100.0;

        stats.put("todayOrders", todayOrders);
        stats.put("monthOrders", monthOrders);
        stats.put("totalOrders", totalOrders);
        stats.put("todayIncome", todayIncomeAmount / 100.0);
        stats.put("services", serviceCount);
        stats.put("coupons", 0);
        stats.put("pendingOrders", pendingOrders);
        stats.put("totalEvaluations", totalEvaluations);
        stats.put("pendingEvaluations", pendingEvaluations);
        stats.put("averageScore", avgScore);
        stats.put("totalBalance", totalBalance);
        stats.put("availableBalance", totalBalance);
        stats.put("frozenBalance", 0);

        return stats;
    }

    @Override
    public List<Double> getWeekIncomeTrend(Long merchantId) {
        List<Double> weekIncome = new java.util.ArrayList<>();
        LocalDate today = LocalDate.now();

        for (int i = 6; i >= 0; i--) {
            LocalDate date = today.minusDays(i);
            LocalDateTime startOfDay = date.atStartOfDay();
            LocalDateTime endOfDay = date.plusDays(1).atStartOfDay();

            QueryWrapper<Order> wrapper = new QueryWrapper<>();
            wrapper.eq("merchant_id", merchantId)
                   .ge("create_time", startOfDay)
                   .lt("create_time", endOfDay)
                   .eq("status", 3);

            List<Order> orders = orderMapper.selectList(wrapper);
            double dayIncome = 0.0;
            if (orders != null) {
                for (Order order : orders) {
                    if (order.getPrice() != null) {
                        dayIncome += order.getPrice().doubleValue();
                    }
                }
            }
            weekIncome.add(dayIncome / 100.0);
        }

        return weekIncome;
    }

    @Override
    public List<Map<String, Object>> getServiceRanking(Long merchantId) {
        List<Map<String, Object>> ranking = new java.util.ArrayList<>();

        QueryWrapper<ServiceInfo> serviceWrapper = new QueryWrapper<>();
        serviceWrapper.eq("merchant_id", merchantId).eq("deleted", 0);
        List<ServiceInfo> services = serviceMapper.selectList(serviceWrapper);

        if (services == null || services.isEmpty()) {
            return ranking;
        }

        // Count orders for each service
        int totalOrders = 0;
        for (ServiceInfo service : services) {
            QueryWrapper<Order> orderWrapper = new QueryWrapper<>();
            orderWrapper.eq("service_id", service.getId()).eq("status", 3);
            Long count = orderMapper.selectCount(orderWrapper);
            totalOrders += count.intValue();
        }

        // Build ranking
        int rank = 1;
        for (ServiceInfo service : services) {
            QueryWrapper<Order> orderWrapper = new QueryWrapper<>();
            orderWrapper.eq("service_id", service.getId()).eq("status", 3);
            Long count = orderMapper.selectCount(orderWrapper);

            if (count > 0) {
                Map<String, Object> item = new HashMap<>();
                item.put("id", service.getId());
                item.put("serviceName", service.getName());
                item.put("salesCount", count);
                item.put("rank", rank);
                item.put("percent", totalOrders > 0 ? (count * 100 / totalOrders) : 0);
                ranking.add(item);
                rank++;
            }
        }

        // Sort by sales count descending
        ranking.sort((a, b) -> Long.compare((Long) b.get("salesCount"), (Long) a.get("salesCount")));

        // Update ranks after sorting
        for (int i = 0; i < ranking.size(); i++) {
            ranking.get(i).put("rank", i + 1);
        }

        return ranking;
    }

    @Override
    public Page<Merchant> getMerchantPage(Map<String, Object> params) {
        Integer pageNum = params.get("pageNum") != null ? Integer.parseInt(params.get("pageNum").toString()) : 1;
        Integer pageSize = params.get("pageSize") != null ? Integer.parseInt(params.get("pageSize").toString()) : 10;
        
        Page<Merchant> page = new Page<>(pageNum, pageSize);
        QueryWrapper<Merchant> wrapper = new QueryWrapper<>();
        
        if (params.get("status") != null) {
            wrapper.eq("status", params.get("status"));
        }
        
        wrapper.orderByDesc("create_time");
        return merchantMapper.selectPage(page, wrapper);
    }

    @Override
    public boolean submitApplication(Merchant merchant) {
        // Check if user already has a pending or approved application
        QueryWrapper<Merchant> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", merchant.getUserId());
        Merchant existing = merchantMapper.selectOne(wrapper);
        
        if (existing != null) {
            if (existing.getStatus() == 0) {
                throw new RuntimeException("您已有待审核的申请，请勿重复提交");
            } else if (existing.getStatus() == 1) {
                throw new RuntimeException("您已是认证商户，无需重复申请");
            }
            // Update existing rejected application
            merchant.setId(existing.getId());
            merchant.setStatus(0);
            merchant.setCreateTime(LocalDateTime.now());
            merchant.setUpdateTime(LocalDateTime.now());
            return merchantMapper.updateById(merchant) > 0;
        }
        
        merchant.setStatus(0); // Pending review
        merchant.setCreateTime(LocalDateTime.now());
        merchant.setUpdateTime(LocalDateTime.now());
        return merchantMapper.insert(merchant) > 0;
    }

    @Override
    public boolean auditMerchant(Long id, String status, String remark) {
        Merchant merchant = merchantMapper.selectById(id);
        if (merchant == null) {
            throw new RuntimeException("商户申请不存在");
        }
        
        if ("pass".equals(status)) {
            merchant.setStatus(1); // Approved
        } else if ("reject".equals(status)) {
            merchant.setStatus(2); // Rejected
        } else {
            throw new RuntimeException("无效的审核状态");
        }
        
        merchant.setAuditTime(LocalDateTime.now());
        merchant.setAuditRemark(remark);
        merchant.setUpdateTime(LocalDateTime.now());
        
        return merchantMapper.updateById(merchant) > 0;
    }

    @Override
    public Page<Merchant> getPendingMerchants(Map<String, Object> params) {
        Integer pageNum = params.get("pageNum") != null ? Integer.parseInt(params.get("pageNum").toString()) : 1;
        Integer pageSize = params.get("pageSize") != null ? Integer.parseInt(params.get("pageSize").toString()) : 10;
        
        Page<Merchant> page = new Page<>(pageNum, pageSize);
        QueryWrapper<Merchant> wrapper = new QueryWrapper<>();
        wrapper.eq("status", 0); // Only pending applications
        wrapper.orderByDesc("create_time");
        return merchantMapper.selectPage(page, wrapper);
    }
}
