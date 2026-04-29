const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    phone: '',
    password: '',
    roles: ['居民', '商户', '管理员'],
    roleIndex: 0,
    role: 1  // 1-居民, 2-商户, 3-管理员
  },

  onLoad() {
    // 检查是否已登录
    const token = wx.getStorageSync('token');
    if (token) {
      const role = wx.getStorageSync('role');
      // 根据角色跳转
      if (role === 3) {
        wx.hideTabBar({});
        wx.reLaunch({ url: '/pages/admin/index' });
      } else if (role === 2) {
        wx.hideTabBar({});
        wx.reLaunch({ url: '/pages/merchant/index' });
      } else {
        wx.reLaunch({ url: '/pages/index/index' });
      }
    }
  },

  onRoleChange(e) {
    const index = e.detail.value;
    // role: 1-居民, 2-商户, 3-管理员
    const roles = [1, 2, 3];
    this.setData({
      roleIndex: index,
      role: roles[index]
    });
  },

  onPhoneInput(e) {
    this.setData({ phone: e.detail.value });
  },

  onPasswordInput(e) {
    this.setData({ password: e.detail.value });
  },

  async handleLogin() {
    const { phone, password, role } = this.data;
    
    if (!phone) {
      wx.showToast({ title: '请输入手机号', icon: 'none' });
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({ title: '手机号格式不正确', icon: 'none' });
      return;
    }
    if (!password) {
      wx.showToast({ title: '请输入密码', icon: 'none' });
      return;
    }
    
    wx.showLoading({ title: '登录中...' });
    
    try {
      const res = await api.login({ phone, password, role });
      wx.hideLoading();
      if (res.code === 200) {
        const { token, userInfo } = res.data;
        app.globalData.userInfo = userInfo;
        app.globalData.token = token;
        app.globalData.role = userInfo.role;
        wx.setStorageSync('userInfo', userInfo);
        wx.setStorageSync('token', token);
        wx.setStorageSync('role', userInfo.role);
        
        wx.showToast({ title: '登录成功', icon: 'success' });
        
        setTimeout(() => {
          if (userInfo.role === 3) {
            wx.reLaunch({ url: '/pages/admin/index' });
          } else if (userInfo.role === 2) {
            wx.reLaunch({ url: '/pages/merchant/index' });
          } else {
            wx.reLaunch({ url: '/pages/index/index' });
          }
        }, 1000);
      } else {
        wx.showToast({ title: res.msg || '登录失败', icon: 'none' });
      }
    } catch (err) {
      wx.hideLoading();
      console.error('登录失败', err);
      wx.showToast({ title: '登录失败，请稍后重试', icon: 'none' });
    }
  },

  wxLogin() {
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.showToast({ title: '微信登录功能开发中', icon: 'none' });
        } else {
          wx.showToast({ title: '微信登录失败', icon: 'none' });
        }
      }
    });
  },

  goToRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    });
  }
});
