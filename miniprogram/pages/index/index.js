const api = require('../../api/index.js');

Page({
  data: {
    banners: [],
    categories: [],
    hotServices: [],
    announcements: [],
    activities: [],
    neighbors: []
  },

  onLoad() {
    this.loadHomeData();
  },

  onShow() {
    if (this.data.categories.length > 0) return;
    this.loadHomeData();
  },

  async loadHomeData() {
    try {
      const [categoriesRes, announcementsRes, activitiesRes, neighborsRes, servicesRes] = await Promise.all([
        api.getCategories(),
        api.getAnnouncementList({ pageNum: 1, pageSize: 3 }),
        api.getActivityList({ pageNum: 1, pageSize: 5 }),
        api.getPostList({ pageNum: 1, pageSize: 3 }),
        api.getServiceList({ pageNum: 1, pageSize: 5, isHot: true })
      ]);

      const categories = (categoriesRes.data || []).map((c, i) => {
        const colors = ['#E8F8F5', '#FFF3E0', '#E8F5E9', '#FFEBEE', '#E3F2FD', '#FFF9C4', '#F3E5F5', '#ECEFF1'];
        const icons = ['🧹', '🔧', '🥬', '🏥', '📚', '💰', '🏪', '➕'];
        return { ...c, bgColor: colors[i % colors.length], icon: icons[i % icons.length] };
      });

      const catImages = {
        '家政服务': '/assets/images/service-cleaning.jpg',
        '维修服务': '/assets/images/service-repair.jpg',
        '生鲜配送': '/assets/images/service-fresh.jpg',
        '医疗服务': '/assets/images/service-medical.jpg',
        '教育培训': '/assets/images/service-edu.jpg',
        '便民服务': '/assets/images/service-convenience.jpg',
        '物业服务': '/assets/images/service-repair.jpg'
      };

      const getImg = (s) => (s.coverImage || s.images) || Object.entries(catImages).find(([k]) => (s.categoryName || '').includes(k))?.[1] || '/assets/images/service-default.jpg';

      const hotServices = (servicesRes.data?.records || []).slice(0, 5).map(s => ({ ...s, displayImage: getImg(s) }));

      // 格式化活动数据
      const formatActivity = (a) => {
        const statusMap = { 0: '报名中', 1: '即将开始', 2: '进行中', 3: '已结束' };
        const statusClassMap = { 0: 'signup', 1: 'upcoming', 2: 'ongoing', 3: 'ended' };
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
          statusText: statusMap[a.status] || '未知',
          statusClass: statusClassMap[a.status] || '',
          imagesArray: imagesArray,
          displayImage: imagesArray[0] || '',
          startTimeStr: a.startTime ? (a.startTime.length > 16 ? a.startTime.substring(5, 16).replace('T', ' ') : a.startTime) : '',
          endTimeStr: a.endTime ? (a.endTime.length > 16 ? a.endTime.substring(5, 16).replace('T', ' ') : a.endTime) : '',
          contentPreview: a.content ? (a.content.length > 60 ? a.content.substring(0, 60) + '...' : a.content) : '',
          currentPeople: a.currentPeople || a.currentParticipants || 0,
          maxPeople: a.maxPeople || a.maxParticipants || 0
        };
      };

      this.setData({
        categories,
        hotServices,
        announcements: (announcementsRes.data?.records || []).map(a => ({
          ...a,
          createTime: a.createTime ? a.createTime.substring(5, 10) : ''
        })),
        activities: (activitiesRes.data?.records || []).map(formatActivity),
        neighbors: (neighborsRes.data?.records || []).map(item => {
          if (item.images) {
            item.imagesArray = item.images.split(',');
          }
          return item;
        })
      });
    } catch (err) {
      console.error('加载数据失败', err);
    }
  },

  goToSearch() {
    wx.navigateTo({ url: '/pages/service/list' });
  },

  goToServiceList() {
    wx.navigateTo({ url: '/pages/service/list' });
  },

  goToServiceDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/service/detail?id=${id}` });
  },

  goToCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/service/list?categoryId=${categoryId}` });
  },

  goToAnnouncement() {
    wx.navigateTo({ url: '/pages/announcement/list' });
  },

  goToAnnouncementDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/announcement/detail?id=${id}` });
  },

  goToActivity() {
    wx.navigateTo({ url: '/pages/activity/list' });
  },

  goToActivityDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/activity/detail?id=${id}` });
  },

  goToNeighborhood() {
    wx.switchTab({ url: '/pages/neighborhood/list' });
  },

  goToNeighborhoodDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/neighborhood/detail?id=${id}` });
  }
});
