// pages/merchant/order.js - 商户订单管理
const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    currentTab: 'all',
    orders: [],
    counts: { all: 0, pending: 0, processing: 0, completed: 0 },
    pageNum: 1,
    pageSize: 10,
    hasMore: true,
    loading: false
  },

  onLoad(options) {
    if (app.globalData.role !== 2) {
      wx.showToast({ title: '无权访问', icon: 'none' });
      setTimeout(() => {
        wx.reLaunch({ url: '/pages/login/login' });
      }, 1500);
      return;
    }
    wx.hideHomeButton();
    if (options.status) {
      this.setData({ currentTab: options.status });
    }
    this.loadOrders();
    this.loadCounts();
  },

  onShow() {
    if (app.globalData.role !== 2) return;
    wx.hideHomeButton();
    this.loadOrders();
    this.loadCounts();
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    switch (tab) {
      case 'index':
        wx.redirectTo({ url: '/pages/merchant/index' });
        break;
      case 'order':
        break;
      case 'mine':
        wx.redirectTo({ url: '/pages/merchant/mine' });
        break;
    }
  },

  switchStatus(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ currentTab: tab, orders: [], pageNum: 1, hasMore: true });
    this.loadOrders();
  },

  async loadOrders() {
    if (this.data.loading) return;
    this.setData({ loading: true });
    try {
      const res = await api.getMerchantOrders({
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize,
        status: this.data.currentTab === 'all' ? '' : this.data.currentTab
      });
      if (res.code === 200) {
        const list = res.data.records || [];
        const orders = this.data.pageNum === 1 ? list : this.data.orders.concat(list);
        this.setData({ orders, hasMore: list.length >= this.data.pageSize, loading: false });
      }
    } catch (err) {
      console.error('加载订单失败', err);
      this.setData({ loading: false });
    }
  },

  viewOrderDetail(e) {
    const id = e.currentTarget.dataset.id;
    console.log('点击订单, ID:', id);
    console.log('当前数据:', e.currentTarget.dataset);
    wx.navigateTo({
      url: `/pages/order/detail?id=${id}`
    });
  },

  async loadCounts() {
    try {
      const res = await api.getMerchantOrderCounts();
      if (res.code === 200) {
        this.setData({ counts: res.data });
      }
    } catch (err) {
      console.error('加载订单数量失败', err);
    }
  },

  loadMore() {
    if (!this.data.hasMore) return;
    this.setData({ pageNum: this.data.pageNum + 1 });
    this.loadOrders();
  },

  async acceptOrder(e) {
    const id = e.currentTarget.dataset.id;
    console.log('接单订单ID:', id);
    try {
      const res = await api.acceptOrder(id);
      console.log('接单响应:', res);
      if (res.code === 200) {
        wx.showToast({ title: '接单成功', icon: 'success' });
        this.loadOrders();
      } else {
        wx.showToast({ title: res.msg || '接单失败', icon: 'none' });
      }
    } catch (err) {
      console.error('接单失败', err);
      wx.showToast({ title: err.msg || err.message || '操作失败', icon: 'none' });
    }
  },

  async rejectOrder(e) {
    const id = e.currentTarget.dataset.id;
    console.log('拒单订单ID:', id);
    wx.showModal({
      title: '提示',
      content: '确定要拒单吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            const result = await api.rejectOrder(id);
            console.log('拒单响应:', result);
            if (result.code === 200) {
              wx.showToast({ title: '已拒单', icon: 'success' });
              this.loadOrders();
            } else {
              wx.showToast({ title: result.msg || '拒单失败', icon: 'none' });
            }
          } catch (err) {
            console.error('拒单失败', err);
            wx.showToast({ title: err.msg || err.message || '操作失败', icon: 'none' });
          }
        }
      }
    });
  },

  async completeOrder(e) {
    const id = e.currentTarget.dataset.id;
    console.log('完成订单ID:', id);
    try {
      const res = await api.completeOrder(id);
      console.log('完成响应:', res);
      if (res.code === 200) {
        wx.showToast({ title: '已完成', icon: 'success' });
        this.loadOrders();
      } else {
        wx.showToast({ title: res.msg || '操作失败', icon: 'none' });
      }
    } catch (err) {
      console.error('完成失败', err);
      wx.showToast({ title: err.msg || err.message || '操作失败', icon: 'none' });
    }
  },

  loadMockData() {
    const mockOrders = [
      { id: 1, serviceName: '日常保洁服务', amount: '120.00', userName: '张先生', phone: '138****8000', address: '阳光社区1号楼', createTime: '2024-01-20 14:00', status: 1 },
      { id: 2, serviceName: '空调清洗保养', amount: '180.00', userName: '李女士', phone: '139****9000', address: '月亮湾小区5号楼', createTime: '2024-01-20 10:00', status: 2 }
    ];
    this.setData({ orders: mockOrders, hasMore: false });
  }
});
