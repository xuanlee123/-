package com.neighborhood.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@TableName("evaluation")
public class Evaluation implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long orderId;
    private Long userId;
    private Long merchantId;
    private Integer score;
    private String content;
    private String images;
    private Integer status;
    private Integer negative;
    private String auditRemark;
    private Long auditorId;
    private LocalDateTime auditTime;
    private String merchantReply;
    private LocalDateTime merchantReplyTime;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    
    @TableField(exist = false)
    private String userName;
    
    @TableField(exist = false)
    private String userAvatar;
}
