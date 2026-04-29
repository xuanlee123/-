const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    id: null,
    activity: null,
    loading: true,
    signupForm: {
      name: '',
      phone: '',
      remark: ''
    },
    statusText: ['已下架', '报名中', '进行中', '已结束']
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ id: Number(options.id) });
      this.loadDetail();
    }
  },

  async loadDetail() {
    this.setData({ loading: true });
    try {
      const res = await api.getActivityDetail(this.data.id);
      if (res.data) {
        const a = res.data;
        const statusMap = { 0: '已下架', 1: '报名中', 2: '进行中', 3: '已结束' };
        const statusClassMap = { 0: 'offline', 1: 'signing', 2: 'ongoing', 3: 'finished' };

        // 处理多图片
        let imagesArray = [];
        if (a.images) {
          imagesArray = a.images.split(',').filter(Boolean);
        }
        if (a.imageUrl && !imagesArray.includes(a.imageUrl)) {
          imagesArray.unshift(a.imageUrl);
        }

        this.setData({
          activity: {
            ...a,
            title: a.title || a.name || '未命名活动',
            displayImage: imagesArray[0] || '',
            imagesArray: imagesArray,
            startTime: a.startTime ? this.formatTime(a.startTime) : '',
            endTime: a.endTime ? this.formatTime(a.endTime) : '',
            signupStartTime: a.signupStartTime ? this.formatTime(a.signupStartTime) : '',
            signupEndTime: a.signupEndTime ? this.formatTime(a.signupEndTime) : '',
            statusText: statusMap[a.status] || '未知',
            statusClass: statusClassMap[a.status] || '',
            currentPeople: a.currentPeople || a.currentParticipants || 0,
            maxPeople: a.maxPeople || a.maxParticipants || 0,
            location: a.location || a.address || ''
          },
          loading: false
        });

        const userInfo = app.globalData.userInfo;
        if (userInfo) {
          this.setData({
            'signupForm.name': userInfo.username || '',
            'signupForm.phone': userInfo.phone || ''
          });
        }
      } else {
        this.setData({ loading: false });
        wx.showToast({ title: '活动不存在', icon: 'none' });
      }
    } catch (err) {
      console.error('加载活动详情失败', err);
      this.setData({ loading: false });
      wx.showToast({ title: '加载失败', icon: 'none' });
    }
  },

  formatTime(timeStr) {
    if (!timeStr) return '';
    // iOS 不支持 new Date("2026-05-03 17:05:21") 格式
    let d;
    if (typeof timeStr === 'string') {
      const normalizedStr = timeStr.replace(' ', 'T');
      d = new Date(normalizedStr);
    } else {
      d = new Date(timeStr);
    }
    if (isNaN(d.getTime())) {
      return timeStr;
    }
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  },

  onFormFieldChange(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [`signupForm.${field}`]: e.detail.value
    });
  },

  async submitSignup() {
    if (!app.checkLogin()) return;
    const { name, phone } = this.data.signupForm;
    if (!name.trim()) {
      wx.showToast({ title: '请输入姓名', icon: 'none' }); return;
    }
    if (!phone.trim() || !/^1\d{10}$/.test(phone)) {
      wx.showToast({ title: '请输入正确手机号', icon: 'none' }); return;
    }
    try {
      await api.signupActivity({
        activityId: this.data.id,
        name: name.trim(),
        phone: phone.trim(),
        remark: this.data.signupForm.remark.trim()
      });
      wx.showToast({ title: '报名成功', icon: 'success' });
      this.loadDetail();
      this.setData({ signupForm: { name: '', phone: '', remark: '' } });
    } catch (err) {
      console.error('报名失败', err);
    }
  },

  async cancelSignup() {
    try {
      await api.cancelSignup(this.data.id);
      wx.showToast({ title: '已取消报名', icon: 'success' });
      this.loadDetail();
    } catch (err) {
      console.error('取消报名失败', err);
    }
  },

  onShareAppMessage() {
    const a = this.data.activity;
    if (!a) return {};
    return {
      title: a.title,
      path: `/pages/activity/detail?id=${a.id}`
    };
  },

  previewImage(e) {
    const url = e.currentTarget.dataset.url;
    if (url) {
      wx.previewImage({
        urls: this.data.activity.imagesArray,
        current: url
      });
    }
  },

  shareActivity() {
    wx.showShareMenu({
      withShareTicket: true
    });
  }
});
