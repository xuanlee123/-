package com.neighborhood.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@TableName("address")
public class Address implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @TableId(type = IdType.AUTO)
    private Long id;
    @TableField("user_id")
    private Long userId;     // 用户ID
    private String name;     // 收货人姓名
    private String phone;   // 联系电话
    private String region; // 收货地区
    private String detail;  // 详细地址
    private Double latitude; // 纬度
    private Double longitude; // 经度
    private Integer isDefault; // 是否默认地址
    @TableLogic
    private Integer deleted;   // 是否删除：0-未删除，1-已删除
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
