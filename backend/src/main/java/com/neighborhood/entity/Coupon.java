package com.neighborhood.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@TableName("coupon")
public class Coupon implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @TableId(type = IdType.AUTO)
    private Long id;
    private String name;       // 优惠券名称
    private Long merchantId;  // 所属商户ID
    private Integer type;       // 1-满减 2-折扣
    private BigDecimal couponValue; // 满减金额 或 折扣率
    private BigDecimal minAmount;   // 最低消费金额
    private Integer totalCount;    // 发放总数量
    private Integer remainCount;   // 剩余数量
    private LocalDateTime startTime;  // 开始时间
    private LocalDateTime endTime;    // 结束时间
    private Integer status;    // 0-禁用，1-启用
    private LocalDateTime createTime;
}
