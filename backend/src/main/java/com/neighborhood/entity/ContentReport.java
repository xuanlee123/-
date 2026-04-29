package com.neighborhood.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@TableName("content_report")
public class ContentReport implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long reporterId;   // 举报人ID
    private Integer reportType;  // 被举报内容类型：1-邻里圈，2-评价
    private Long targetId;    // 被举报内容ID
    private String reason;   // 举报原因
    private Integer status;  // 0-待处理，1-已处理
    private String handleRemark; // 处理备注
    private Long handlerId;  // 处理人ID
    private LocalDateTime handleTime; // 处理时间
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private String handlerNote;
    private String reasonDetail;
    private Long reportedUserId;
    private Integer type;
}
