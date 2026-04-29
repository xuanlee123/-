const api = require('../../api/index.js');

Page({
  data: {
    categories: [],
    services: [],
    categoryId: 0,
    keyword: '',
    pageNum: 1,
    pageSize: 10,
    loading: false,
    hasMore: true
  },

  onLoad(options) {
    if (options.categoryId) {
      this.setData({ categoryId: parseInt(options.categoryId) });
    }
    this.loadCategories();
    this.loadServices();
  },

  // 分类对应的默认图片（key与数据库category.name保持一致）
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
    // 优先使用服务自己的图片字段 (后端返回 images，前端需兼容 coverImage)
    if (service.coverImage) return service.coverImage;
    if (service.images) return service.images;
    const name = service.categoryName || '';
    for (const [key, val] of Object.entries(this.categoryImages)) {
      if (name.includes(key)) return val;
    }
    return '/assets/images/service-default.jpg';
  },

  async loadCategories() {
    try {
      const res = await api.getCategories();
      this.setData({ categories: res.data || [] });
    } catch (err) {
      console.error('加载分类失败', err);
    }
  },

  async loadServices(reset = false) {
    if (this.data.loading || (!reset && !this.data.hasMore)) return;
    
    this.setData({ loading: true });
    
    try {
      const params = {
        pageNum: reset ? 1 : this.data.pageNum,
        pageSize: this.data.pageSize,
        keyword: this.data.keyword
      };
      
      if (this.data.categoryId > 0) {
        params.categoryId = this.data.categoryId;
      }
      
      const res = await api.getServiceList(params);
      const data = res.data;
      
      let services = reset ? [] : this.data.services;
      if (data && data.records) {
        const processed = data.records.map(s => ({
          ...s,
          displayImage: (s.coverImage || s.images) || this.getCategoryImage(s)
        }));
        services = reset ? processed : [...services, ...processed];
      }
      
      this.setData({
        services,
        pageNum: reset ? 2 : this.data.pageNum + 1,
        hasMore: data && data.records && data.records.length === this.data.pageSize,
        loading: false
      });
    } catch (err) {
      console.error('加载服务失败', err);
      this.setData({ loading: false });
    }
  },

  onSearch(e) {
    this.setData({ keyword: e.detail.value });
    this.loadServices(true);
  },

  onSearchInput(e) {
    this.setData({ keyword: e.detail.value });
  },

  switchCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    this.setData({ categoryId });
    this.loadServices(true);
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/service/detail?id=${id}`
    });
  },

  onReachBottom() {
    this.loadServices();
  },

  onPullDownRefresh() {
    this.loadServices(true).then(() => {
      wx.stopPullDownRefresh();
    });
  }
});
