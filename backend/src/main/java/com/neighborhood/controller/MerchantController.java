package com.neighborhood.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.Merchant;
import com.neighborhood.service.MerchantService;
import com.neighborhood.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/merchant")
@CrossOrigin
public class MerchantController {

    @Autowired
    private MerchantService merchantService;

    @GetMapping("/info")
    public Result getMerchantInfo(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        Merchant merchant = merchantService.getMerchantByUserId(userId);
        return Result.success(merchant);
    }

    @GetMapping("/stats")
    public Result getMerchantStats(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        Map<String, Object> stats = merchantService.getMerchantStats(userId);
        return Result.success(stats);
    }

    @GetMapping("/week-trend")
    public Result getWeekIncomeTrend(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        Merchant merchant = merchantService.getMerchantByUserId(userId);
        if (merchant == null) {
            return Result.error("商户信息不存在");
        }
        List<Double> trend = merchantService.getWeekIncomeTrend(merchant.getId());
        return Result.success(trend);
    }

    @GetMapping("/service-ranking")
    public Result getServiceRanking(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        Merchant merchant = merchantService.getMerchantByUserId(userId);
        if (merchant == null) {
            return Result.error("商户信息不存在");
        }
        List<Map<String, Object>> ranking = merchantService.getServiceRanking(merchant.getId());
        return Result.success(ranking);
    }

    @GetMapping("/list")
    public Result getMerchantList(@RequestParam Map<String, Object> params) {
        Page<Merchant> page = merchantService.getMerchantPage(params);
        return Result.success(page);
    }

    @PostMapping("/apply")
    public Result submitApplication(@RequestBody Merchant merchant, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        merchant.setUserId(userId);
        try {
            boolean success = merchantService.submitApplication(merchant);
            if (success) {
                return Result.success();
            } else {
                return Result.error("提交失败");
            }
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("/audit/{id}")
    public Result auditMerchant(@PathVariable Long id, @RequestBody Map<String, String> params, HttpServletRequest request) {
        String status = params.get("status");
        String remark = params.get("remark");
        try {
            boolean success = merchantService.auditMerchant(id, status, remark);
            return success ? Result.success() : Result.error("审核失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("/pending")
    public Result getPendingMerchants(@RequestParam Map<String, Object> params) {
        Page<Merchant> page = merchantService.getPendingMerchants(params);
        return Result.success(page);
    }
}
