// pages/admin/index.js - 管理员工作台
const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    currentDate: '',
    stats: {
      todayOrders: 0,
      pendingAudit: 0,
      complaints: 0,
      users: 0,
      pendingMerchants: 0
    },
    pendingMerchants: []
  },

  onLoad() {
    // 检查是否是管理员
    if (app.globalData.role !== 3) {
      wx.showToast({ title: '无权访问', icon: 'none' });
      setTimeout(() => {
        wx.reLaunch({ url: '/pages/login/login' });
      }, 1500);
      return;
    }
    wx.hideHomeButton();
    this.setCurrentDate();
    this.loadStats();
    this.loadPendingMerchants();
  },

  onShow() {
    if (app.globalData.role !== 3) return;
    wx.hideHomeButton();
    this.loadStats();
    this.loadPendingMerchants();
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    switch (tab) {
      case 'data':
        wx.redirectTo({ url: '/pages/admin/data' });
        break;
      case 'order':
        wx.redirectTo({ url: '/pages/admin/order' });
        break;
      case 'mine':
        wx.redirectTo({ url: '/pages/admin/mine' });
        break;
    }
  },

  setCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()];
    this.setData({
      currentDate: `${year}年${month}月${day}日 ${weekDay}`
    });
  },

  async loadStats() {
    try {
      const res = await api.getAdminDashboardStats();
      if (res.code === 200) {
        this.setData({ stats: res.data });
      }
    } catch (err) {
      console.error('加载统计数据失败', err);
      this.loadMockStats();
    }
  },

  async loadPendingMerchants() {
    try {
      const res = await api.getPendingMerchants({ pageNum: 1, pageSize: 5 });
      if (res.code === 200) {
        this.setData({ pendingMerchants: res.data.records || [] });
      }
    } catch (err) {
      console.error('加载待审核商户失败', err);
      this.loadMockMerchants();
    }
  },

  loadMockStats() {
    this.setData({
      stats: {
        todayOrders: 128,
        pendingAudit: 5,
        complaints: 3,
        users: 2856,
        pendingMerchants: 2
      }
    });
  },

  loadMockMerchants() {
    this.setData({
      pendingMerchants: [
        { id: 1, name: '老王家电维修', createTime: '01-19 10:30', avatarText: '维' },
        { id: 2, name: '邻里生鲜配送', createTime: '01-19 14:20', avatarText: '鲜' }
      ]
    });
  },

  goToOrder() {
    wx.navigateTo({ url: '/pages/admin/order' });
  },

  goToPending() {
    wx.navigateTo({ url: '/pages/admin/merchant?status=pending' });
  },

  goToComplaint() {
    wx.navigateTo({ url: '/pages/admin/order?status=complaint' });
  },

  goToUser() {
    wx.navigateTo({ url: '/pages/admin/user' });
  },

  goToUserManage() {
    wx.navigateTo({ url: '/pages/admin/user' });
  },

  goToReview() {
    wx.navigateTo({ url: '/pages/admin/evaluation' });
  },

  goToAnnouncement() {
    wx.navigateTo({ url: '/pages/admin/announcement' });
  },

  goToActivity() {
    wx.navigateTo({ url: '/pages/admin/activity' });
  },

  goToNeighborhood() {
    wx.navigateTo({ url: '/pages/neighborhood/list?type=admin' });
  },

  goToOrderMonitor() {
    wx.navigateTo({ url: '/pages/admin/order' });
  },

  goToMerchant() {
    wx.navigateTo({ url: '/pages/admin/merchant' });
  },

  async passMerchant(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定通过该商户申请？',
      success: async (res) => {
        if (res.confirm) {
          try {
            const result = await api.auditMerchant(id, 'pass');
            if (result.code === 200) {
              wx.showToast({ title: '审核通过', icon: 'success' });
              this.loadPendingMerchants();
              this.loadStats();
            }
          } catch (err) {
            wx.showToast({ title: '操作失败', icon: 'none' });
          }
        }
      }
    });
  },

  async rejectMerchant(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定驳回该商户申请？',
      success: async (res) => {
        if (res.confirm) {
          try {
            const result = await api.auditMerchant(id, 'reject');
            if (result.code === 200) {
              wx.showToast({ title: '已驳回', icon: 'success' });
              this.loadPendingMerchants();
              this.loadStats();
            }
          } catch (err) {
            wx.showToast({ title: '操作失败', icon: 'none' });
          }
        }
      }
    });
  }
});
