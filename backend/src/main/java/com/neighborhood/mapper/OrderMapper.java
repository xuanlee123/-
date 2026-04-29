package com.neighborhood.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.neighborhood.entity.Order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface OrderMapper extends BaseMapper<Order> {
    Page<Order> selectMerchantOrders(@Param("merchantId") Long merchantId, @Param("status") Integer status, Page<Order> page);
    Page<Order> selectAdminOrders(@Param("status") Integer status, Page<Order> page);
}
