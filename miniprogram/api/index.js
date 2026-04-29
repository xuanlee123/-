const api = require('../utils/request.js');

module.exports = {
  // 用户相关
  login: (data) => api.request({ url: '/user/login', method: 'POST', data }),
  register: (data) => api.request({ url: '/user/register', method: 'POST', data }),
  getUserInfo: () => api.request({ url: '/user/info' }),
  updateUserInfo: (data) => api.request({ url: '/user/update', method: 'PUT', data }),
  changePassword: (data) => api.request({ url: '/user/password', method: 'PUT', data }),
  getAdminUserList: (params) => api.request({ url: '/user/admin/list', data: params }),
  updateAdminUserStatus: (userId, status) => api.request({ url: `/user/admin/status/${userId}`, method: 'PUT', data: { status } }),
  resetAdminPassword: (userId, newPassword) => api.request({ url: `/user/admin/reset-password/${userId}`, method: 'PUT', data: { newPassword } }),
  
  // 服务相关
  getServiceList: (params) => api.request({ url: '/service/list', data: params }),
  getServiceDetail: (id) => api.request({ url: `/service/detail/${id}` }),
  getCategories: () => api.request({ url: '/service/category' }),
  addService: (data) => api.request({ url: '/service/add', method: 'POST', data }),
  updateService: (data) => api.request({ url: '/service/update', method: 'PUT', data }),
  deleteService: (id) => api.request({ url: `/service/delete/${id}`, method: 'DELETE' }),
  
  // 订单相关
  createOrder: (data) => api.request({ url: '/order/create', method: 'POST', data }),
  getUserOrders: (params) => api.request({ url: '/order/user/list', data: params }),
  payOrder: (id) => api.request({ url: `/order/pay/${id}`, method: 'PUT' }),
  getMerchantOrders: (params) => api.request({ url: '/order/merchant/list', data: params }),
  getMerchantOrderCounts: () => api.request({ url: '/order/merchant/counts' }),
  getOrderDetail: (id) => api.request({ url: `/order/detail/${id}` }),
  cancelOrder: (id) => api.request({ url: `/order/cancel/${id}`, method: 'PUT' }),
  acceptOrder: (id) => api.request({ url: `/order/accept/${id}`, method: 'PUT' }),
  completeOrder: (id) => api.request({ url: `/order/complete/${id}`, method: 'PUT' }),
  applyRefund: (id, data) => api.request({ url: `/order/refund/${id}`, method: 'PUT', data }),
  getOrderStatistics: () => api.request({ url: '/order/statistics' }),
  getAdminOrders: (params) => api.request({ url: '/order/admin/list', data: params }),
  getAdminOrderCounts: () => api.request({ url: '/order/admin/counts' }),
  confirmAdminPayment: (id) => api.request({ url: `/order/admin/confirm/${id}`, method: 'PUT' }),
  
  // 公告相关
  getAnnouncementList: (params) => api.request({ url: '/announcement/list', data: params }),
  getAnnouncementDetail: (id) => api.request({ url: `/announcement/detail/${id}` }),
  addAnnouncement: (data) => api.request({ url: '/announcement/add', method: 'POST', data }),
  updateAnnouncement: (data) => api.request({ url: '/announcement/update', method: 'PUT', data }),
  deleteAnnouncement: (id) => api.request({ url: `/announcement/delete/${id}`, method: 'DELETE' }),
  publishAnnouncement: (id) => api.request({ url: `/announcement/publish/${id}`, method: 'PUT' }),
  
  // 活动相关
  getActivityList: (params) => api.request({ url: '/activity/list', data: params }),
  getActivityDetail: (id) => api.request({ url: `/activity/detail/${id}` }),
  addActivity: (data) => api.request({ url: '/activity/add', method: 'POST', data }),
  updateActivity: (data) => api.request({ url: '/activity/update', method: 'PUT', data }),
  deleteActivity: (id) => api.request({ url: `/activity/delete/${id}`, method: 'DELETE' }),
  signupActivity: (data) => api.request({ url: '/activity/signup', method: 'POST', data }),
  cancelSignup: (activityId) => api.request({ url: `/activity/cancel/${activityId}`, method: 'DELETE' }),
  getSignupList: (activityId) => api.request({ url: `/activity/signup/list/${activityId}` }),
  
  // 地址相关
  getAddressList: () => api.request({ url: '/address/list' }),
  getDefaultAddress: () => api.request({ url: '/address/default' }),
  getAddressDetail: (id) => api.request({ url: `/address/detail/${id}` }),
  addAddress: (data) => api.request({ url: '/address/add', method: 'POST', data }),
  updateAddress: (data) => api.request({ url: '/address/update', method: 'PUT', data }),
  deleteAddress: (id) => api.request({ url: `/address/delete/${id}`, method: 'DELETE' }),
  setDefaultAddress: (id) => api.request({ url: `/address/default/${id}`, method: 'PUT' }),

  // 邻里圈相关
  getPostList: (params) => api.request({ url: '/neighborhood/list', data: params }),
  getPostDetail: (id) => api.request({ url: `/neighborhood/detail/${id}` }),
  addPost: (data) => api.request({ url: '/neighborhood/add', method: 'POST', data }),
  deletePost: (id) => api.request({ url: `/neighborhood/delete/${id}`, method: 'DELETE' }),
  likePost: (id) => api.request({ url: `/neighborhood/like/${id}`, method: 'POST' }),
  unlikePost: (id) => api.request({ url: `/neighborhood/unlike/${id}`, method: 'DELETE' }),
  getCommentList: (postId) => api.request({ url: `/neighborhood/comment/${postId}` }),
  addComment: (data) => api.request({ url: '/neighborhood/comment/add', method: 'POST', data }),
  deleteComment: (id) => api.request({ url: `/neighborhood/comment/${id}`, method: 'DELETE' }),

  // 商户相关
  getMerchantInfo: () => api.request({ url: '/merchant/info' }),
  getMerchantStats: () => api.request({ url: '/merchant/stats' }),
  getWeekIncomeTrend: () => api.request({ url: '/merchant/week-trend' }),
  getServiceRanking: () => api.request({ url: '/merchant/service-ranking' }),
  getMerchantList: (params) => api.request({ url: '/merchant/list', data: params }),
  submitMerchantApplication: (data) => api.request({ url: '/merchant/apply', method: 'POST', data }),
  auditMerchant: (id, status) => api.request({ url: `/merchant/audit/${id}`, method: 'PUT', data: { status } }),
  getPendingMerchants: (params) => api.request({ url: '/merchant/pending', data: params }),
  getAdminDashboardStats: () => api.request({ url: '/admin/dashboard' }),
  getMerchantCounts: () => api.request({ url: '/merchant/stats' }),
  getMerchantPendingOrders: (params) => api.request({ url: '/order/merchant/list', data: { ...params, status: 0 } }),
  rejectOrder: (id) => api.request({ url: `/order/reject/${id}`, method: 'PUT', data: { reason: '商户拒单' } }),

  // 评价相关
  getMerchantEvaluations: (params) => api.request({ url: '/evaluation/merchant/list', data: params }),
  getMerchantEvaluationStats: () => api.request({ url: '/evaluation/merchant/stats' }),
  replyEvaluation: (id, reply) => api.request({ url: '/evaluation/reply', method: 'POST', data: { id, reply } }),
  addEvaluation: (data) => api.request({ url: '/evaluation/add', method: 'POST', data }),
  getAdminEvaluationList: (params) => api.request({ url: '/evaluation/admin/list', data: params }),
  getAdminEvaluationStats: () => api.request({ url: '/evaluation/admin/stats' }),
  auditEvaluation: (id, status, remark) => api.request({ url: `/evaluation/admin/audit/${id}`, method: 'PUT', data: { status, remark } })
};
