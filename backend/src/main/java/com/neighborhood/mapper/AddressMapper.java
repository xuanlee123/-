package com.neighborhood.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.neighborhood.entity.Address;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface AddressMapper extends BaseMapper<Address> {
    void insertAddress(@Param("userId") Long userId,
                        @Param("name") String name,
                        @Param("phone") String phone,
                        @Param("region") String region,
                        @Param("detail") String detail,
                        @Param("isDefault") Integer isDefault,
                        @Param("createTime") java.time.LocalDateTime createTime,
                        @Param("updateTime") java.time.LocalDateTime updateTime);
}
