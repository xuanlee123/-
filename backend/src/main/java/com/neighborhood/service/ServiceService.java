package com.neighborhood.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.ServiceInfo;
import java.util.List;
import java.util.Map;

public interface ServiceService {
    Page<ServiceInfo> getServicePage(Map<String, Object> params);
    ServiceInfo getServiceDetail(Long id);
    List<Map<String, Object>> getCategories();
    boolean addService(ServiceInfo service);
    boolean updateService(ServiceInfo service);
    boolean deleteService(Long id);
    Page<ServiceInfo> getMerchantServices(Long merchantId, Integer pageNum, Integer pageSize);
}
