const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    service: null,
    serviceImages: [],
    merchantAvatar: '/assets/icons/mine.png',
    isFavorite: false,
    comments: [],
    commentCount: 0
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ serviceId: options.id });
      this.loadServiceDetail(options.id);
      this.loadComments(options.id);
    }
  },

  async loadServiceDetail(id) {
    try {
      const res = await api.getServiceDetail(id);
      const service = res.data;

      let images = [];
      if (service.images) {
        images = service.images.split(',').filter(img => img.trim());
      } else if (service.coverImage) {
        images = [service.coverImage];
      }

      this.setData({
        service,
        serviceImages: images,
        isFavorite: service.isFavorite || false
      });

      wx.setNavigationBarTitle({ title: service.name || '服务详情' });
    } catch (err) {
      console.error('加载服务详情失败', err);
      wx.showToast({ title: '加载失败', icon: 'none' });
    }
  },

  async loadComments(serviceId) {
    try {
      const res = await api.getServiceList({ serviceId, pageNum: 1, pageSize: 5 });
    } catch (err) {
      console.error('加载评价失败', err);
    }
  },

  toggleFavorite() {
    if (!app.checkLogin()) return;
    const method = this.data.isFavorite ? 'deleteFavorite' : 'addFavorite';
    api[method] ? api[method]({ serviceId: this.data.serviceId }).then(() => {
      wx.showToast({ title: this.data.isFavorite ? '已取消收藏' : '收藏成功', icon: 'success' });
      this.setData({ isFavorite: !this.data.isFavorite });
    }).catch(() => {
      wx.showToast({ title: '操作失败', icon: 'none' });
    }) : wx.showToast({ title: this.data.isFavorite ? '已取消收藏' : '收藏成功', icon: 'success' });
    this.setData({ isFavorite: !this.data.isFavorite });
  },

  consultMerchant() {
    if (!app.checkLogin()) return;
    const service = this.data.service;
    wx.showModal({
      title: '联系商户',
      content: `确定要拨打商户电话吗？\n${service.merchantPhone || '暂无联系方式'}`, // eslint-disable-line
      confirmText: '拨打',
      success: (res) => {
        if (res.confirm && service.merchantPhone) {
          wx.makePhoneCall({ phoneNumber: service.merchantPhone });
        }
      }
    });
  },

  previewImages(e) {
    const urls = this.data.serviceImages;
    const current = e.currentTarget.dataset.url;
    wx.previewImage({ urls, current });
  },

  createOrder() {
    if (!app.checkLogin()) return;

    const service = this.data.service;
    wx.navigateTo({
      url: `/pages/order/create?serviceId=${service.id}&serviceName=${encodeURIComponent(service.name)}&price=${service.price}&merchantId=${service.merchantId}`
    });
  }
});
