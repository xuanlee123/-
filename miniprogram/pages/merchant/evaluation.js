// pages/merchant/evaluation.js
const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    currentTab: 'all',
    evaluations: [],
    stats: {},
    pageNum: 1,
    pageSize: 10,
    loading: false,
    hasMore: true,
    replyingId: null,
    replyContent: ''
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
    if (options.tab) {
      this.setData({ currentTab: options.tab });
    }
    this.loadStats();
    this.loadEvaluations(true);
  },

  onShow() {
    if (app.globalData.role !== 2) return;
    wx.hideHomeButton();
  },

  onPullDownRefresh() {
    this.loadStats();
    this.loadEvaluations(true);
    wx.stopPullDownRefresh();
  },

  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadEvaluations(false);
    }
  },

  async loadStats() {
    try {
      const res = await api.getMerchantEvaluationStats();
      if (res.code === 200) {
        this.setData({ stats: res.data });
      }
    } catch (err) {
      console.error('加载评价统计失败', err);
    }
  },

  async loadEvaluations(reset = false) {
    if (this.data.loading) return;
    this.setData({ loading: true });

    try {
      const params = {
        pageNum: reset ? 1 : this.data.pageNum,
        pageSize: this.data.pageSize
      };

      if (this.data.currentTab === 'pending') {
        params.status = 0;
      }

      const res = await api.getMerchantEvaluations(params);
      if (res.code === 200) {
        const records = (res.data?.records || []).map(item => ({
          ...item,
          imagesArray: item.images ? item.images.split(',').filter(Boolean) : []
        }));

        let newEvaluations;
        if (reset) {
          newEvaluations = records;
        } else {
          newEvaluations = [...this.data.evaluations, ...records];
        }

        // Filter for "replied" tab on client side
        if (this.data.currentTab === 'replied') {
          newEvaluations = newEvaluations.filter(e => e.merchantReply);
        }

        this.setData({
          evaluations: newEvaluations,
          pageNum: reset ? 2 : this.data.pageNum + 1,
          hasMore: records.length >= this.data.pageSize,
          loading: false
        });
      }
    } catch (err) {
      console.error('加载评价列表失败', err);
      this.setData({ loading: false });
    }
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    if (tab === this.data.currentTab) return;
    this.setData({
      currentTab: tab,
      evaluations: [],
      pageNum: 1,
      hasMore: true
    });
    this.loadEvaluations(true);
  },

  showReplyForm(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({ replyingId: id, replyContent: '' });
  },

  cancelReply() {
    this.setData({ replyingId: null, replyContent: '' });
  },

  onReplyInput(e) {
    this.setData({ replyContent: e.detail.value });
  },

  async submitReply(e) {
    const id = e.currentTarget.dataset.id;
    const content = this.data.replyContent.trim();

    if (!content) {
      wx.showToast({ title: '请输入回复内容', icon: 'none' });
      return;
    }

    try {
      const res = await api.replyEvaluation(id, content);
      if (res.code === 200) {
        wx.showToast({ title: '回复成功', icon: 'success' });
        this.setData({ replyingId: null, replyContent: '' });
        this.loadStats();
        this.loadEvaluations(true);
      } else {
        wx.showToast({ title: res.msg || '回复失败', icon: 'none' });
      }
    } catch (err) {
      console.error('回复失败', err);
      wx.showToast({ title: err.msg || '回复失败', icon: 'none' });
    }
  },

  previewImage(e) {
    const images = e.currentTarget.dataset.images;
    const current = e.currentTarget.dataset.current;
    wx.previewImage({
      urls: images,
      current: current
    });
  },

  getStars(score) {
    if (!score) return '☆☆☆☆☆';
    const full = '★'.repeat(score);
    const empty = '☆'.repeat(5 - score);
    return full + empty;
  },

  switchTabNav(e) {
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
