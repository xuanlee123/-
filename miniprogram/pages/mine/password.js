const api = require('../../api/index.js');

Page({
  data: {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  },

  onFieldChange(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [field]: e.detail.value });
  },

  async handleSubmit() {
    const { oldPassword, newPassword, confirmPassword } = this.data;

    if (!oldPassword) {
      wx.showToast({ title: '请输入原密码', icon: 'none' });
      return;
    }
    if (!newPassword) {
      wx.showToast({ title: '请输入新密码', icon: 'none' });
      return;
    }
    if (newPassword.length < 6) {
      wx.showToast({ title: '新密码至少6位', icon: 'none' });
      return;
    }
    if (newPassword !== confirmPassword) {
      wx.showToast({ title: '两次密码不一致', icon: 'none' });
      return;
    }
    if (oldPassword === newPassword) {
      wx.showToast({ title: '新密码不能与原密码相同', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '修改中...' });
    try {
      const res = await api.changePassword({ oldPassword, newPassword });
      wx.hideLoading();
      if (res.code === 200) {
        wx.showToast({ title: '修改成功', icon: 'success' });
        setTimeout(() => { wx.navigateBack(); }, 1000);
      } else {
        wx.showToast({ title: res.msg || '修改失败', icon: 'none' });
      }
    } catch (err) {
      wx.hideLoading();
      console.error('修改密码失败', err);
      wx.showToast({ title: '修改失败', icon: 'none' });
    }
  }
});
