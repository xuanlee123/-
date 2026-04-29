// pages/merchant/edit.js - 商户编辑信息
const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    merchantInfo: null,
    name: '',
    type: '',
    phone: '',
    address: '',
    description: '',
    avatarUrl: ''
  },

  onLoad() {
    if (app.globalData.role !== 2) {
      wx.showToast({ title: '无权访问', icon: 'none' });
      setTimeout(() => {
        wx.reLaunch({ url: '/pages/login/login' });
      }, 1500);
      return;
    }
  },

  onShow() {
    if (app.globalData.role !== 2) return;
    this.loadMerchantInfo();
  },

  async loadMerchantInfo() {
    try {
      const res = await api.getMerchantInfo();
      if (res.code === 200 && res.data) {
        const info = res.data;
        this.setData({
          merchantInfo: info,
          name: info.name || '',
          type: info.type || '',
          phone: info.phone || '',
          address: info.address || '',
          description: info.description || '',
          avatarUrl: info.avatar || ''
        });
      }
    } catch (err) {
      console.error('加载商户信息失败', err);
    }
  },

  onFieldChange(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [field]: e.detail.value });
  },

  chooseAvatar() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        wx.showLoading({ title: '上传中...' });
        wx.uploadFile({
          url: app.globalData.baseUrl + '/upload',
          filePath: tempFilePath,
          name: 'file',
          header: { token: app.globalData.token ? `Bearer ${app.globalData.token}` : '' },
          success: (res) => {
            wx.hideLoading();
            try {
              const data = JSON.parse(res.data);
              if (data.code === 200 && data.data) {
                const fullUrl = app.globalData.baseUrl + '/' + data.data;
                this.setData({ avatarUrl: fullUrl });
              } else {
                wx.showToast({ title: data.msg || '上传失败', icon: 'none' });
              }
            } catch (e) {
              wx.showToast({ title: '上传失败', icon: 'none' });
            }
          },
          fail: () => {
            wx.hideLoading();
            wx.showToast({ title: '上传失败', icon: 'none' });
          }
        });
      }
    });
  },

  async saveInfo() {
    const { name, phone, address, description, avatarUrl } = this.data;
    
    if (!name.trim()) {
      wx.showToast({ title: '请输入商户名称', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '保存中...' });
    try {
      const updateData = {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        description: description.trim(),
        avatar: avatarUrl
      };
      
      const res = await api.submitMerchantApplication(updateData);
      wx.hideLoading();
      
      if (res.code === 200) {
        wx.showToast({ title: '保存成功', icon: 'success' });
        setTimeout(() => {
          wx.navigateBack();
        }, 1000);
      } else {
        wx.showToast({ title: res.msg || '保存失败', icon: 'none' });
      }
    } catch (err) {
      wx.hideLoading();
      console.error('保存失败', err);
      wx.showToast({ title: '保存失败', icon: 'none' });
    }
  },

  goToChangePassword() {
    wx.navigateTo({ url: '/pages/mine/password' });
  }
});
