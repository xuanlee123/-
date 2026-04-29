package com.neighborhood.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.Evaluation;
import com.neighborhood.mapper.EvaluationMapper;
import com.neighborhood.service.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class EvaluationServiceImpl implements EvaluationService {

    @Autowired
    private EvaluationMapper evaluationMapper;

    @Override
    public Page<Evaluation> getMerchantEvaluations(Long merchantId, Integer status, Integer pageNum, Integer pageSize) {
        Page<Evaluation> page = new Page<>(pageNum, pageSize);
        QueryWrapper<Evaluation> wrapper = new QueryWrapper<>();
        wrapper.eq("merchant_id", merchantId);
        if (status != null) {
            wrapper.eq("status", status);
        }
        wrapper.orderByDesc("create_time");
        return evaluationMapper.selectPage(page, wrapper);
    }

    @Override
    public Map<String, Object> getMerchantEvaluationStats(Long merchantId) {
        Map<String, Object> stats = new HashMap<>();

        QueryWrapper<Evaluation> allWrapper = new QueryWrapper<>();
        allWrapper.eq("merchant_id", merchantId).eq("status", 1);
        Long totalCount = evaluationMapper.selectCount(allWrapper);

        QueryWrapper<Evaluation> fiveStarWrapper = new QueryWrapper<>();
        fiveStarWrapper.eq("merchant_id", merchantId).eq("status", 1).eq("score", 5);
        Long fiveStarCount = evaluationMapper.selectCount(fiveStarWrapper);

        QueryWrapper<Evaluation> fourStarWrapper = new QueryWrapper<>();
        fourStarWrapper.eq("merchant_id", merchantId).eq("status", 1).eq("score", 4);
        Long fourStarCount = evaluationMapper.selectCount(fourStarWrapper);

        QueryWrapper<Evaluation> threeStarWrapper = new QueryWrapper<>();
        threeStarWrapper.eq("merchant_id", merchantId).eq("status", 1).eq("score", 3);
        Long threeStarCount = evaluationMapper.selectCount(threeStarWrapper);

        QueryWrapper<Evaluation> twoStarWrapper = new QueryWrapper<>();
        twoStarWrapper.eq("merchant_id", merchantId).eq("status", 1).eq("score", 2);
        Long twoStarCount = evaluationMapper.selectCount(twoStarWrapper);

        QueryWrapper<Evaluation> oneStarWrapper = new QueryWrapper<>();
        oneStarWrapper.eq("merchant_id", merchantId).eq("status", 1).eq("score", 1);
        Long oneStarCount = evaluationMapper.selectCount(oneStarWrapper);

        QueryWrapper<Evaluation> pendingWrapper = new QueryWrapper<>();
        pendingWrapper.eq("merchant_id", merchantId).eq("status", 0);
        Long pendingCount = evaluationMapper.selectCount(pendingWrapper);

        QueryWrapper<Evaluation> negativeWrapper = new QueryWrapper<>();
        negativeWrapper.eq("merchant_id", merchantId).eq("status", 1).eq("negative", 1);
        Long negativeCount = evaluationMapper.selectCount(negativeWrapper);

        double averageScore = 0.0;
        if (totalCount > 0) {
            double totalScore = fiveStarCount * 5.0 + fourStarCount * 4.0 + threeStarCount * 3.0
                              + twoStarCount * 2.0 + oneStarCount * 1.0;
            averageScore = totalScore / totalCount;
        }

        stats.put("totalCount", totalCount);
        stats.put("fiveStarCount", fiveStarCount);
        stats.put("fourStarCount", fourStarCount);
        stats.put("threeStarCount", threeStarCount);
        stats.put("twoStarCount", twoStarCount);
        stats.put("oneStarCount", oneStarCount);
        stats.put("pendingCount", pendingCount);
        stats.put("negativeCount", negativeCount);
        stats.put("averageScore", String.format("%.1f", averageScore));

        return stats;
    }

    @Override
    public boolean replyEvaluation(Long id, Long merchantId, String reply) {
        Evaluation evaluation = evaluationMapper.selectById(id);
        if (evaluation == null) {
            throw new RuntimeException("评价不存在");
        }
        if (!evaluation.getMerchantId().equals(merchantId)) {
            throw new RuntimeException("无权回复此评价");
        }
        if (evaluation.getMerchantReply() != null && !evaluation.getMerchantReply().isEmpty()) {
            throw new RuntimeException("已回复过，不能重复回复");
        }
        evaluation.setMerchantReply(reply);
        evaluation.setMerchantReplyTime(LocalDateTime.now());
        return evaluationMapper.updateById(evaluation) > 0;
    }

    @Override
    public boolean addEvaluation(Evaluation evaluation) {
        evaluation.setCreateTime(LocalDateTime.now());
        evaluation.setUpdateTime(LocalDateTime.now());
        evaluation.setStatus(1);
        evaluation.setNegative(evaluation.getScore() <= 3 ? 1 : 0);
        return evaluationMapper.insert(evaluation) > 0;
    }

    @Override
    public Evaluation getEvaluationByOrderId(Long orderId) {
        QueryWrapper<Evaluation> wrapper = new QueryWrapper<>();
        wrapper.eq("order_id", orderId);
        return evaluationMapper.selectOne(wrapper);
    }

    @Override
    public Page<Evaluation> getAdminEvaluations(Integer status, Integer negative, Integer pageNum, Integer pageSize) {
        Page<Evaluation> page = new Page<>(pageNum, pageSize);
        QueryWrapper<Evaluation> wrapper = new QueryWrapper<>();
        if (status != null) {
            wrapper.eq("status", status);
        }
        if (negative != null) {
            wrapper.eq("negative", negative);
        }
        wrapper.orderByDesc("create_time");
        return evaluationMapper.selectPage(page, wrapper);
    }

    @Override
    public Map<String, Object> getAdminEvaluationStats() {
        Map<String, Object> stats = new HashMap<>();

        QueryWrapper<Evaluation> allWrapper = new QueryWrapper<>();
        allWrapper.eq("status", 1);
        Long totalCount = evaluationMapper.selectCount(allWrapper);

        QueryWrapper<Evaluation> pendingWrapper = new QueryWrapper<>();
        pendingWrapper.eq("status", 0);
        Long pendingCount = evaluationMapper.selectCount(pendingWrapper);

        QueryWrapper<Evaluation> negativeWrapper = new QueryWrapper<>();
        negativeWrapper.eq("status", 1).eq("negative", 1);
        Long negativeCount = evaluationMapper.selectCount(negativeWrapper);

        double averageScore = 0.0;
        if (totalCount > 0) {
            double totalScore = 0.0;
            for (int i = 1; i <= 5; i++) {
                QueryWrapper<Evaluation> scoreWrapper = new QueryWrapper<>();
                scoreWrapper.eq("status", 1).eq("score", i);
                Long count = evaluationMapper.selectCount(scoreWrapper);
                totalScore += count * i;
            }
            averageScore = totalScore / totalCount;
        }

        stats.put("totalCount", totalCount);
        stats.put("pendingCount", pendingCount);
        stats.put("negativeCount", negativeCount);
        stats.put("averageScore", String.format("%.1f", averageScore));

        return stats;
    }

    @Override
    public boolean auditEvaluation(Long id, Integer status, String remark, Long auditorId) {
        Evaluation evaluation = evaluationMapper.selectById(id);
        if (evaluation == null) {
            throw new RuntimeException("评价不存在");
        }
        if (evaluation.getStatus() != 0) {
            throw new RuntimeException("该评价已审核");
        }
        evaluation.setStatus(status);
        evaluation.setAuditRemark(remark);
        evaluation.setAuditorId(auditorId);
        evaluation.setAuditTime(LocalDateTime.now());
        evaluation.setUpdateTime(LocalDateTime.now());
        return evaluationMapper.updateById(evaluation) > 0;
    }
}
