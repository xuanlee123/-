const api = require('../../api/index.js');

Page({
  data: {
    id: null,
    announcement: null,
    loading: true
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
      const res = await api.getAnnouncementDetail(this.data.id);
      if (res.data) {
        const a = res.data;
        a.publishTime = a.publishTime ? this.formatTime(a.publishTime) : '';
        a.createTime = a.createTime ? this.formatTime(a.createTime) : '';
        this.setData({ announcement: res.data, loading: false });
      } else {
        this.setData({ loading: false });
        wx.showToast({ title: '公告不存在', icon: 'none' });
      }
    } catch (err) {
      console.error('加载公告详情失败', err);
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

  onShareAppMessage() {
    const a = this.data.announcement;
    if (!a) return {};
    return {
      title: a.title,
      path: `/pages/announcement/detail?id=${a.id}`
    };
  }
});
