package com.neighborhood.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@TableName("service_category")
public class ServiceCategory implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @TableId(type = IdType.AUTO)
    private Long id;
    private String name;           // 分类名称
    private Long parentId;          // 父分类ID，0为一级分类
    private Integer sort;          // 排序权重
    private String icon;           // 分类图标
    private Integer status;        // 0-禁用，1-正常
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
