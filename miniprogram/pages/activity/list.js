const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    activities: [],
    pageNum: 1,
    pageSize: 10,
    loading: false,
    hasMore: true,
    statusText: ['已下架', '报名中', '进行中', '已结束'],
    statusClass: ['offline', 'signing', 'ongoing', 'finished']
  },

  onLoad() {
    this.loadActivities();
  },

  async loadActivities(reset = false) {
    if (this.data.loading || (!reset && !this.data.hasMore)) return;

    this.setData({ loading: true });

    try {
      const params = {
        pageNum: reset ? 1 : this.data.pageNum,
        pageSize: this.data.pageSize
      };

      const res = await api.getActivityList(params);
      const data = res.data;

      let activities = reset ? [] : this.data.activities;
      if (data && data.records) {
        const newActivities = data.records.map(a => {
          const statusMap = { 0: '已下架', 1: '报名中', 2: '进行中', 3: '已结束' };
          const statusClassMap = { 0: 'offline', 1: 'signing', 2: 'ongoing', 3: 'finished' };
          let imagesArray = [];
          if (a.images) {
            imagesArray = a.images.split(',').filter(Boolean);
          }
          if (a.imageUrl && !imagesArray.includes(a.imageUrl)) {
            imagesArray.unshift(a.imageUrl);
          }
          return {
            ...a,
            title: a.title || a.name || '未命名活动',
            displayImage: imagesArray[0] || '',
            statusText: statusMap[a.status] || '未知',
            statusClass: statusClassMap[a.status] || '',
            startTimeStr: a.startTime ? (a.startTime.length > 16 ? a.startTime.substring(5, 16).replace('T', ' ') : a.startTime) : '',
            currentPeople: a.currentPeople || a.currentParticipants || 0,
            maxPeople: a.maxPeople || a.maxParticipants || 0,
            contentPreview: a.content ? (a.content.length > 80 ? a.content.substring(0, 80) + '...' : a.content) : ''
          };
        });
        activities = reset ? newActivities : [...activities, ...newActivities];
      }

      this.setData({
        activities,
        pageNum: reset ? 2 : this.data.pageNum + 1,
        hasMore: data && data.records && data.records.length === this.data.pageSize,
        loading: false
      });
    } catch (err) {
      console.error('加载活动失败', err);
      this.setData({ loading: false });
    }
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/activity/detail?id=${id}`
    });
  },

  async signupActivity(e) {
    if (!app.checkLogin()) return;
    
    const activityId = e.currentTarget.dataset.id;
    
    try {
      await api.signupActivity({ activityId });
      wx.showToast({ title: '报名成功', icon: 'success' });
      this.loadActivities(true);
    } catch (err) {
      console.error('报名失败', err);
    }
  },

  onReachBottom() {
    this.loadActivities();
  }
});
