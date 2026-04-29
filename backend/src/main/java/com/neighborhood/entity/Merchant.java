package com.neighborhood.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@TableName("merchant")
public class Merchant implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long userId;              // 关联用户ID
    private String name;              // 商户名称
    private String type;              // 商户类型
    private String license;           // 营业执照URL
    private String qualification;     // 服务资质证明
    private String address;           // 商户地址
    private String phone;             // 联系电话
    private String contactPerson;    // 联系人
    private String contactPhone;      // 联系电话
    private String description;       // 商户简介
    private String avatar;            // 商户头像
    private Integer status;           // 0-待审核，1-已通过，2-已驳回，3-营业中，4-休息中
    private LocalDateTime auditTime;  // 审核时间
    private String auditRemark;       // 审核备注
    private String bankAccountName;   // 银行账户名
    private String bankAccountNo;     // 银行账号
    private String bankName;          // 开户银行
    private String bankBranch;       // 支行名称
    private String wechatMerchantId;  // 微信商户号
    private Long totalIncome;         // 累计收入（分）
    private Long totalWithdrawn;      // 已提现金额（分）
    private Long balance;             // 账户余额（分）
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
