const api = require('../../api/index.js');

Page({
  data: {
    announcements: [],
    pageNum: 1,
    pageSize: 10,
    loading: false,
    hasMore: true
  },

  onLoad() {
    this.loadAnnouncements();
  },

  async loadAnnouncements(reset = false) {
    if (this.data.loading || (!reset && !this.data.hasMore)) return;
    
    this.setData({ loading: true });
    
    try {
      const params = {
        pageNum: reset ? 1 : this.data.pageNum,
        pageSize: this.data.pageSize
      };
      
      const res = await api.getAnnouncementList(params);
      const data = res.data;
      
      let announcements = reset ? [] : this.data.announcements;
      if (data && data.records) {
        announcements = reset ? data.records : [...announcements, ...data.records];
      }
      
      this.setData({
        announcements,
        pageNum: reset ? 2 : this.data.pageNum + 1,
        hasMore: data && data.records && data.records.length === this.data.pageSize,
        loading: false
      });
    } catch (err) {
      console.error('加载公告失败', err);
      this.setData({ loading: false });
    }
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/announcement/detail?id=${id}`
    });
  },

  onReachBottom() {
    this.loadAnnouncements();
  }
});
