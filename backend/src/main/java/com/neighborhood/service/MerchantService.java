package com.neighborhood.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.Merchant;
import java.util.List;
import java.util.Map;

public interface MerchantService {
    Merchant getMerchantByUserId(Long userId);
    Map<String, Object> getMerchantStats(Long userId);
    List<Double> getWeekIncomeTrend(Long merchantId);
    List<Map<String, Object>> getServiceRanking(Long merchantId);
    Page<Merchant> getMerchantPage(Map<String, Object> params);
    boolean submitApplication(Merchant merchant);
    boolean auditMerchant(Long id, String status, String remark);
    Page<Merchant> getPendingMerchants(Map<String, Object> params);
}
