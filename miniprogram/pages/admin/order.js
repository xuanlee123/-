// pages/admin/order.js - 管理员订单管理页面
const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    currentTab: 'all',
    orders: [],
    counts: {
      all: 0,
      pending: 0,
      paid: 0,
      processing: 0
    },
    pageNum: 1,
    pageSize: 10,
    hasMore: true,
    loading: false
  },

  onLoad(options) {
    if (app.globalData.role !== 3) {
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
    if (app.globalData.role !== 3) return;
    this.loadOrders();
    this.loadCounts();
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    switch (tab) {
      case 'index':
        wx.redirectTo({ url: '/pages/admin/index' });
        break;
      case 'data':
        wx.redirectTo({ url: '/pages/admin/data' });
        break;
      case 'order':
        break;
      case 'evaluation':
        wx.redirectTo({ url: '/pages/admin/evaluation' });
        break;
      case 'mine':
        wx.redirectTo({ url: '/pages/admin/mine' });
        break;
    }
  },

  switchStatus(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      currentTab: tab,
      orders: [],
      pageNum: 1,
      hasMore: true
    });
    this.loadOrders();
  },

  async loadOrders() {
    if (this.data.loading) return;
    this.setData({ loading: true });

    const params = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
    };
    
    if (this.data.currentTab !== 'all') {
      const statusMap = {
        'pending': 0,
        'paid': 1,
        'processing': 2,
        'completed': 3,
        'cancelled': 4,
        'refunding': 5,
        'refunded': 6,
        'complaint': 7
      };
      params.status = statusMap[this.data.currentTab] ?? this.data.currentTab;
    }

    try {
      const res = await api.getAdminOrders(params);

      if (res.code === 200) {
        const list = res.data.records || [];
        const orders = this.data.pageNum === 1 ? list : this.data.orders.concat(list);
        
        this.setData({
          orders: this.formatOrders(orders),
          hasMore: list.length >= this.data.pageSize,
          loading: false
        });
      }
    } catch (err) {
      console.error('加载订单失败', err);
      this.loadMockData();
      this.setData({ loading: false });
    }
  },

  async loadCounts() {
    try {
      const res = await api.getAdminOrderCounts();
      if (res.code === 200) {
        this.setData({ counts: res.data });
      }
    } catch (err) {
      console.error('加载订单数量失败', err);
    }
  },

  formatOrders(orders) {
    const statusMap = {
      0: { text: '待付款', class: 'pending' },
      1: { text: '待接单', class: 'paid' },
      2: { text: '服务中', class: 'processing' },
      3: { text: '已完成', class: 'completed' },
      4: { text: '已取消', class: 'cancelled' },
      5: { text: '退款中', class: 'pending' },
      6: { text: '已退款', class: 'cancelled' },
      7: { text: '投诉中', class: 'pending' }
    };

    return orders.map(item => {
      const statusInfo = statusMap[item.status] || { text: '未知', class: 'pending' };
      const address = [item.addressRegion, item.addressDetail].filter(Boolean).join('') || '无地址';
      const phone = item.addressPhone || item.phone || '无';
      const merchantName = item.merchantName || (item.merchantId != null ? '商户#' + item.merchantId : '未知商户');
      const serviceName = item.serviceName || (item.serviceId != null ? '服务#' + item.serviceId : '未知服务');
      const userName = item.userName || (item.userId != null ? '用户#' + item.userId : '未知用户');
      
      return {
        ...item,
        statusText: statusInfo.text,
        statusClass: statusInfo.class,
        merchantName: merchantName,
        serviceName: serviceName,
        description: item.demand || '',
        amount: item.price || item.amount || '0.00',
        userName: userName,
        phone: phone,
        address: address,
        createTime: item.createTime ? this.formatTime(item.createTime) : '',
        appointmentTime: item.serviceTime ? this.formatTime(item.serviceTime) : ''
      };
    });
  },

  formatTime(time) {
    if (!time) return '';
    if (typeof time === 'string') return time;
    const d = new Date(time);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hour = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    const sec = String(d.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
  },

  loadMore() {
    if (!this.data.hasMore) return;
    this.setData({ pageNum: this.data.pageNum + 1 });
    this.loadOrders();
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
            const result = await api.cancelOrder(id);
            if (result.code === 200) {
              wx.showToast({ title: '订单已取消', icon: 'success' });
              this.loadOrders();
            }
          } catch (err) {
            wx.showToast({ title: '操作失败', icon: 'none' });
          }
        }
      }
    });
  },

  confirmPayment(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确认已收到付款？',
      success: async (res) => {
        if (res.confirm) {
          try {
            const result = await api.confirmAdminPayment(id);
            if (result.code === 200) {
              wx.showToast({ title: '确认成功', icon: 'success' });
              this.loadOrders();
            }
          } catch (err) {
            wx.showToast({ title: '操作失败', icon: 'none' });
          }
        }
      }
    });
  },

  loadMockData() {
    const mockOrders = [
      {
        id: 1,
        merchantName: '便民家政服务',
        serviceName: '日常保洁服务',
        description: '专业家政保洁服务',
        amount: '120.00',
        userName: '张先生',
        phone: '138****8000',
        address: '阳光社区1号楼',
        createTime: '2024-01-20 14:00',
        appointmentTime: '2024-01-21 10:00',
        status: 1
      },
      {
        id: 2,
        merchantName: '老王家电维修',
        serviceName: '空调清洗保养',
        description: '专业空调清洗服务',
        amount: '180.00',
        userName: '李女士',
        phone: '139****9000',
        address: '月亮湾小区5号楼',
        createTime: '2024-01-20 10:00',
        appointmentTime: '2024-01-21 14:00',
        status: 2
      }
    ];
    this.setData({
      orders: this.formatOrders(mockOrders),
      hasMore: false
    });
  }
});
