// pages/admin/data.js - 管理员数据页面
const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    currentDate: '',
    stats: {
      todayOrders: 0,
      users: 0,
      merchants: 0,
      todayIncome: '0.00',
      pendingOrders: 0,
      processingOrders: 0,
      completedOrders: 0,
      complaints: 0,
      posts: 0,
      comments: 0,
      reports: 0,
      activities: 0,
      services: 0,
      coupons: 0,
      announcements: 0,
      monthIncome: '0.00'
    },
    weekOrders: [
      { day: '周一', count: 0, height: 30 },
      { day: '周二', count: 0, height: 45 },
      { day: '周三', count: 0, height: 60 },
      { day: '周四', count: 0, height: 40 },
      { day: '周五', count: 0, height: 55 },
      { day: '周六', count: 0, height: 70 },
      { day: '周日', count: 0, height: 85 }
    ]
  },

  onLoad() {
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
  },

  onShow() {
    if (app.globalData.role !== 3) return;
    wx.hideHomeButton();
    this.loadStats();
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    switch (tab) {
      case 'index':
        wx.redirectTo({ url: '/pages/admin/index' });
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
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];
    this.setData({
      currentDate: `${month}月${day}日 ${weekDay}`
    });
  },

  async loadStats() {
    try {
      const res = await api.getAdminStats();
      if (res.code === 200) {
        this.setData({ stats: res.data });
        this.updateWeekOrders(res.data.weekOrders);
      }
    } catch (err) {
      console.error('加载统计数据失败', err);
      this.loadMockData();
    }
  },

  updateWeekOrders(weekData) {
    if (!weekData) return;
    const weekOrders = this.data.weekOrders.map((item, index) => ({
      ...item,
      count: weekData[index] || 0,
      height: Math.max(10, (weekData[index] || 0) / 10)
    }));
    this.setData({ weekOrders });
  },

  loadMockData() {
    this.setData({
      stats: {
        todayOrders: 128,
        users: 2856,
        merchants: 156,
        todayIncome: '8,888.00',
        pendingOrders: 23,
        processingOrders: 45,
        completedOrders: 156,
        complaints: 5,
        posts: 1234,
        comments: 5678,
        reports: 12,
        activities: 45,
        services: 234,
        coupons: 890,
        announcements: 56,
        monthIncome: '88,888.00'
      }
    });
  }
});
