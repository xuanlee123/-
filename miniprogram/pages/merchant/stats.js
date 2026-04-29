// pages/merchant/stats.js - 商户数据统计
const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    loading: true,
    merchantInfo: null,
    stats: {
      todayOrders: 0,
      monthOrders: 0,
      todayIncome: '0.00',
      services: 0,
      pendingOrders: 0,
      totalEvaluations: 0,
      averageScore: '0.0'
    }
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
    wx.showLoading({ title: '加载中...' });
    
    try {
      await Promise.all([
        this.loadMerchantInfo(),
        this.loadStats()
      ]);
    } catch (err) {
      console.error('加载数据失败', err);
    }
    
    wx.hideLoading();
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
        const data = res.data;
        this.setData({
          stats: {
            todayIncome: Number(data.todayIncome || 0).toFixed(2),
            todayOrders: Number(data.todayOrders || 0),
            monthOrders: Number(data.monthOrders || 0),
            services: Number(data.services || 0),
            pendingOrders: Number(data.pendingOrders || 0),
            totalEvaluations: Number(data.totalEvaluations || 0),
            averageScore: Number(data.averageScore || 0).toFixed(1)
          }
        });
      }
    } catch (err) {
      console.error('加载统计数据失败', err);
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

  goToWithdraw() {
    wx.showToast({ title: '提现功能开发中', icon: 'none' });
  }
});
