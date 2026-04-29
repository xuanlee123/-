const api = require('../../api/index.js');

Page({
  data: {
    orders: [],
    status: null,
    pageNum: 1,
    pageSize: 10,
    loading: false,
    hasMore: true,
    statusText: ['待付款', '待接单', '服务中', '已完成', '已取消', '退款中', '已退款', '投诉中'],
    statusClass: ['pending', 'pending', 'processing', 'success', 'cancelled', 'warning', 'cancelled', 'danger']
  },

  onLoad(options) {
    if (options.status) {
      this.setData({ status: parseInt(options.status) });
    }
    this.loadOrders();
  },

  onShow() {
    this.loadOrders(true);
  },

  async loadOrders(reset = false) {
    if (this.data.loading || (!reset && !this.data.hasMore)) return;
    
    this.setData({ loading: true });
    
    try {
      const params = {
        pageNum: reset ? 1 : this.data.pageNum,
        pageSize: this.data.pageSize
      };
      
      if (this.data.status !== null) {
        params.status = this.data.status;
      }
      
      const res = await api.getUserOrders(params);
      const data = res.data;
      
      let orders = reset ? [] : this.data.orders;
      if (data && data.records) {
        orders = reset ? data.records : [...orders, ...data.records];
      }
      
      this.setData({
        orders,
        pageNum: reset ? 2 : this.data.pageNum + 1,
        hasMore: data && data.records && data.records.length === this.data.pageSize,
        loading: false
      });
    } catch (err) {
      console.error('加载订单失败', err);
      this.setData({ loading: false });
    }
  },

  switchTab(e) {
    const status = e.currentTarget.dataset.status;
    this.setData({ 
      status: status === 'null' ? null : parseInt(status),
      orders: [],
      pageNum: 1,
      hasMore: true
    });
    this.loadOrders(true);
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/order/detail?id=${id}`
    });
  },

  cancelOrder(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要取消该订单吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            await api.cancelOrder(id);
            wx.showToast({ title: '取消成功', icon: 'success' });
            this.loadOrders(true);
          } catch (err) {
            console.error('取消订单失败', err);
          }
        }
      }
    });
  },

  payOrder(e) {
    const id = e.currentTarget.dataset.id;
    const amount = e.currentTarget.dataset.amount;
    wx.navigateTo({
      url: `/pages/order/pay?orderId=${id}&amount=${amount}`
    });
  },

  evaluateOrder(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/order/evaluate?orderId=${id}`
    });
  },

  stopPropagation() {},

  goToService() {
    wx.navigateTo({ url: '/pages/service/list' });
  },

  onReachBottom() {
    this.loadOrders();
  }
});
