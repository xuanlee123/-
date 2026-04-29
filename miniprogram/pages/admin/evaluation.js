// pages/admin/evaluation.js - 管理员评价监管页面
const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    evaluations: [],
    stats: {
      totalCount: 0,
      pendingCount: 0,
      negativeCount: 0,
      averageScore: '0.0'
    },
    tabs: ['全部', '待审核', '已通过', '已驳回'],
    currentTab: 0,
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
    if (options.tab) {
      this.setData({ currentTab: parseInt(options.tab) });
    }
    this.loadStats();
    this.loadEvaluations();
  },

  onShow() {
    if (app.globalData.role !== 3) return;
    this.refreshData();
  },

  refreshData() {
    this.setData({ pageNum: 1, evaluations: [], hasMore: true });
    this.loadStats();
    this.loadEvaluations();
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
        wx.redirectTo({ url: '/pages/admin/order' });
        break;
      case 'mine':
        wx.redirectTo({ url: '/pages/admin/mine' });
        break;
    }
  },

  switchFilter(e) {
    const idx = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: idx,
      evaluations: [],
      pageNum: 1,
      hasMore: true
    });
    this.loadEvaluations();
  },

  async loadStats() {
    try {
      const res = await api.getAdminEvaluationStats();
      if (res.code === 200) {
        this.setData({ stats: res.data || {} });
      }
    } catch (err) {
      console.error('加载统计数据失败', err);
    }
  },

  async loadEvaluations() {
    if (this.data.loading) return;
    this.setData({ loading: true });

    const params = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
    };
    
    if (this.data.currentTab === 1) {
      params.status = 0;
    } else if (this.data.currentTab === 2) {
      params.status = 1;
    } else if (this.data.currentTab === 3) {
      params.status = 2;
    }

    try {
      const res = await api.getAdminEvaluationList(params);

      if (res.code === 200) {
        const list = res.data.records || [];
        const evaluations = this.data.pageNum === 1 ? list : this.data.evaluations.concat(list);

        this.setData({
          evaluations: this.formatEvaluations(evaluations),
          hasMore: list.length >= this.data.pageSize,
          loading: false
        });
      } else {
        this.setData({ loading: false });
      }
    } catch (err) {
      console.error('加载评价列表失败', err);
      this.setData({ loading: false });
    }
  },

  formatEvaluations(evaluations) {
    const statusMap = {
      0: { text: '待审核', class: 'pending' },
      1: { text: '已通过', class: 'passed' },
      2: { text: '已驳回', class: 'rejected' }
    };

    return evaluations.map(item => {
      const statusInfo = statusMap[item.status] || { text: '未知', class: 'pending' };
      const avatarText = item.userName ? item.userName.charAt(0).toUpperCase() : 'U';
      const imageList = item.images ? item.images.split(',').filter(img => img) : [];

      return {
        ...item,
        statusText: statusInfo.text,
        statusClass: statusInfo.class,
        userAvatarText: avatarText,
        imageList: imageList,
        userName: item.userName || '用户' + item.userId,
        merchantName: item.merchantName || '商户' + item.merchantId,
        orderNo: item.orderNo || 'ORD' + item.orderId
      };
    });
  },

  loadMore() {
    if (!this.data.hasMore) return;
    this.setData({ pageNum: this.data.pageNum + 1 });
    this.loadEvaluations();
  },

  previewImage(e) {
    const images = e.currentTarget.dataset.images;
    const current = e.currentTarget.dataset.current;
    wx.previewImage({
      current: current,
      urls: images
    });
  },

  passEvaluation(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定通过该评价审核？',
      success: async (res) => {
        if (res.confirm) {
          try {
            const result = await api.auditEvaluation(id, 1, '审核通过');
            if (result.code === 200) {
              wx.showToast({ title: '审核通过', icon: 'success' });
              this.refreshData();
            } else {
              wx.showToast({ title: result.msg || '操作失败', icon: 'none' });
            }
          } catch (err) {
            wx.showToast({ title: '操作失败', icon: 'none' });
          }
        }
      }
    });
  },

  rejectEvaluation(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '驳回评价',
      content: '请输入驳回原因',
      editable: true,
      placeholderText: '请输入驳回原因',
      success: async (res) => {
        if (res.confirm && res.content) {
          try {
            const result = await api.auditEvaluation(id, 2, res.content);
            if (result.code === 200) {
              wx.showToast({ title: '已驳回', icon: 'success' });
              this.refreshData();
            } else {
              wx.showToast({ title: result.msg || '操作失败', icon: 'none' });
            }
          } catch (err) {
            wx.showToast({ title: '操作失败', icon: 'none' });
          }
        } else if (res.confirm && !res.content) {
          wx.showToast({ title: '请输入驳回原因', icon: 'none' });
        }
      }
    });
  }
});
