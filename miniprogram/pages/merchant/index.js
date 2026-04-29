// pages/merchant/index.js
const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    active: 'index',
    categories: [],
    hotServices: [],
    announcements: [],
    activities: [],
    merchantId: null
  },

  onLoad() {
    if (app.globalData.role !== 2) {
      wx.showToast({ title: '无权访问', icon: 'none' });
      setTimeout(() => {
        wx.reLaunch({ url: '/pages/login/login' });
      }, 1500);
      return;
    }
    wx.hideHomeButton();
    this.loadMerchantInfo();
  },

  async loadMerchantInfo() {
    try {
      const res = await api.getMerchantInfo();
      if (res.code === 200 && res.data) {
        this.setData({ merchantId: res.data.id });
        this.loadHomeData();
      }
    } catch (err) {
      console.error('获取商户信息失败', err);
      wx.showToast({ title: '获取商户信息失败', icon: 'none' });
    }
  },

  onShow() {
    if (app.globalData.role !== 2) return;
    wx.hideHomeButton();
    if (this.data.categories.length === 0 && this.data.merchantId) {
      this.loadHomeData();
    }
  },

  async loadHomeData() {
    try {
      const [categoriesRes, announcementsRes, activitiesRes, servicesRes] = await Promise.all([
        api.getCategories(),
        api.getAnnouncementList({ pageNum: 1, pageSize: 3 }),
        api.getActivityList({ pageNum: 1, pageSize: 5 }),
        api.getServiceList({ pageNum: 1, pageSize: 5, merchantId: this.data.merchantId })
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

      this.setData({
        categories,
        hotServices,
        announcements: (announcementsRes.data?.records || []),
        activities: (activitiesRes.data?.records || [])
      });
    } catch (err) {
      console.error('加载数据失败', err);
    }
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

  goToSearch() {
    wx.navigateTo({ url: '/pages/service/list' });
  },

  goToServiceList() {
    wx.navigateTo({ url: '/pages/service/list' });
  }
});
