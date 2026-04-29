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
@TableName("service")
public class ServiceInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long merchantId;
    private Long categoryId;
    private String name;
    private BigDecimal price;
    private String description;
    private String images;
    private Integer status;
    private Integer deleted;
    private Integer sort;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    
    @TableField(exist = false)
    private String merchantName;
    
    @TableField(exist = false)
    private String categoryName;
}
