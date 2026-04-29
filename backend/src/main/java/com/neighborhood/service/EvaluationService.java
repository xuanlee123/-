package com.neighborhood.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.Evaluation;

import java.util.Map;

public interface EvaluationService {

    Page<Evaluation> getMerchantEvaluations(Long merchantId, Integer status, Integer pageNum, Integer pageSize);

    Map<String, Object> getMerchantEvaluationStats(Long merchantId);

    boolean replyEvaluation(Long id, Long merchantId, String reply);

    boolean addEvaluation(Evaluation evaluation);

    Evaluation getEvaluationByOrderId(Long orderId);

    // 管理员方法
    Page<Evaluation> getAdminEvaluations(Integer status, Integer negative, Integer pageNum, Integer pageSize);

    Map<String, Object> getAdminEvaluationStats();

    boolean auditEvaluation(Long id, Integer status, String remark, Long auditorId);
}
