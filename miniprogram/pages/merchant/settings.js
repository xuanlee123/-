// pages/merchant/settings.js - 商户设置
const app = getApp();

Page({
  data: {
    version: '1.0.0'
  },

  onLoad() {
    // 设置版本信息
  },

  clearCache() {
    wx.showModal({
      title: '清除缓存',
      content: '确定要清除本地缓存吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync();
          app.clearUserInfo();
          wx.showToast({ title: '清除成功', icon: 'success' });
          setTimeout(() => {
            wx.reLaunch({ url: '/pages/login/login' });
          }, 1000);
        }
      }
    });
  },

  aboutUs() {
    wx.showModal({
      title: '关于我们',
      content: '社区生活服务平台 v1.0.0\n为您提供便捷的社区商户服务',
      showCancel: false
    });
  },

  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          app.clearUserInfo();
          wx.showToast({ title: '已退出登录', icon: 'success' });
          setTimeout(() => {
            wx.reLaunch({ url: '/pages/login/login' });
          }, 1000);
        }
      }
    });
  }
});
