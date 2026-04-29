// pages/admin/mine.js - 管理员我的页面
const app = getApp();

Page({
  data: {
    userInfo: null
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
  },

  onShow() {
    if (app.globalData.role !== 3) return;
    wx.hideHomeButton();
    const userInfo = app.globalData.userInfo || {};
    this.setData({ userInfo });
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    switch (tab) {
      case 'index':
        wx.redirectTo({ url: '/pages/admin/index' });
        break;
      case 'data':
        wx.redirectTo({ url: '/pages/admin/data' });
        break;
      case 'order':
        wx.redirectTo({ url: '/pages/admin/order' });
        break;
    }
  },

  goToAnnouncement() {
    wx.navigateTo({
      url: '/pages/admin/announcement'
    });
  },

  goToActivity() {
    wx.navigateTo({
      url: '/pages/admin/activity'
    });
  },

  goToNeighborhood() {
    wx.navigateTo({
      url: '/pages/neighborhood/list?type=admin'
    });
  },

  goToSettings() {
    wx.showToast({ title: '设置功能开发中', icon: 'none' });
  },

  goToAbout() {
    wx.showToast({ title: '关于功能开发中', icon: 'none' });
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
