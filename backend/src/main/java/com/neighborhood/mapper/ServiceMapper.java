package com.neighborhood.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.neighborhood.entity.ServiceInfo;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ServiceMapper extends BaseMapper<ServiceInfo> {
}
