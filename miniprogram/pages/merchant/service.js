// pages/merchant/service.js
const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    services: [],
    pageNum: 1,
    pageSize: 20,
    loading: false,
    hasMore: true,
    merchantId: null,
    isLoaded: false
  },

  categoryImages: {
    '家政服务': '/assets/images/service-cleaning.jpg',
    '维修服务': '/assets/images/service-repair.jpg',
    '生鲜配送': '/assets/images/service-fresh.jpg',
    '医疗服务': '/assets/images/service-medical.jpg',
    '教育培训': '/assets/images/service-edu.jpg',
    '便民服务': '/assets/images/service-convenience.jpg',
    '物业服务': '/assets/images/service-repair.jpg'
  },

  getCategoryImage(service) {
    if (service.coverImage) return service.coverImage;
    if (service.images) return service.images;
    const name = service.categoryName || '';
    for (const [key, val] of Object.entries(this.categoryImages)) {
      if (name.includes(key)) return val;
    }
    return '/assets/images/service-default.jpg';
  },

  onLoad() {
    this.loadMerchantInfo();
  },

  async loadMerchantInfo() {
    try {
      const res = await api.getMerchantInfo();
      if (res.code === 200 && res.data) {
        this.setData({ merchantId: res.data.id });
        this.loadServices(true);
      }
    } catch (err) {
      console.error('获取商户信息失败', err);
      wx.showToast({ title: '获取商户信息失败', icon: 'none' });
    }
  },

  onShow() {
    if (!this.data.merchantId) return;
    // 刷新数据（新增/编辑/删除后返回时）
    this.loadServices(true);
  },

  async loadServices(reset = false) {
    if (this.data.loading) return;
    if (!this.data.merchantId) return;

    this.setData({ loading: true });
    try {
      const params = {
        pageNum: reset ? 1 : this.data.pageNum,
        pageSize: this.data.pageSize,
        merchantId: this.data.merchantId
      };
      const res = await api.getServiceList(params);
      const records = res.data?.records || [];
      const services = records.map(s => ({
        ...s,
        displayImage: this.getCategoryImage(s)
      }));
      this.setData({
        services: services,
        pageNum: 2,
        hasMore: records.length >= this.data.pageSize,
        loading: false,
        isLoaded: true
      });
    } catch (err) {
      console.error('加载服务失败', err);
      this.setData({ loading: false });
    }
  },

  goToAdd() {
    wx.navigateTo({ url: '/pages/merchant/service-add' });
  },

  toggleStatus(e) {
    const id = e.currentTarget.dataset.id;
    const service = this.data.services.find(s => s.id === id);
    if (!service) return;
    const newStatus = service.status === 1 ? 0 : 1;
    api.updateService({ id, status: newStatus }).then(() => {
      wx.showToast({ title: newStatus ? '上架成功' : '下架成功', icon: 'success' });
      const services = this.data.services.map(s => s.id === id ? { ...s, status: newStatus } : s);
      this.setData({ services });
    }).catch(() => {
      wx.showToast({ title: '操作失败', icon: 'none' });
    });
  },

  editService(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/merchant/service-add?id=${id}` });
  },

  onReachBottom() {
    this.loadServices();
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    const routes = {
      index: '/pages/merchant/index',
      order: '/pages/merchant/order',
      service: '/pages/merchant/service',
      mine: '/pages/merchant/mine'
    };
    if (routes[tab]) {
      wx.switchTab({ url: routes[tab] });
    }
  }
});
