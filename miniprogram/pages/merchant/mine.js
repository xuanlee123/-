// pages/merchant/mine.js - 商户我的页面
const app = getApp();
const api = require('../../api/index.js');

Page({
  data: {
    merchantInfo: {},
    stats: {
      todayOrders: 0,
      monthOrders: 0,
      todayIncome: '0.00'
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
    wx.hideHomeButton();
    this.loadMerchantInfo();
    this.loadStats();
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    switch (tab) {
      case 'index':
        wx.redirectTo({ url: '/pages/merchant/index' });
        break;
      case 'order':
        wx.redirectTo({ url: '/pages/merchant/order' });
        break;
      case 'mine':
        break;
      case 'service':
        wx.navigateTo({ url: '/pages/merchant/service' });
        break;
    }
  },

  async loadMerchantInfo() {
    try {
      const res = await api.getMerchantInfo();
      if (res.code === 200) {
        const merchantInfo = res.data;
        merchantInfo.statusText = merchantInfo.status === 1 ? '营业中' : '休息中';
        this.setData({ merchantInfo });
      }
    } catch (err) {
      console.error('加载商户信息失败', err);
      this.loadMockData();
    }
  },

  async loadStats() {
    try {
      const res = await api.getMerchantStats();
      if (res.code === 200) {
        this.setData({ stats: res.data });
      }
    } catch (err) {
      console.error('加载统计数据失败', err);
    }
  },

  loadMockData() {
    this.setData({
      merchantInfo: {
        name: '便民家政服务',
        status: 1,
        statusText: '营业中'
      },
      stats: {
        todayOrders: 5,
        monthOrders: 128,
        todayIncome: '600.00'
      }
    });
  },

  goToWorkbench() {
    wx.navigateTo({ url: '/pages/merchant/workbench' });
  },

  goToService() {
    wx.navigateTo({ url: '/pages/merchant/service' });
  },

  goToCoupon() {
    wx.showToast({ title: '优惠券管理功能开发中', icon: 'none' });
  },

  goToEvaluation() {
    wx.navigateTo({ url: '/pages/merchant/evaluation' });
  },

  goToEdit() {
    wx.navigateTo({ url: '/pages/merchant/edit' });
  },

  goToSettings() {
    wx.navigateTo({ url: '/pages/merchant/settings' });
  },

  goToHelp() {
    wx.navigateTo({ url: '/pages/merchant/help' });
  },

  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          app.clearUserInfo();
          wx.reLaunch({
            url: '/pages/login/login'
          });
        }
      }
    });
  }
});
