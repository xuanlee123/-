package com.neighborhood.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@TableName("favorite")
public class Favorite implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long userId;    // 用户ID
    private Long serviceId; // 服务ID
    private LocalDateTime createTime;
    private String serviceImage;  // 服务图片
    private String serviceName;  // 服务名称
    private BigDecimal servicePrice; // 服务价格
}
