const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    userInfo: null,
    username: '',
    phone: '',
    avatarUrl: '',
    communityName: '',
    description: '',
    birthday: ''
  },

  onShow() {
    const userInfo = app.globalData.userInfo;
    if (userInfo) {
      this.setData({
        userInfo,
        username: userInfo.username || '',
        phone: userInfo.phone || '',
        avatarUrl: userInfo.avatar || '',
        communityName: userInfo.communityName || '未选择社区',
        description: userInfo.description || ''
      });
    }
  },

  onFieldChange(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [field]: e.detail.value });
  },

  onBirthdayChange(e) {
    this.setData({ birthday: e.detail.value });
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
          fail: () => { wx.hideLoading(); wx.showToast({ title: '上传失败', icon: 'none' }); }
        });
      }
    });
  },

  async saveInfo() {
    const { username } = this.data;
    if (!username.trim()) {
      wx.showToast({ title: '请输入昵称', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '保存中...' });
    try {
      const updateData = {
        username: username.trim(),
        avatar: this.data.avatarUrl,
        description: this.data.description
      };
      const res = await api.updateUserInfo(updateData);
      wx.hideLoading();
      if (res.code === 200) {
        const updated = res.data || {};
        const merged = { ...app.globalData.userInfo, ...updated };
        app.globalData.userInfo = merged;
        wx.setStorageSync('userInfo', merged);
        wx.showToast({ title: '保存成功', icon: 'success' });
        setTimeout(() => { wx.navigateBack(); }, 1000);
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
