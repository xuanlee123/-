package com.neighborhood.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@TableName("users")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @TableId(type = IdType.AUTO)
    private Long id;
    private String username;
    private String password;
    private String phone;
    private Integer role;          // 1-居民，2-商户，3-管理员
    private Long communityId;      // 所属社区ID
    private String avatar;        // 头像URL
    private String description;    // 个人简介
    private String openid;        // 微信openid
    private Integer status;        // 0-禁用，1-正常
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private Integer failedAttempts;
    private LocalDateTime lockoutEnd;
}
