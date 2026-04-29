package com.neighborhood.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@TableName("neighborhoods")
public class Neighborhoods implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @TableId(type = IdType.AUTO)
    private Long id;
    private String name;        // 社区名称
    private String province;    // 省份
    private String city;        // 城市
    private String district;   // 区县
    private String address;    // 详细地址
    private Double latitude;   // 纬度
    private Double longitude; // 经度
    private String description; // 社区描述
    private Integer status;    // 0-禁用，1-正常
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
