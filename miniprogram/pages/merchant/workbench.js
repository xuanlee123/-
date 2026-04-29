// pages/merchant/workbench.js - 商户工作台
const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    merchantInfo: null,
    stats: {
      todayOrders: 0,
      monthOrders: 0,
      todayIncome: '0.00',
      services: 0,
      pendingOrders: 0,
      totalEvaluations: 0,
      averageScore: '0.0'
    },
    pendingOrders: [],
    loading: true
  },

  onLoad() {
    if (app.globalData.role !== 2) {
      wx.showToast({ title: '无权访问', icon: 'none' });
      setTimeout(() => {
        wx.reLaunch({ url: '/pages/login/login' });
      }, 1500);
      return;
    }
    wx.hideHomeButton();
  },

  onShow() {
    if (app.globalData.role !== 2) return;
    this.loadData();
  },

  async loadData() {
    this.setData({ loading: true });
    await Promise.all([
      this.loadMerchantInfo(),
      this.loadStats(),
      this.loadPendingOrders()
    ]);
    this.setData({ loading: false });
  },

  async loadMerchantInfo() {
    try {
      const res = await api.getMerchantInfo();
      if (res.code === 200 && res.data) {
        const info = res.data;
        info.statusText = this.getStatusText(info.status);
        info.statusClass = this.getStatusClass(info.status);
        this.setData({ merchantInfo: info });
      }
    } catch (err) {
      console.error('加载商户信息失败', err);
    }
  },

  async loadStats() {
    try {
      const res = await api.getMerchantStats();
      if (res.code === 200 && res.data) {
        const stats = res.data;
        // 确保所有数值都是数字类型
        stats.todayOrders = Number(stats.todayOrders) || 0;
        stats.monthOrders = Number(stats.monthOrders) || 0;
        stats.todayIncome = Number(stats.todayIncome) || 0;
        stats.services = Number(stats.services) || 0;
        stats.pendingOrders = Number(stats.pendingOrders) || 0;
        stats.totalEvaluations = Number(stats.totalEvaluations) || 0;
        stats.averageScore = Number(stats.averageScore) || 0;
        this.setData({ stats });
      }
    } catch (err) {
      console.error('加载统计数据失败', err);
    }
  },

  async loadPendingOrders() {
    try {
      const res = await api.getMerchantPendingOrders({ pageNum: 1, pageSize: 5 });
      if (res.code === 200) {
        const records = res.data?.records || [];
        this.setData({ pendingOrders: records });
      }
    } catch (err) {
      console.error('加载待处理订单失败', err);
    }
  },

  getStatusText(status) {
    const statusMap = {
      0: '待审核',
      1: '已通过',
      2: '已驳回',
      3: '营业中',
      4: '休息中'
    };
    return statusMap[status] || '未知';
  },

  getStatusClass(status) {
    const classMap = {
      0: 'pending',
      1: 'approved',
      2: 'rejected',
      3: 'approved',
      4: 'pending'
    };
    return classMap[status] || 'pending';
  },

  // 页面跳转
  goToService() {
    wx.navigateTo({ url: '/pages/merchant/service' });
  },

  goToCoupon() {
    wx.showToast({ title: '优惠券功能开发中', icon: 'none' });
  },

  goToOrder() {
    wx.navigateTo({ url: '/pages/merchant/order' });
  },

  goToStats() {
    wx.navigateTo({ url: '/pages/merchant/stats' });
  },

  goToAddService() {
    wx.navigateTo({ url: '/pages/merchant/service-add' });
  },

  goToAddCoupon() {
    wx.showToast({ title: '创建优惠券功能开发中', icon: 'none' });
  },

  goToWithdraw() {
    wx.showToast({ title: '提现功能开发中', icon: 'none' });
  },

  goToSettings() {
    wx.showToast({ title: '店铺设置功能开发中', icon: 'none' });
  },

  // 订单操作
  async acceptOrder(e) {
    const id = e.currentTarget.dataset.id;
    try {
      const res = await api.acceptOrder(id);
      if (res.code === 200) {
        wx.showToast({ title: '接单成功', icon: 'success' });
        this.loadPendingOrders();
        this.loadStats();
      }
    } catch (err) {
      wx.showToast({ title: '操作失败', icon: 'none' });
    }
  },

  async rejectOrder(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要拒单吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            const result = await api.rejectOrder(id);
            if (result.code === 200) {
              wx.showToast({ title: '已拒单', icon: 'success' });
              this.loadPendingOrders();
              this.loadStats();
            }
          } catch (err) {
            wx.showToast({ title: '操作失败', icon: 'none' });
          }
        }
      }
    });
  },

  goToOrderDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/merchant/order-detail?id=${id}` });
  }
});
