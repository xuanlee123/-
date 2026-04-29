package com.neighborhood.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.neighborhood.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper extends BaseMapper<User> {
    User selectByPhone(@Param("phone") String phone);
    User selectByOpenid(@Param("openid") String openid);
}
