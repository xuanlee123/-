package com.neighborhood.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.ServiceInfo;
import com.neighborhood.entity.ServiceCategory;
import com.neighborhood.mapper.ServiceCategoryMapper;
import com.neighborhood.mapper.ServiceMapper;
import com.neighborhood.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ServiceServiceImpl implements ServiceService {

    @Autowired
    private ServiceMapper serviceMapper;
    
    @Autowired
    private ServiceCategoryMapper categoryMapper;

    @Override
    public Page<ServiceInfo> getServicePage(Map<String, Object> params) {
        Integer pageNum = params.get("pageNum") != null ? Integer.parseInt(params.get("pageNum").toString()) : 1;
        Integer pageSize = params.get("pageSize") != null ? Integer.parseInt(params.get("pageSize").toString()) : 10;
        
        Page<ServiceInfo> page = new Page<>(pageNum, pageSize);
        QueryWrapper<ServiceInfo> wrapper = new QueryWrapper<>();
        wrapper.eq("status", 1);
        wrapper.eq("deleted", 0);
        
        if (params.get("categoryId") != null) {
            wrapper.eq("category_id", params.get("categoryId"));
        }
        if (params.get("keyword") != null) {
            wrapper.like("name", params.get("keyword"));
        }
        if (params.get("merchantId") != null) {
            wrapper.eq("merchant_id", params.get("merchantId"));
        }
        
        wrapper.orderByDesc("sort", "create_time");
        Page<ServiceInfo> result = serviceMapper.selectPage(page, wrapper);
        
        for (ServiceInfo service : result.getRecords()) {
            ServiceCategory category = categoryMapper.selectById(service.getCategoryId());
            if (category != null) {
                service.setCategoryName(category.getName());
            }
        }
        
        return result;
    }

    @Override
    public ServiceInfo getServiceDetail(Long id) {
        ServiceInfo service = serviceMapper.selectById(id);
        if (service != null) {
            ServiceCategory category = categoryMapper.selectById(service.getCategoryId());
            if (category != null) {
                service.setCategoryName(category.getName());
            }
        }
        return service;
    }

    @Override
    public List<Map<String, Object>> getCategories() {
        List<ServiceCategory> categories = categoryMapper.selectList(
            new QueryWrapper<ServiceCategory>().eq("status", 1).orderByAsc("sort")
        );
        List<Map<String, Object>> result = new ArrayList<>();
        for (ServiceCategory category : categories) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", category.getId());
            map.put("name", category.getName());
            map.put("icon", category.getIcon());
            result.add(map);
        }
        return result;
    }

    @Override
    public boolean addService(ServiceInfo service) {
        service.setCreateTime(LocalDateTime.now());
        service.setUpdateTime(LocalDateTime.now());
        service.setStatus(1);
        service.setDeleted(0);
        return serviceMapper.insert(service) > 0;
    }

    @Override
    public boolean updateService(ServiceInfo service) {
        service.setUpdateTime(LocalDateTime.now());
        return serviceMapper.updateById(service) > 0;
    }

    @Override
    public boolean deleteService(Long id) {
        ServiceInfo service = serviceMapper.selectById(id);
        service.setDeleted(1);
        service.setUpdateTime(LocalDateTime.now());
        return serviceMapper.updateById(service) > 0;
    }

    @Override
    public Page<ServiceInfo> getMerchantServices(Long merchantId, Integer pageNum, Integer pageSize) {
        Page<ServiceInfo> page = new Page<>(pageNum, pageSize);
        QueryWrapper<ServiceInfo> wrapper = new QueryWrapper<>();
        wrapper.eq("merchant_id", merchantId);
        wrapper.eq("deleted", 0);
        wrapper.orderByDesc("create_time");
        return serviceMapper.selectPage(page, wrapper);
    }
}
