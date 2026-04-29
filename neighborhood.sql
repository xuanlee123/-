/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80042
 Source Host           : localhost:3306
 Source Schema         : neighborhood

 Target Server Type    : MySQL
 Target Server Version : 80042
 File Encoding         : 65001

 Date: 26/04/2026 18:28:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity_signup
-- ----------------------------
DROP TABLE IF EXISTS `activity_signup`;
CREATE TABLE `activity_signup`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `activity_id` bigint(0) NOT NULL COMMENT '活动ID',
  `user_id` bigint(0) NOT NULL COMMENT '用户ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '报名人姓名',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '报名人电话',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '报名备注',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '状态：0-已取消，1-已报名',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `sign_up_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_activity_user`(`activity_id`, `user_id`) USING BTREE,
  INDEX `idx_user_id`(`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '活动报名表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activity_signup
-- ----------------------------
INSERT INTO `activity_signup` VALUES (1, 1, 34, '居民用户1', '13900000001', NULL, 1, '2026-04-26 03:13:19', '2026-04-26 03:13:19', '2026-04-24 03:13:19');
INSERT INTO `activity_signup` VALUES (2, 1, 35, '居民用户2', '13900000002', NULL, 1, '2026-04-26 03:13:19', '2026-04-26 03:13:19', '2026-04-24 03:13:19');
INSERT INTO `activity_signup` VALUES (3, 2, 34, '居民用户1', '13900000001', NULL, 1, '2026-04-26 03:13:19', '2026-04-26 03:13:19', '2026-04-25 03:13:19');
INSERT INTO `activity_signup` VALUES (4, 2, 35, '居民用户2', '13900000002', NULL, 1, '2026-04-26 03:13:19', '2026-04-26 03:13:19', '2026-04-25 03:13:19');
INSERT INTO `activity_signup` VALUES (5, 2, 36, '居民用户3', '13900000003', NULL, 1, '2026-04-26 03:13:19', '2026-04-26 03:13:19', '2026-04-25 03:13:19');
INSERT INTO `activity_signup` VALUES (6, 3, 34, '居民用户1', '13900000001', NULL, 1, '2026-04-26 03:13:19', '2026-04-26 03:13:19', '2026-04-26 03:13:19');
INSERT INTO `activity_signup` VALUES (7, 6, 35, '居民用户2', '13900000002', NULL, 1, '2026-04-26 03:13:19', '2026-04-26 03:13:19', '2026-04-26 03:13:19');

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(0) NOT NULL COMMENT '用户ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '收货人姓名',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '联系电话',
  `region` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '收货地区',
  `detail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '详细地址',
  `latitude` double NULL DEFAULT NULL COMMENT '纬度',
  `longitude` double NULL DEFAULT NULL COMMENT '经度',
  `is_default` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否默认地址',
  `deleted` tinyint(0) NOT NULL DEFAULT 0 COMMENT '是否删除：0-未删除，1-已删除',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_user_id`(`user_id`) USING BTREE,
  INDEX `idx_is_default`(`is_default`) USING BTREE,
  INDEX `idx_deleted`(`deleted`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '收货地址表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for announcement
-- ----------------------------
DROP TABLE IF EXISTS `announcement`;
CREATE TABLE `announcement`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '公告标题',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '公告内容',
  `type` tinyint(0) NOT NULL DEFAULT 0 COMMENT '类型：0-系统公告，1-活动通知',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '状态：0-下架，1-上架',
  `publisher_id` bigint(0) NULL DEFAULT NULL COMMENT '发布人ID',
  `publish_time` datetime(0) NULL DEFAULT NULL COMMENT '发布时间',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `community_id` bigint(0) NULL DEFAULT NULL,
  `creator_id` bigint(0) NOT NULL,
  `image_url` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `read_count` int(0) NOT NULL DEFAULT 0,
  `share_count` int(0) NOT NULL DEFAULT 0,
  `urgency` tinyint(0) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  INDEX `idx_type`(`type`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '公告表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of announcement
-- ----------------------------
INSERT INTO `announcement` VALUES (1, '【紧急通知】小区明日停水通知', '各位居民朋友们：\n\n因市政管网改造，明日（4月23日）上午8:00至下午6:00小区将暂停供水。请各位居民提前储水，带来不便敬请谅解！\n\n物业服务中心\n2026年4月22日', 0, 1, NULL, NULL, '2026-04-26 01:05:21', '2026-04-26 01:05:21', NULL, 1, 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400', 156, 23, 1);
INSERT INTO `announcement` VALUES (2, '社区健康讲座免费报名中', '亲爱的居民朋友们：\n\n本周六下午2点，社区活动中心将举办《中医养生健康讲座》，特邀市中医院主任医师主讲。欢迎大家踊跃报名参加！\n\n讲座内容：\n1. 春季养生要点\n2. 中医体质辨识\n3. 常见疾病预防\n\n报名方式：微信群接龙或联系物业前台\n咨询电话：010-12345678', 0, 1, NULL, NULL, '2026-04-25 03:05:21', '2026-04-25 03:05:21', NULL, 1, 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400', 89, 12, 0);
INSERT INTO `announcement` VALUES (3, '4月物业服务报告', '各位业主：\n\n现将4月份物业服务工作汇报如下：\n\n【环境维护】\n- 绿化养护：修剪灌木32株，补植花卉120盆\n- 清洁保障：每日2次公共区域保洁，垃圾日产日清\n\n【设施维护】\n- 电梯保养：完成12部电梯月度保养\n- 照明维修：更换楼道灯156盏\n\n【安全管理】\n- 消防安全：组织消防演练1次，排查隐患12处\n- 门禁系统：升级人脸识别系统1套\n\n感谢各位业主的支持与配合！', 0, 1, NULL, NULL, '2026-04-24 03:05:21', '2026-04-24 03:05:21', NULL, 1, NULL, 67, 5, 0);
INSERT INTO `announcement` VALUES (4, '文明养犬倡议书', '尊敬的养犬业主：\n\n为营造和谐文明的社区环境，我们倡议：\n\n1. 携犬外出时，请使用牵引绳，避免伤人\n2. 遛狗时及时清理犬只粪便\n3. 避免在早晚休息时间犬吠扰民\n4. 定期为犬只接种疫苗，办理犬证\n5. 不在公共区域饲养大型犬只\n\n让我们共同维护美好的社区环境，感谢您的配合！', 0, 1, NULL, NULL, '2026-04-23 03:05:21', '2026-04-23 03:05:21', NULL, 1, 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', 45, 8, 0);
INSERT INTO `announcement` VALUES (5, '五一劳动节放假通知', '各位居民：\n\n根据国家法定节假日安排，2026年五一劳动节放假安排如下：\n\n放假时间：5月1日至5月5日，共5天\n5月6日（周三）正常上班\n\n节日期间物业服务中心安排值班：\n值班时间：9:00-17:00\n值班电话：010-12345678\n\n祝大家节日快乐！', 0, 1, NULL, NULL, '2026-04-22 03:05:21', '2026-04-22 03:05:21', NULL, 1, NULL, 112, 18, 0);

-- ----------------------------
-- Table structure for community_activity
-- ----------------------------
DROP TABLE IF EXISTS `community_activity`;
CREATE TABLE `community_activity`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '活动标题',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '活动内容',
  `images` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '活动图片',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '活动地点',
  `latitude` double NULL DEFAULT NULL COMMENT '纬度',
  `longitude` double NULL DEFAULT NULL COMMENT '经度',
  `start_time` datetime(0) NOT NULL COMMENT '开始时间',
  `end_time` datetime(0) NOT NULL COMMENT '结束时间',
  `signup_start_time` datetime(0) NULL DEFAULT NULL COMMENT '报名开始时间',
  `signup_end_time` datetime(0) NULL DEFAULT NULL COMMENT '报名结束时间',
  `max_participants` int(0) NULL DEFAULT NULL COMMENT '最大参与人数',
  `current_participants` int(0) NULL DEFAULT 0 COMMENT '当前报名人数',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '状态：0-下架，1-报名中，2-进行中，3-已结束',
  `organizer_id` bigint(0) NULL DEFAULT NULL COMMENT '组织者ID',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `creator_id` bigint(0) NOT NULL,
  `current_people` int(0) NOT NULL DEFAULT 0,
  `image_url` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `max_people` int(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  INDEX `idx_start_time`(`start_time`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '社区活动表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of community_activity
-- ----------------------------
INSERT INTO `community_activity` VALUES (1, '周末亲子手工课', '邀请专业手工老师教大家制作精美的纸艺作品，适合3-12岁儿童参与。材料由社区免费提供，快来报名吧！', NULL, NULL, NULL, NULL, '2026-04-25 03:05:21', '2026-04-27 03:05:21', NULL, NULL, NULL, 0, 2, NULL, '2026-04-23 03:05:21', '2026-04-25 03:05:21', 1, 18, 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400', '社区活动中心2楼手工坊', 30);
INSERT INTO `community_activity` VALUES (2, '春季健康义诊活动', '联合社区卫生服务中心，邀请三甲医院专家为居民提供免费健康咨询、量血压、测血糖等服务。\n\n服务内容：\n1. 内科健康咨询\n2. 中医把脉问诊\n3. 血压血糖检测\n4. 用药指导\n\n温馨提示：请携带身份证和社保卡', NULL, NULL, NULL, NULL, '2026-04-29 03:05:21', '2026-04-29 17:05:21', NULL, NULL, NULL, 0, 1, NULL, '2026-04-24 03:05:21', '2026-04-24 03:05:21', 1, 45, 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400', '社区广场东侧', 100);
INSERT INTO `community_activity` VALUES (3, '邻里趣味运动会', '组织丰富多彩的趣味运动项目，增进邻里感情，锻炼身体素质。\n\n比赛项目：\n1. 拔河比赛（每队8人）\n2. 跳绳比赛\n3. 投篮比赛\n4. 套圈游戏\n5. 夹弹珠\n\n参与即有精美礼品，前三名还有额外奖励！', NULL, NULL, NULL, NULL, '2026-05-03 03:05:21', '2026-05-03 17:05:21', NULL, NULL, NULL, 0, 1, NULL, '2026-04-25 03:05:21', '2026-04-25 03:05:21', 1, 76, 'https://images.unsplash.com/photo-1461896836934- voices-of-youth-sports?w=400', '社区篮球场', 200);
INSERT INTO `community_activity` VALUES (4, '社区读书分享会', '每月一次的读书分享会，本月主题：春季养生与心理健康。邀请居民分享自己喜爱的书籍，交流读书心得。', NULL, NULL, NULL, NULL, '2026-04-21 03:05:21', '2026-04-21 17:05:21', NULL, NULL, NULL, 0, 3, NULL, '2026-04-16 03:05:21', '2026-04-21 03:05:21', 1, 35, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', '社区图书馆', 40);
INSERT INTO `community_activity` VALUES (5, '环保知识讲座', '邀请环保专家讲解垃圾分类、资源回收等环保知识，倡导绿色低碳生活。', NULL, NULL, NULL, NULL, '2026-04-16 03:05:21', '2026-04-16 16:05:21', NULL, NULL, NULL, 0, 3, NULL, '2026-04-11 03:05:21', '2026-04-16 03:05:21', 1, 52, 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400', '社区会议室', 60);
INSERT INTO `community_activity` VALUES (6, '母亲节亲子烘焙活动', '母亲节特别活动！邀请妈妈和孩子们一起制作美味的蛋糕和饼干，增进亲子感情。\n\n活动内容：\n1. 制作纸杯蛋糕\n2. 制作曲奇饼干\n3. 亲子互动游戏\n4. 合影留念\n\n所有材料免费提供，完成的作品可以带回家哦！', NULL, NULL, NULL, NULL, '2026-05-01 03:05:21', '2026-05-01 16:05:21', NULL, NULL, NULL, 0, 1, NULL, '2026-04-26 03:05:21', '2026-04-26 03:05:21', 1, 20, 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400', '社区活动中心1楼厨房教室', 25);
INSERT INTO `community_activity` VALUES (7, '户外写生活动', '组织居民到社区花园进行户外写生，感受春天的美好。', NULL, NULL, NULL, NULL, '2026-04-23 03:05:21', '2026-04-23 17:05:21', NULL, NULL, NULL, 0, 0, NULL, '2026-04-19 03:05:21', '2026-04-22 03:05:21', 1, 5, 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400', '社区花园', 30);

-- ----------------------------
-- Table structure for content_report
-- ----------------------------
DROP TABLE IF EXISTS `content_report`;
CREATE TABLE `content_report`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `reporter_id` bigint(0) NOT NULL COMMENT '举报人ID',
  `report_type` int(0) NOT NULL COMMENT '被举报内容类型：1-邻里圈，2-评价',
  `target_id` bigint(0) NOT NULL COMMENT '被举报内容ID',
  `reason` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '举报原因',
  `status` tinyint(0) NOT NULL DEFAULT 0 COMMENT '处理状态：0-待处理，1-已处理',
  `handle_remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '处理备注',
  `handler_id` bigint(0) NULL DEFAULT NULL COMMENT '处理人ID',
  `handle_time` datetime(0) NULL DEFAULT NULL COMMENT '处理时间',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `handler_note` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `reason_detail` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `reported_user_id` bigint(0) NULL DEFAULT NULL,
  `type` int(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_reporter_id`(`reporter_id`) USING BTREE,
  INDEX `idx_target`(`report_type`, `target_id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '内容举报表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of content_report
-- ----------------------------
INSERT INTO `content_report` VALUES (1, 35, 0, 1, '内容包含广告信息', 1, NULL, NULL, NULL, '2026-04-24 03:23:27', '2026-04-26 03:23:27', NULL, NULL, 36, 0);

-- ----------------------------
-- Table structure for coupon
-- ----------------------------
DROP TABLE IF EXISTS `coupon`;
CREATE TABLE `coupon`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '优惠券名称',
  `merchant_id` bigint(0) NULL DEFAULT NULL COMMENT '所属商户ID，null表示平台优惠券',
  `type` tinyint(0) NOT NULL COMMENT '类型：1-满减 2-折扣',
  `coupon_value` decimal(10, 2) NOT NULL COMMENT '满减金额 或 折扣率',
  `min_amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '最低消费金额',
  `total_count` int(0) NOT NULL COMMENT '发放总数量',
  `remain_count` int(0) NOT NULL COMMENT '剩余数量',
  `start_time` datetime(0) NOT NULL COMMENT '开始时间',
  `end_time` datetime(0) NOT NULL COMMENT '结束时间',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '状态：0-禁用，1-启用',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_merchant_id`(`merchant_id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  INDEX `idx_time`(`start_time`, `end_time`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '优惠券表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of coupon
-- ----------------------------
INSERT INTO `coupon` VALUES (1, '新人专享券', NULL, 1, 10.00, 50.00, 100, 85, '2026-03-27 03:18:32', '2026-06-25 03:18:32', 1, '2026-04-26 03:18:32');
INSERT INTO `coupon` VALUES (2, '满100减20', NULL, 1, 20.00, 100.00, 50, 35, '2026-04-11 03:18:32', '2026-06-10 03:18:32', 1, '2026-04-26 03:18:32');
INSERT INTO `coupon` VALUES (3, '服务折扣券', NULL, 2, 15.00, 0.00, 200, 179, '2026-04-19 03:18:32', '2026-05-26 03:18:32', 1, '2026-04-26 03:18:32');

-- ----------------------------
-- Table structure for evaluation
-- ----------------------------
DROP TABLE IF EXISTS `evaluation`;
CREATE TABLE `evaluation`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `order_id` bigint(0) NOT NULL COMMENT '订单ID',
  `user_id` bigint(0) NOT NULL COMMENT '用户ID',
  `merchant_id` bigint(0) NOT NULL COMMENT '商户ID',
  `score` int(0) NOT NULL COMMENT '评分（1-5分）',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '评价内容',
  `images` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '评价图片URL',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '审核状态：0-待审核，1-已通过，2-已拒绝',
  `negative` tinyint(0) NOT NULL DEFAULT 0 COMMENT '是否疑似差评：0-否，1-是',
  `audit_remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '审核备注',
  `auditor_id` bigint(0) NULL DEFAULT NULL COMMENT '审核人ID',
  `audit_time` datetime(0) NULL DEFAULT NULL COMMENT '审核时间',
  `merchant_reply` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '商户回复',
  `merchant_reply_time` datetime(0) NULL DEFAULT NULL COMMENT '商户回复时间',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_order_id`(`order_id`) USING BTREE,
  INDEX `idx_user_id`(`user_id`) USING BTREE,
  INDEX `idx_merchant_id`(`merchant_id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '评价表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of evaluation
-- ----------------------------
INSERT INTO `evaluation` VALUES (1, 1, 34, 1, 5, '服务非常满意！阿姨干活很认真，清洁效果很好，强烈推荐！', NULL, 1, 0, NULL, NULL, NULL, 'xiexei', '2026-04-26 03:33:56', '2026-04-25 03:14:22', '2026-04-26 03:33:56');
INSERT INTO `evaluation` VALUES (2, 4, 35, 1, 2, '服务态度一般，迟到了一会儿，整体还行吧。', NULL, 1, 0, NULL, NULL, NULL, NULL, NULL, '2026-04-24 03:14:22', '2026-04-24 03:14:22');

-- ----------------------------
-- Table structure for favorite
-- ----------------------------
DROP TABLE IF EXISTS `favorite`;
CREATE TABLE `favorite`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(0) NOT NULL COMMENT '用户ID',
  `service_id` bigint(0) NOT NULL COMMENT '服务ID',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `service_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `service_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `service_price` decimal(10, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_user_service`(`user_id`, `service_id`) USING BTREE,
  UNIQUE INDEX `UKg04fd00qnko405ypxjb926x4a`(`user_id`, `service_id`) USING BTREE,
  INDEX `idx_service_id`(`service_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '服务收藏表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of favorite
-- ----------------------------
INSERT INTO `favorite` VALUES (1, 34, 1, '2026-04-24 03:20:03', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400', '日常保洁', 88.00);
INSERT INTO `favorite` VALUES (2, 34, 5, '2026-04-25 03:20:03', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400', '空调维修', 80.00);
INSERT INTO `favorite` VALUES (3, 35, 11, '2026-04-23 03:20:03', 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400', '蔬菜套餐', 28.00);
INSERT INTO `favorite` VALUES (4, 36, 21, '2026-04-25 03:20:03', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400', '数学辅导', 150.00);

-- ----------------------------
-- Table structure for merchant
-- ----------------------------
DROP TABLE IF EXISTS `merchant`;
CREATE TABLE `merchant`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(0) NOT NULL COMMENT '关联用户ID',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商户名称',
  `license` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '营业执照URL',
  `qualification` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '服务资质证明URL',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商户地址',
  `contact_person` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '联系人',
  `contact_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '联系电话',
  `status` tinyint(0) NOT NULL DEFAULT 0 COMMENT '状态：0-待审核，1-已通过，2-已驳回',
  `audit_time` datetime(0) NULL DEFAULT NULL COMMENT '审核时间',
  `audit_remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '审核备注',
  `bank_account_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '银行账户名',
  `bank_account_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '银行账号（加密）',
  `bank_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '开户银行',
  `bank_branch` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '支行名称',
  `wechat_merchant_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '微信商户号',
  `total_income` bigint(0) NULL DEFAULT 0 COMMENT '累计收入（分）',
  `total_withdrawn` bigint(0) NULL DEFAULT 0 COMMENT '已提现金额（分）',
  `balance` bigint(0) NULL DEFAULT 0 COMMENT '账户余额（分）',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_user_id`(`user_id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  INDEX `idx_name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '商户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of merchant
-- ----------------------------
INSERT INTO `merchant` VALUES (1, 2, '阳光家政', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '朝阳区建国路88号', '张经理', '010-12345678', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 8800, 0, 8800, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (2, 3, '温馨家政', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '海淀区中关村大街1号', '李经理', '010-23456789', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (3, 4, '洁净家政', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '东城区王府井大街138号', '王经理', '010-34567890', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (4, 5, '贴心家政', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '西城区金融街19号', '赵经理', '010-45678901', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (5, 6, '便民维修', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '海淀区上地信息路12号', '刘师傅', '010-56789012', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (6, 7, '专业维修', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '朝阳区望京SOHO', '陈师傅', '010-67890123', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (7, 8, '速修达', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '丰台区科技园区', '周师傅', '010-78901234', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (8, 9, '好帮手维修', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '石景山区八角游乐园', '吴师傅', '010-89012345', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (9, 10, '新鲜到家', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '海淀区中关村', '孙老板', '010-90123456', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (10, 11, '菜篮子', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '朝阳区大望路', '黄老板', '010-01234567', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (11, 12, '鲜生速递', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '东城区崇文门', '林老板', '010-12345679', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (12, 13, '绿色田园', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '通州区运河湾', '杨老板', '010-23456780', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (13, 14, '健康中心', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '朝阳区国贸', '周医生', '010-34567891', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (14, 15, '社区诊所', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '海淀区学院路', '李医生', '010-45678902', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (15, 16, '康养之家', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '西城区德胜门', '王院长', '010-56789013', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (16, 17, '仁和中医', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '东城区东直门', '张中医', '010-67890124', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (17, 18, '智慧教育', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '海淀区黄庄', '刘老师', '010-78901235', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (18, 19, '博学苑', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '朝阳区望京', '陈老师', '010-89012346', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (19, 20, '星光艺术', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '西城区西单', '王老师', '010-90123457', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (20, 21, '启明星', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '丰台区六里桥', '李老师', '010-01234568', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (21, 22, '万能服务', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '朝阳区三元桥', '张老板', '010-12345670', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (22, 23, '便利服务社', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '海淀区五道口', '李老板', '010-23456781', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (23, 24, '生活帮', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '东城区天安门', '赵老板', '010-34567892', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (24, 25, '社区通', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '通州区武夷花园', '王主任', '010-45678903', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (25, 26, '便民驿站', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '朝阳区双井', '刘老板', '010-56789014', 1, '2026-04-26 02:59:57', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `merchant` VALUES (26, 27, '社区超市', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '海淀区清河', '陈老板', '010-67890125', 1, '2026-04-26 02:59:58', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `merchant` VALUES (27, 28, '洗衣房', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '西城区什刹海', '周老板', '010-78901236', 1, '2026-04-26 02:59:58', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `merchant` VALUES (28, 29, '社区银行', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '东城区王府井', '刘经理', '010-89012347', 1, '2026-04-26 02:59:58', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `merchant` VALUES (29, 30, '万科物业', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '朝阳区国贸CBD', '王经理', '010-90123458', 1, '2026-04-26 02:59:58', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `merchant` VALUES (30, 31, '保利物业', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '海淀区中关村', '李经理', '010-01234569', 1, '2026-04-26 02:59:58', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `merchant` VALUES (31, 32, '碧桂园物业', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '通州区运河湾', '张经理', '010-12345671', 1, '2026-04-26 02:59:58', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `merchant` VALUES (32, 33, '社区物业', 'https://example.com/license.jpg', 'https://example.com/qualification.jpg', '各社区服务中心', '赵经理', '010-23456782', 1, '2026-04-26 02:59:58', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '2026-04-26 02:59:58', '2026-04-26 02:59:58');

-- ----------------------------
-- Table structure for merchant_account_log
-- ----------------------------
DROP TABLE IF EXISTS `merchant_account_log`;
CREATE TABLE `merchant_account_log`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `merchant_id` bigint(0) NOT NULL COMMENT '商户ID',
  `type` int(0) NOT NULL COMMENT '类型：1-订单收入，2-提现扣款',
  `amount` bigint(0) NOT NULL COMMENT '变动金额（分）',
  `balance_before` bigint(0) NOT NULL COMMENT '变动前余额',
  `balance_after` bigint(0) NOT NULL COMMENT '变动后余额',
  `relation_id` bigint(0) NULL DEFAULT NULL COMMENT '关联订单/提现ID',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '备注',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `coupon_id` bigint(0) NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `order_id` bigint(0) NULL DEFAULT NULL,
  `order_no` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `status` tinyint(0) NOT NULL DEFAULT 1,
  `withdraw_id` bigint(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_merchant_id`(`merchant_id`) USING BTREE,
  INDEX `idx_type`(`type`) USING BTREE,
  INDEX `idx_create_time`(`create_time`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '商户账户变动表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of merchant_account_log
-- ----------------------------
INSERT INTO `merchant_account_log` VALUES (1, 1, 1, 100, 450, 550, NULL, NULL, '2026-04-22 03:23:10', NULL, '订单完成收入', 1, NULL, 1, NULL);
INSERT INTO `merchant_account_log` VALUES (2, 1, 2, 50, 550, 500, NULL, NULL, '2026-04-23 03:23:10', NULL, '提现', NULL, NULL, 1, NULL);
INSERT INTO `merchant_account_log` VALUES (3, 2, 1, 200, 600, 800, NULL, NULL, '2026-04-24 03:23:10', NULL, '订单完成收入', 2, NULL, 1, NULL);
INSERT INTO `merchant_account_log` VALUES (4, 3, 1, 150, 850, 1000, NULL, NULL, '2026-04-25 03:23:10', NULL, '订单完成收入', 3, NULL, 1, NULL);
INSERT INTO `merchant_account_log` VALUES (5, 1, 1, 8800, 0, 8800, NULL, NULL, '2026-04-26 03:34:03', NULL, '订单收入：日常保洁', 2, 'ORD202604220002', 1, NULL);

-- ----------------------------
-- Table structure for merchant_withdraw
-- ----------------------------
DROP TABLE IF EXISTS `merchant_withdraw`;
CREATE TABLE `merchant_withdraw`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `merchant_id` bigint(0) NOT NULL COMMENT '商户ID',
  `amount` bigint(0) NOT NULL COMMENT '提现金额（分）',
  `status` tinyint(0) NOT NULL DEFAULT 0 COMMENT '状态：0-待审核，1-已通过，2-已拒绝',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '备注',
  `handler_id` bigint(0) NULL DEFAULT NULL COMMENT '处理人ID',
  `handle_time` datetime(0) NULL DEFAULT NULL COMMENT '处理时间',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `actual_amount` bigint(0) NULL DEFAULT NULL,
  `audit_remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `audit_time` datetime(6) NULL DEFAULT NULL,
  `audit_user_id` bigint(0) NULL DEFAULT NULL,
  `bank_account_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `bank_account_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `bank_branch` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `bank_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `complete_time` datetime(6) NULL DEFAULT NULL,
  `fee` bigint(0) NULL DEFAULT NULL,
  `transaction_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_merchant_id`(`merchant_id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '商户提现表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of merchant_withdraw
-- ----------------------------
INSERT INTO `merchant_withdraw` VALUES (1, 1, 500, 3, NULL, NULL, NULL, '2026-04-21 03:21:31', '2026-04-22 03:21:31', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `merchant_withdraw` VALUES (2, 2, 800, 3, NULL, NULL, NULL, '2026-04-23 03:21:31', '2026-04-24 03:21:31', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `merchant_withdraw` VALUES (3, 3, 1000, 1, NULL, NULL, NULL, '2026-04-25 03:21:31', '2026-04-25 03:21:31', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `merchant_withdraw` VALUES (4, 1, 500, 3, NULL, NULL, NULL, '2026-04-21 03:24:02', '2026-04-26 03:24:02', NULL, NULL, '2026-04-22 03:24:02.000000', NULL, '张经理', '6222021234567890', NULL, '中国工商银行', '2026-04-22 03:24:02.000000', NULL, NULL);
INSERT INTO `merchant_withdraw` VALUES (5, 2, 800, 3, NULL, NULL, NULL, '2026-04-23 03:24:02', '2026-04-26 03:24:02', NULL, NULL, '2026-04-24 03:24:02.000000', NULL, '李经理', '6217001234567890', NULL, '中国建设银行', '2026-04-24 03:24:02.000000', NULL, NULL);
INSERT INTO `merchant_withdraw` VALUES (6, 3, 1000, 1, NULL, NULL, NULL, '2026-04-25 03:24:02', '2026-04-26 03:24:02', NULL, NULL, NULL, NULL, '王经理', '6228481234567890', NULL, '中国农业银行', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for neighborhood
-- ----------------------------
DROP TABLE IF EXISTS `neighborhood`;
CREATE TABLE `neighborhood`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(0) NOT NULL COMMENT '发布者ID',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '动态内容',
  `images` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '动态图片URL（逗号分隔）',
  `type` tinyint(0) NOT NULL DEFAULT 0 COMMENT '动态类型：0-普通，1-闲置交换，2-求助咨询',
  `like_count` int(0) NOT NULL DEFAULT 0 COMMENT '点赞数',
  `comment_count` int(0) NOT NULL DEFAULT 0 COMMENT '评论数',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '状态：0-待审核，1-已通过，2-已拒绝，3-已屏蔽',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_user_id`(`user_id`) USING BTREE,
  INDEX `idx_type`(`type`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  INDEX `idx_create_time`(`create_time`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '邻里圈表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of neighborhood
-- ----------------------------
INSERT INTO `neighborhood` VALUES (1, 1, '今天小区门口新开了一家生鲜超市，蔬菜很新鲜，价格也实惠，推荐大家去看看！', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', 0, 12, 5, 1, '2026-04-26 00:59:58', '2026-04-26 00:59:58');
INSERT INTO `neighborhood` VALUES (2, 2, '有没有邻居知道附近哪里有修电器的？家里的洗衣机坏了，急用！', NULL, 2, 8, 15, 1, '2026-04-25 21:59:58', '2026-04-25 21:59:58');
INSERT INTO `neighborhood` VALUES (3, 3, '分享一个好消息，社区明天下午2点在活动中心举办健康讲座，欢迎大家参加！', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400,https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400', 0, 25, 8, 1, '2026-04-25 02:59:58', '2026-04-25 02:59:58');
INSERT INTO `neighborhood` VALUES (4, 4, '最近天气不错，有没有邻居想一起晨跑的？每天早上6点，小区门口集合！', NULL, 0, 18, 12, 1, '2026-04-25 02:59:58', '2026-04-25 02:59:58');
INSERT INTO `neighborhood` VALUES (5, 5, '闲置一台微波炉，功能正常，有需要的邻居可以免费领取，就在3号楼2单元', 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400', 1, 30, 20, 1, '2026-04-24 02:59:58', '2026-04-24 02:59:58');
INSERT INTO `neighborhood` VALUES (6, 6, '家里小孩上小学，有没有好的辅导班推荐？最好是离家近一点的', NULL, 2, 15, 25, 1, '2026-04-24 02:59:58', '2026-04-24 02:59:58');
INSERT INTO `neighborhood` VALUES (7, 2, '求购一只小猫', 'http://localhost:8080/uploads/fc1af7d41f5b417890629030636ca44c.png', 0, 1, 1, 1, '2026-04-26 03:34:33', '2026-04-26 03:34:50');

-- ----------------------------
-- Table structure for neighborhood_comment
-- ----------------------------
DROP TABLE IF EXISTS `neighborhood_comment`;
CREATE TABLE `neighborhood_comment`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `post_id` bigint(0) NOT NULL COMMENT '帖子ID',
  `user_id` bigint(0) NOT NULL COMMENT '评论用户ID',
  `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '评论内容',
  `parent_id` bigint(0) NULL DEFAULT NULL COMMENT '父评论ID（回复）',
  `reply_user_id` bigint(0) NULL DEFAULT NULL COMMENT '被回复的用户ID',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_post_id`(`post_id`) USING BTREE,
  INDEX `idx_user_id`(`user_id`) USING BTREE,
  INDEX `idx_parent_id`(`parent_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '邻里圈评论表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of neighborhood_comment
-- ----------------------------
INSERT INTO `neighborhood_comment` VALUES (1, 1, 35, '这家店我知道，确实不错！', NULL, NULL, '2026-04-25 03:16:59');
INSERT INTO `neighborhood_comment` VALUES (2, 1, 36, '谢谢推荐，改天去看看', NULL, NULL, '2026-04-25 03:16:59');
INSERT INTO `neighborhood_comment` VALUES (3, 2, 36, '可以联系便民维修，速度挺快的', NULL, NULL, '2026-04-24 03:16:59');
INSERT INTO `neighborhood_comment` VALUES (4, 3, 34, '已报名，期待！', NULL, NULL, '2026-04-23 03:16:59');
INSERT INTO `neighborhood_comment` VALUES (5, 5, 35, '我想要，可以来拿吗？', NULL, NULL, '2026-04-25 03:16:59');
INSERT INTO `neighborhood_comment` VALUES (6, 7, 2, '一只缅因猫', NULL, NULL, '2026-04-26 03:34:50');

-- ----------------------------
-- Table structure for neighborhood_like
-- ----------------------------
DROP TABLE IF EXISTS `neighborhood_like`;
CREATE TABLE `neighborhood_like`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `post_id` bigint(0) NOT NULL COMMENT '帖子ID',
  `user_id` bigint(0) NOT NULL COMMENT '用户ID',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_post_user`(`post_id`, `user_id`) USING BTREE,
  UNIQUE INDEX `UKf5uot32hlmyox45dvos51n7to`(`post_id`, `user_id`) USING BTREE,
  INDEX `idx_post_id`(`post_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '邻里圈点赞表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of neighborhood_like
-- ----------------------------
INSERT INTO `neighborhood_like` VALUES (1, 1, 35, '2026-04-25 03:17:19');
INSERT INTO `neighborhood_like` VALUES (2, 1, 36, '2026-04-25 03:17:19');
INSERT INTO `neighborhood_like` VALUES (3, 2, 34, '2026-04-24 03:17:19');
INSERT INTO `neighborhood_like` VALUES (4, 3, 35, '2026-04-23 03:17:19');
INSERT INTO `neighborhood_like` VALUES (5, 3, 36, '2026-04-23 03:17:19');
INSERT INTO `neighborhood_like` VALUES (6, 5, 34, '2026-04-25 03:17:19');
INSERT INTO `neighborhood_like` VALUES (7, 7, 2, '2026-04-26 03:34:36');

-- ----------------------------
-- Table structure for neighborhoods
-- ----------------------------
DROP TABLE IF EXISTS `neighborhoods`;
CREATE TABLE `neighborhoods`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '社区名称',
  `province` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '省份',
  `city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '城市',
  `district` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '区县',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '详细地址',
  `latitude` double NULL DEFAULT NULL COMMENT '纬度',
  `longitude` double NULL DEFAULT NULL COMMENT '经度',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '社区描述',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '状态：0-禁用，1-正常',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  INDEX `idx_name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '社区表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `order_no` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '订单编号',
  `user_id` bigint(0) NOT NULL COMMENT '用户ID',
  `merchant_id` bigint(0) NOT NULL COMMENT '商户ID',
  `service_id` bigint(0) NOT NULL COMMENT '服务ID',
  `service_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '服务名称',
  `price` decimal(10, 2) NOT NULL COMMENT '订单金额',
  `service_time` datetime(0) NOT NULL COMMENT '预约服务时间',
  `demand` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '具体需求',
  `status` int(0) NOT NULL COMMENT '订单状态：0-待付款，1-已付款待接单，2-服务中，3-服务完成，4-已取消，5-退款中，6-已退款，7-投诉中',
  `payment_time` datetime(0) NULL DEFAULT NULL COMMENT '付款时间',
  `payment_no` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '支付单号',
  `accept_time` datetime(0) NULL DEFAULT NULL COMMENT '接单时间',
  `complete_time` datetime(0) NULL DEFAULT NULL COMMENT '完成时间',
  `cancel_time` datetime(0) NULL DEFAULT NULL COMMENT '取消时间',
  `refund_time` datetime(0) NULL DEFAULT NULL COMMENT '退款时间',
  `refund_reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '退款原因',
  `merchant_refuse_reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '商户拒绝退款原因',
  `refuse_time` datetime(0) NULL DEFAULT NULL COMMENT '拒绝时间',
  `complaint_reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '投诉原因',
  `complaint_time` datetime(0) NULL DEFAULT NULL COMMENT '投诉时间',
  `address_id` bigint(0) NULL DEFAULT NULL COMMENT '地址ID',
  `user_coupon_id` bigint(0) NULL DEFAULT NULL COMMENT '用户优惠券ID',
  `address_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '收货人姓名',
  `address_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '收货人电话',
  `address_region` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '收货地区',
  `address_detail` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '收货详细地址',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `order_no`(`order_no`) USING BTREE,
  INDEX `idx_order_no`(`order_no`) USING BTREE,
  INDEX `idx_user_id`(`user_id`) USING BTREE,
  INDEX `idx_merchant_id`(`merchant_id`) USING BTREE,
  INDEX `idx_service_id`(`service_id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  INDEX `idx_create_time`(`create_time`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '订单表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (1, 'ORD202604220001', 34, 1, 1, '日常保洁', 88.00, '2026-04-24 10:00:21', '希望上午9点到11点之间上门服务', 3, NULL, NULL, '2026-04-24 08:00:21', '2026-04-24 11:30:21', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '张三', '13900000001', '北京市朝阳区', '建国路88号1号楼', '2026-04-23 03:05:21', '2026-04-24 11:30:21');
INSERT INTO `orders` VALUES (2, 'ORD202604220002', 34, 1, 1, '日常保洁', 88.00, '2026-04-27 14:00:21', '周末可以全天服务', 3, NULL, NULL, '2026-04-26 00:05:21', '2026-04-26 03:34:03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-04-25 22:05:21', '2026-04-26 03:34:03');
INSERT INTO `orders` VALUES (3, 'ORD202604220003', 35, 2, 5, '日常保洁', 78.00, '2026-04-28 10:00:21', '尽快安排', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-04-26 01:05:21', '2026-04-26 01:05:21');
INSERT INTO `orders` VALUES (4, 'ORD202604210004', 35, 1, 1, '日常保洁', 88.00, '2026-04-25 15:00:21', '时间不合适，取消', 4, NULL, NULL, NULL, NULL, '2026-04-25 10:00:21', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-04-24 03:05:21', '2026-04-25 10:00:21');

-- ----------------------------
-- Table structure for service
-- ----------------------------
DROP TABLE IF EXISTS `service`;
CREATE TABLE `service`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `merchant_id` bigint(0) NOT NULL COMMENT '商户ID',
  `category_id` bigint(0) NOT NULL COMMENT '分类ID',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '服务名称',
  `price` decimal(10, 2) NOT NULL COMMENT '服务价格',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '服务描述',
  `images` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '服务图片URL（逗号分隔）',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '状态：0-下架，1-上架',
  `deleted` tinyint(0) NOT NULL DEFAULT 0 COMMENT '是否删除：0-未删除，1-已删除',
  `sort` int(0) NOT NULL DEFAULT 0 COMMENT '排序权重',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_merchant_id`(`merchant_id`) USING BTREE,
  INDEX `idx_category_id`(`category_id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  INDEX `idx_deleted`(`deleted`) USING BTREE,
  INDEX `idx_sort`(`sort`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '服务表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of service
-- ----------------------------
INSERT INTO `service` VALUES (1, 1, 1, '日常保洁', 88.00, '2小时日常打扫，包括客厅、卧室、厨房、卫生间基础清洁', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (2, 1, 1, '深度清洁', 188.00, '4小时深度清洁，全方位除尘除垢', 'https://images.unsplash.com/photo-1527515545081-5db817172677?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (3, 1, 1, '开荒保洁', 388.00, '新房装修后首次清洁，除甲醛', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (4, 1, 1, '家电清洗', 128.00, '空调、洗衣机深度清洗保养', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (5, 2, 1, '日常保洁', 78.00, '2小时日常打扫，温馨服务', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (6, 2, 1, '深度清洁', 168.00, '4小时深度清洁，专业团队', 'https://images.unsplash.com/photo-1527515545081-5db817172677?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (7, 2, 1, '擦玻璃', 100.00, '专业擦玻璃服务，透亮如新', 'https://images.unsplash.com/photo-1565814329456-6c77d1623537?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (8, 2, 1, '收纳整理', 200.00, '专业收纳整理，空间优化', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (9, 3, 1, '日常保洁', 98.00, '2小时高品质日常清洁服务', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (10, 3, 1, '深度清洁', 198.00, '4小时深度清洁，进口工具', 'https://images.unsplash.com/photo-1527515545081-5db817172677?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (11, 3, 1, '除螨服务', 150.00, '专业除螨服务，高温杀菌', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (12, 3, 1, '甲醛治理', 500.00, '专业甲醛检测治理，安全环保', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (13, 4, 1, '日常保洁', 85.00, '2小时贴心日常清洁', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (14, 4, 1, '深度清洁', 180.00, '4小时深度清洁，贴心服务', 'https://images.unsplash.com/photo-1527515545081-5db817172677?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (15, 4, 1, '做饭服务', 120.00, '按需做饭服务，营养均衡', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (16, 4, 1, '照顾老人', 200.00, '专业陪护服务，贴心照顾', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (17, 5, 2, '空调维修', 80.00, '专业空调维修，加氟、清洗、保养', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (18, 5, 2, '冰箱维修', 100.00, '冰箱故障维修，专业检测', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (19, 5, 2, '洗衣机维修', 80.00, '洗衣机维修，快速上门', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (20, 5, 2, '电视维修', 60.00, '液晶电视维修，技术精湛', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (21, 6, 2, '空调维修', 100.00, '品牌空调维修，品质保证', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (22, 6, 2, '冰箱维修', 120.00, '冰箱深度维修，原厂配件', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (23, 6, 2, '油烟机清洗', 80.00, '油烟机深度清洗，去油污', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (24, 6, 2, '热水器维修', 90.00, '热水器维修，安全检查', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (25, 7, 2, '水电维修', 50.00, '水电故障快速维修', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (26, 7, 2, '门窗维修', 60.00, '门窗维修配件更换', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (27, 7, 2, '灯具安装', 30.00, '灯具安装维修，安全规范', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (28, 7, 2, '马桶维修', 80.00, '马桶漏水维修，快速响应', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (29, 8, 2, '空调维修', 70.00, '空调维修、清洗、保养', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (30, 8, 2, '冰箱维修', 90.00, '冰箱维修服务，快速上门', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (31, 8, 2, '小家电维修', 40.00, '小家电维修，种类齐全', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (32, 8, 2, '电路维修', 60.00, '电路故障检测，安全第一', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (33, 9, 3, '新鲜蔬菜', 30.00, '当日新鲜蔬菜配送，满足日常需求', 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (34, 9, 3, '新鲜水果', 50.00, '新鲜水果配送，甜蜜每一天', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (35, 9, 3, '肉禽蛋品', 40.00, '新鲜肉类禽蛋，品质保障', 'https://images.unsplash.com/photo-1506484381205-f7945b4d6a32?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (36, 9, 3, '海鲜配送', 80.00, '新鲜海鲜配送，活鲜到家', 'https://images.unsplash.com/photo-1506484381205-f7945b4d6a32?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (37, 10, 3, '蔬菜套餐', 28.00, '时令蔬菜套餐，每周更换', 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (38, 10, 3, '水果套餐', 38.00, '新鲜水果套餐，营养丰富', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (39, 10, 3, '有机蔬菜', 68.00, '有机蔬菜礼盒，健康首选', 'https://images.unsplash.com/photo-1506484381205-f7945b4d6a32?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (40, 10, 3, '半成品菜', 48.00, '洗净切好半成品，轻松做菜', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (41, 11, 3, '生鲜速递', 20.00, '30分钟极速配送', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (42, 11, 3, '水果礼盒', 128.00, '精品水果礼盒，送礼佳品', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (43, 11, 3, '有机生鲜', 88.00, '有机生鲜套餐，健康生活', 'https://images.unsplash.com/photo-1506484381205-f7945b4d6a32?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (44, 11, 3, '会员配送', 99.00, '月度会员配送，省心省钱', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (45, 12, 3, '有机蔬菜', 68.00, '有机蔬菜配送，每周一次', 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (46, 12, 3, '田园采摘', 50.00, '亲自体验采摘乐趣', 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (47, 12, 3, '农庄体验', 200.00, '农庄一日游，亲近自然', 'https://images.unsplash.com/photo-1506484381205-f7945b4d6a32?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (48, 12, 3, '定制套餐', 168.00, '定制蔬菜套餐，专属搭配', 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (49, 13, 4, '基础体检', 299.00, '常规体检项目，包括血常规、尿常规等', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (50, 13, 4, '全面体检', 899.00, '深度全面体检，先进设备', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (51, 13, 4, '中医调理', 188.00, '中医体质辨识，个性化调理', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (52, 13, 4, '健康咨询', 100.00, '专业医生咨询，解答疑惑', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (53, 14, 4, '常见病诊治', 50.00, '感冒、发烧等常见病诊治', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (54, 14, 4, '疫苗接种', 100.00, '各类疫苗接种，健康防护', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (55, 14, 4, '血压血糖', 20.00, '免费测量，关注健康', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (56, 14, 4, '伤口处理', 30.00, '小伤口处理，专业护理', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (57, 15, 4, '养老服务', 300.00, '专业养老护理服务', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (58, 15, 4, '康复理疗', 150.00, '专业康复理疗，恢复健康', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (59, 15, 4, '陪诊服务', 100.00, '医院陪诊，贴心陪伴', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (60, 15, 4, '营养膳食', 80.00, '营养膳食配送，健康饮食', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (61, 16, 4, '中医问诊', 80.00, '中医把脉问诊服务', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (62, 16, 4, '针灸推拿', 150.00, '专业针灸推拿，舒筋活络', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (63, 16, 4, '中药调理', 200.00, '个性化中药调理，标本兼治', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (64, 16, 4, '拔罐刮痧', 100.00, '传统拔罐刮痧，排毒养生', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (65, 17, 5, '数学辅导', 150.00, '中小学数学一对一辅导', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (66, 17, 5, '英语培训', 180.00, '专业英语培训，口语提升', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (67, 17, 5, '物理化学', 160.00, '理科综合辅导，答疑解惑', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (68, 17, 5, '作业辅导', 100.00, '课后作业辅导，查漏补缺', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (69, 18, 5, '语文辅导', 140.00, '作文阅读辅导，提升写作', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (70, 18, 5, '奥数培训', 200.00, '奥数竞赛培训，思维训练', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (71, 18, 5, '小升初', 300.00, '小升初冲刺，名校辅导', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (72, 18, 5, '中考高考', 350.00, '中高考冲刺，升学保障', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (73, 19, 5, '钢琴培训', 200.00, '专业钢琴一对一教学', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (74, 19, 5, '绘画培训', 150.00, '儿童绘画水彩，培养兴趣', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (75, 19, 5, '舞蹈培训', 180.00, '中国舞芭蕾街舞，多种选择', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (76, 19, 5, '声乐培训', 160.00, '专业声乐教学，歌唱技巧', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (77, 20, 5, '早教课程', 120.00, '0-3岁早教，开发智力', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (78, 20, 5, '智力开发', 150.00, '儿童智力开发，全面提升', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (79, 20, 5, '英语启蒙', 130.00, '幼儿英语启蒙，趣味学习', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (80, 20, 5, '乐高机器人', 180.00, '乐高机器人编程，动手能力', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (81, 21, 6, '综合服务', 100.00, '各类生活服务一站式解决', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (82, 21, 6, '家政服务', 80.00, '家政服务，贴心管家', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (83, 21, 6, '搬家服务', 200.00, '搬家货运，安全高效', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (84, 21, 6, '清洁服务', 150.00, '深度清洁，焕然一新', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (85, 22, 6, '快递代收', 10.00, '收发快递，方便快捷', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (86, 22, 6, '代购服务', 20.00, '日常代购，省时省力', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (87, 22, 6, '票务代理', 30.00, '机票火车票，出行无忧', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (88, 22, 6, '家政预约', 100.00, '家政服务预约，准时上门', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (89, 23, 6, '家电清洗', 80.00, '家电深度清洗，洁净如新', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (90, 23, 6, '擦玻璃', 60.00, '专业擦玻璃，窗明几净', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (91, 23, 6, '地板打蜡', 100.00, '木地板打蜡，保养维护', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (92, 23, 6, '窗帘清洗', 90.00, '窗帘清洗，去除灰尘', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (93, 24, 6, '社区服务', 60.00, '社区综合服务，便民利民', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (94, 24, 6, '物业报修', 50.00, '物业报修服务，快速响应', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (95, 24, 6, '咨询代办', 80.00, '便民咨询代办，省心省力', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 3, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (96, 24, 6, '活动组织', 100.00, '社区活动组织，丰富生活', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 4, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (97, 25, 6, '快递代收', 10.00, '收发快递，随时可取', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (98, 25, 6, '代购服务', 15.00, '日常代购，送货上门', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 2, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service` VALUES (99, 25, 6, '打印复印', 5.00, '打印复印服务，方便快捷', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 3, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (100, 25, 6, '便民充值', 0.00, '手机充值缴费，随时充值', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 4, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (101, 26, 6, '日用百货', 30.00, '日用百货配送，一站式购物', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', 1, 0, 1, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (102, 26, 6, '生鲜配送', 20.00, '生鲜配送，新鲜快速', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', 1, 0, 2, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (103, 26, 6, '水果拼盘', 50.00, '新鲜水果拼盘，精致美味', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', 1, 0, 3, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (104, 26, 6, '定时配送', 99.00, '月度配送会员，省心省钱', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', 1, 0, 4, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (105, 27, 6, '衣物清洗', 30.00, '普通衣物清洗，干净整洁', 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400', 1, 0, 1, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (106, 27, 6, '干洗服务', 60.00, '专业干洗，呵护衣物', 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400', 1, 0, 2, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (107, 27, 6, '熨烫服务', 20.00, '衣物熨烫，平整如新', 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400', 1, 0, 3, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (108, 27, 6, '皮革护理', 100.00, '皮衣皮具护理，奢品保养', 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400', 1, 0, 4, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (109, 28, 6, '便民金融', 0.00, '便民金融服务，安全可靠', 'https://images.unsplash.com/photo-1565514020176-850c667fa9e1?w=400', 1, 0, 1, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (110, 28, 6, '水电缴费', 0.00, '水电燃气缴费，便捷缴纳', 'https://images.unsplash.com/photo-1565514020176-850c667fa9e1?w=400', 1, 0, 2, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (111, 28, 6, '转账汇款', 0.00, '转账汇款服务，实时到账', 'https://images.unsplash.com/photo-1565514020176-850c667fa9e1?w=400', 1, 0, 3, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (112, 28, 6, '理财咨询', 0.00, '理财咨询服务，财富管理', 'https://images.unsplash.com/photo-1565514020176-850c667fa9e1?w=400', 1, 0, 4, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (113, 29, 7, '物业服务', 100.00, '基础物业服务，品质保障', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 1, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (114, 29, 7, '安保服务', 150.00, '24小时安保，安全放心', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 2, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (115, 29, 7, '绿化维护', 80.00, '园林绿化维护，美化家园', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 3, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (116, 29, 7, '维修服务', 50.00, '公共设施维修，及时响应', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 4, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (117, 30, 7, '物业服务', 120.00, '全方位物业服务，尊贵体验', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 1, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (118, 30, 7, '保洁服务', 100.00, '公共区域保洁，干净整洁', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 2, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (119, 30, 7, '维修服务', 60.00, '物业维修，专业迅速', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 3, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (120, 30, 7, '车位管理', 200.00, '车位租赁管理，便民停车', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 4, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (121, 31, 7, '物业服务', 110.00, '品质物业服务，温馨服务', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 1, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (122, 31, 7, '社区活动', 0.00, '社区活动组织，丰富生活', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 2, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (123, 31, 7, '访客登记', 0.00, '访客登记服务，安全有序', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 3, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (124, 31, 7, '快递代收', 10.00, '快递代收服务，便民取件', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 4, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (125, 32, 7, '物业服务', 80.00, '基础物业服务，贴心服务', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 1, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (126, 32, 7, '维修服务', 40.00, '便民维修服务，快速响应', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 2, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (127, 32, 7, '垃圾清理', 30.00, '垃圾清理服务，环保卫生', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 3, '2026-04-26 02:59:58', '2026-04-26 02:59:58');
INSERT INTO `service` VALUES (128, 32, 7, '便民服务', 20.00, '各项便民服务，温暖到家', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 1, 0, 4, '2026-04-26 02:59:58', '2026-04-26 02:59:58');

-- ----------------------------
-- Table structure for service_category
-- ----------------------------
DROP TABLE IF EXISTS `service_category`;
CREATE TABLE `service_category`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分类名称',
  `parent_id` bigint(0) NOT NULL DEFAULT 0 COMMENT '父分类ID，0为一级分类',
  `sort` int(0) NOT NULL DEFAULT 0 COMMENT '排序权重',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '分类图标',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '状态：0-禁用，1-正常',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_parent_id`(`parent_id`) USING BTREE,
  INDEX `idx_sort`(`sort`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '服务分类表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of service_category
-- ----------------------------
INSERT INTO `service_category` VALUES (1, '家政服务', 0, 1, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service_category` VALUES (2, '维修服务', 0, 2, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service_category` VALUES (3, '生鲜配送', 0, 3, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service_category` VALUES (4, '医疗服务', 0, 4, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service_category` VALUES (5, '教育培训', 0, 5, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service_category` VALUES (6, '便民服务', 0, 6, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');
INSERT INTO `service_category` VALUES (7, '物业服务', 0, 7, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57');

-- ----------------------------
-- Table structure for user_coupon
-- ----------------------------
DROP TABLE IF EXISTS `user_coupon`;
CREATE TABLE `user_coupon`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(0) NOT NULL COMMENT '用户ID',
  `coupon_id` bigint(0) NOT NULL COMMENT '优惠券ID',
  `order_id` bigint(0) NULL DEFAULT NULL COMMENT '关联订单ID',
  `status` tinyint(0) NOT NULL DEFAULT 0 COMMENT '状态：0-未使用，1-已使用，2-已过期',
  `get_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '领取时间',
  `use_time` datetime(0) NULL DEFAULT NULL COMMENT '使用时间',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_user_id`(`user_id`) USING BTREE,
  INDEX `idx_coupon_id`(`coupon_id`) USING BTREE,
  INDEX `idx_status`(`status`) USING BTREE,
  CONSTRAINT `FK23vpkw483hhbe77dgvimcipf4` FOREIGN KEY (`coupon_id`) REFERENCES `coupon` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '用户优惠券表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_coupon
-- ----------------------------
INSERT INTO `user_coupon` VALUES (1, 34, 1, NULL, 1, '2026-04-26 03:18:32', NULL, '2026-04-21 03:18:32', '2026-04-26 03:18:32');
INSERT INTO `user_coupon` VALUES (2, 34, 2, NULL, 1, '2026-04-26 03:18:32', NULL, '2026-04-23 03:18:32', '2026-04-26 03:18:32');
INSERT INTO `user_coupon` VALUES (3, 35, 1, NULL, 1, '2026-04-26 03:18:32', NULL, '2026-04-22 03:18:32', '2026-04-26 03:18:32');
INSERT INTO `user_coupon` VALUES (4, 36, 3, NULL, 1, '2026-04-26 03:18:32', NULL, '2026-04-24 03:18:32', '2026-04-26 03:18:32');
INSERT INTO `user_coupon` VALUES (5, 34, 3, NULL, 0, '2026-04-26 03:32:22', NULL, '2026-04-26 03:32:22', '2026-04-26 03:32:22');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '加密密码',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '手机号',
  `role` int(0) NOT NULL COMMENT '角色：1-居民，2-商户，3-管理员',
  `community_id` bigint(0) NULL DEFAULT NULL COMMENT '所属社区ID',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '头像URL',
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '个人简介',
  `openid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '微信openid',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '状态：0-禁用，1-正常',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  `failed_attempts` int(0) NULL DEFAULT 0,
  `lockout_end` datetime(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `phone`(`phone`) USING BTREE,
  UNIQUE INDEX `openid`(`openid`) USING BTREE,
  INDEX `idx_phone`(`phone`) USING BTREE,
  INDEX `idx_openid`(`openid`) USING BTREE,
  INDEX `idx_role`(`role`) USING BTREE,
  INDEX `idx_community_id`(`community_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000000', 3, NULL, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 03:32:49', 0, NULL);
INSERT INTO `users` VALUES (2, '阳光家政', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000001', 2, NULL, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 03:33:29', 0, NULL);
INSERT INTO `users` VALUES (3, '温馨家政', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000002', 2, NULL, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (4, '洁净家政', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000003', 2, NULL, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (5, '贴心家政', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000004', 2, NULL, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (6, '便民维修', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000005', 2, NULL, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (7, '专业维修', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000006', 2, NULL, 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (8, '速修达维修', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000007', 2, NULL, 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (9, '新鲜', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000008', 2, NULL, 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (10, '好帮手到家', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000009', 2, NULL, 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (11, '菜篮子', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000010', 2, NULL, 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (12, '鲜生速递', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000011', 2, NULL, 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (13, '绿色田园', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000012', 2, NULL, 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (14, '健康中心', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000013', 2, NULL, 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (15, '社区诊所', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000014', 2, NULL, 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (16, '康养之家', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000015', 2, NULL, 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (17, '仁和中医', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000016', 2, NULL, 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (18, '智慧教育', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000017', 2, NULL, 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (19, '博学苑', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000018', 2, NULL, 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (20, '星光艺术', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000019', 2, NULL, 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (21, '启明星', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000020', 2, NULL, 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (22, '万能服务', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000021', 2, NULL, 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (23, '便利服务社', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000022', 2, NULL, 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (24, '生活帮', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000023', 2, NULL, 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (25, '社区通', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000024', 2, NULL, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (26, '便民驿站', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000025', 2, NULL, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (27, '社区超市', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000026', 2, NULL, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (28, '洗衣房', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000027', 2, NULL, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (29, '社区银行', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000028', 2, NULL, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (30, '万科物业', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000029', 2, NULL, 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (31, '保利物业', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000030', 2, NULL, 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (32, '碧桂园物业', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000031', 2, NULL, 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (33, '社区物业', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13800000032', 2, NULL, 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (34, '居民用户1', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13900000001', 1, NULL, 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 03:31:31', 0, NULL);
INSERT INTO `users` VALUES (35, '居民用户2', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13900000002', 1, NULL, 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);
INSERT INTO `users` VALUES (36, '居民用户3', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '13900000003', 1, NULL, 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100', NULL, NULL, 1, '2026-04-26 02:59:57', '2026-04-26 02:59:57', 0, NULL);

SET FOREIGN_KEY_CHECKS = 1;
