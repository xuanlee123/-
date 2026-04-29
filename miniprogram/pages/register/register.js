const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    phone: '',
    password: '',
    confirmPassword: '',
    username: '',
    role: 1  // 1-居民，2-商户
  },

  onPhoneInput(e) {
    this.setData({ phone: e.detail.value });
  },

  onPasswordInput(e) {
    this.setData({ password: e.detail.value });
  },

  onConfirmPasswordInput(e) {
    this.setData({ confirmPassword: e.detail.value });
  },

  onUsernameInput(e) {
    this.setData({ username: e.detail.value });
  },

  selectRole(e) {
    this.setData({ role: e.currentTarget.dataset.role });
  },

  async handleRegister() {
    const { phone, password, confirmPassword, username, role } = this.data;
    
    if (!username) {
      wx.showToast({ title: '请输入用户名', icon: 'none' });
      return;
    }
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
    if (password.length < 6) {
      wx.showToast({ title: '密码至少6位', icon: 'none' });
      return;
    }
    if (password !== confirmPassword) {
      wx.showToast({ title: '两次密码不一致', icon: 'none' });
      return;
    }
    
    wx.showLoading({ title: '注册中...' });
    
    try {
      const res = await api.register({
        phone,
        password,
        username,
        role
      });
      
      if (res.code === 200) {
        // 清除可能存在的旧登录信息
        wx.removeStorageSync('token');
        wx.removeStorageSync('userInfo');
        wx.removeStorageSync('role');
        app.globalData.token = null;
        app.globalData.userInfo = null;
        app.globalData.role = null;

        wx.showToast({ title: '注册成功，请登录', icon: 'success' });

        setTimeout(() => {
          wx.redirectTo({ url: '/pages/login/login' });
        }, 1500);
      } else {
        wx.showToast({ title: res.msg || '注册失败', icon: 'none' });
      }
    } catch (err) {
      console.error('注册失败', err);
      wx.showToast({ title: '注册失败，请稍后重试', icon: 'none' });
    } finally {
      wx.hideLoading();
    }
  },

  goToLogin() {
    wx.navigateBack();
  }
});
