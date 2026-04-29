package com.neighborhood.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.Evaluation;
import com.neighborhood.entity.Merchant;
import com.neighborhood.service.EvaluationService;
import com.neighborhood.service.MerchantService;
import com.neighborhood.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/evaluation")
@CrossOrigin
public class EvaluationController {

    @Autowired
    private EvaluationService evaluationService;

    @Autowired
    private MerchantService merchantService;

    @GetMapping("/merchant/list")
    public Result getMerchantEvaluations(
            @RequestParam(required = false) Integer status,
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize,
            HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        Merchant merchant = merchantService.getMerchantByUserId(userId);
        if (merchant == null) {
            return Result.error("商户信息不存在");
        }
        Page<Evaluation> page = evaluationService.getMerchantEvaluations(merchant.getId(), status, pageNum, pageSize);
        return Result.success(page);
    }

    @GetMapping("/merchant/stats")
    public Result getMerchantEvaluationStats(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        Merchant merchant = merchantService.getMerchantByUserId(userId);
        if (merchant == null) {
            return Result.error("商户信息不存在");
        }
        Map<String, Object> stats = evaluationService.getMerchantEvaluationStats(merchant.getId());
        return Result.success(stats);
    }

    @PostMapping("/reply")
    public Result replyEvaluation(@RequestBody Map<String, String> params, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        Merchant merchant = merchantService.getMerchantByUserId(userId);
        if (merchant == null) {
            return Result.error("商户信息不存在");
        }
        Long evaluationId = Long.parseLong(params.get("id"));
        String reply = params.get("reply");
        try {
            boolean success = evaluationService.replyEvaluation(evaluationId, merchant.getId(), reply);
            return success ? Result.success() : Result.error("回复失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PostMapping("/add")
    public Result addEvaluation(@RequestBody Evaluation evaluation, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        evaluation.setUserId(userId);
        try {
            if (evaluation.getMerchantId() == null) {
                return Result.error("商户信息不存在");
            }
            if (evaluationService.getEvaluationByOrderId(evaluation.getOrderId()) != null) {
                return Result.error("该订单已评价");
            }
            boolean success = evaluationService.addEvaluation(evaluation);
            return success ? Result.success() : Result.error("评价失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    // 管理员评价审核接口
    @GetMapping("/admin/list")
    public Result getAdminEvaluations(
            @RequestParam(required = false) Integer status,
            @RequestParam(required = false) Integer negative,
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize) {
        Page<Evaluation> page = evaluationService.getAdminEvaluations(status, negative, pageNum, pageSize);
        return Result.success(page);
    }

    @GetMapping("/admin/stats")
    public Result getAdminEvaluationStats() {
        Map<String, Object> stats = evaluationService.getAdminEvaluationStats();
        return Result.success(stats);
    }

    @PutMapping("/admin/audit/{id}")
    public Result auditEvaluation(
            @PathVariable Long id,
            @RequestBody Map<String, String> params,
            HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        Integer status = Integer.parseInt(params.get("status"));
        String remark = params.get("remark");
        try {
            boolean success = evaluationService.auditEvaluation(id, status, remark, userId);
            return success ? Result.success() : Result.error("审核失败");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}
