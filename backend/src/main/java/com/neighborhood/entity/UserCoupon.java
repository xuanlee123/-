package com.neighborhood.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@TableName("user_coupon")
public class UserCoupon implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long userId;
    private Long couponId;
    private Long orderId;
    private Integer status;
    private LocalDateTime getTime;
    private LocalDateTime useTime;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    
    @TableField(exist = false)
    private String couponName;
    
    @TableField(exist = false)
    private String couponType;
    
    @TableField(exist = false)
    private BigDecimal couponValue;
    
    @TableField(exist = false)
    private BigDecimal minAmount;
}
