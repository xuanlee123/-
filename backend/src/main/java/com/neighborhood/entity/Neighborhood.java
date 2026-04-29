package com.neighborhood.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@TableName("neighborhood")
public class Neighborhood implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long userId;      // 发布者ID
    private String content;   // 动态内容
    private String images;    // 动态图片URL
    private Integer type;     // 0-普通，1-闲置交换，2-求助咨询
    private Integer likeCount;  // 点赞数
    private Integer commentCount; // 评论数
    private Integer status;    // 0-待审核，1-已通过，2-已拒绝，3-已屏蔽
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime createTime;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime updateTime;
    
    @TableField(exist = false)
    private String username;
    
    @TableField(exist = false)
    private String userAvatar;
    
    @TableField(exist = false)
    private Boolean isLiked;
}
