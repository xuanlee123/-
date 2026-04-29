// pages/order/detail.js
const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    orderId: '',
    order: null,
    statusText: ['待付款', '待接单', '服务中', '已完成', '已取消', '退款中', '已退款', '投诉中'],
    statusClass: ['pending', 'pending', 'processing', 'completed', 'cancelled', 'warning', 'cancelled', 'danger']
  },

  onLoad(options) {
    const id = options.id || options.orderId;
    if (id) {
      this.setData({ orderId: id });
      this.loadOrderDetail(id);
    }
  },

  async loadOrderDetail(id) {
    wx.showLoading({ title: '加载中...' });
    try {
      const res = await api.getOrderDetail(id);
      const order = res.data;
      this.setData({ order });
      wx.hideLoading();
    } catch (err) {
      wx.hideLoading();
      console.error('加载订单详情失败', err);
      wx.showToast({ title: '加载失败', icon: 'none' });
    }
  },

  cancelOrder() {
    const order = this.data.order;
    wx.showModal({
      title: '提示',
      content: '确定要取消该订单吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            wx.showLoading({ title: '取消中...' });
            await api.cancelOrder(this.data.orderId);
            wx.hideLoading();
            wx.showToast({ title: '取消成功', icon: 'success' });
            setTimeout(() => {
              wx.navigateBack();
            }, 1500);
          } catch (err) {
            wx.hideLoading();
            console.error('取消订单失败', err);
          }
        }
      }
    });
  },

  payOrder() {
    const order = this.data.order;
    wx.navigateTo({
      url: `/pages/order/pay?orderId=${this.data.orderId}&amount=${order.amount || order.price}`
    });
  },

  goToService() {
    const order = this.data.order;
    if (order.serviceId) {
      wx.navigateTo({ url: `/pages/service/detail?id=${order.serviceId}` });
    }
  },

  goToEvaluate() {
    const order = this.data.order;
    wx.navigateTo({
      url: `/pages/order/evaluate?orderId=${order.id}&serviceName=${encodeURIComponent(order.serviceName || '')}`
    });
  }
});
