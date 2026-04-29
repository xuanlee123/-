// pages/order/evaluate.js
const api = require('../../api/index.js');

Page({
  data: {
    orderId: '',
    merchantId: '',
    merchantName: '商户',
    serviceName: '服务',
    score: 5,
    content: '',
    images: [],
    scoreText: '非常满意',
    submitting: false
  },

  scoreTexts: ['', '很差', '较差', '一般', '满意', '非常满意'],

  onLoad(options) {
    const { orderId, serviceName } = options;
    this.setData({
      orderId: orderId,
      serviceName: decodeURIComponent(serviceName || '服务')
    });
    this.loadOrderDetail(orderId);
  },

  async loadOrderDetail(orderId) {
    wx.showLoading({ title: '加载中...' });
    try {
      const res = await api.getOrderDetail(orderId);
      if (res.code === 200 && res.data) {
        this.setData({
          merchantId: res.data.merchantId,
          merchantName: res.data.merchantName || '商户'
        });
      }
      wx.hideLoading();
    } catch (err) {
      wx.hideLoading();
      console.error('加载订单详情失败', err);
      wx.showToast({ title: '加载失败', icon: 'none' });
    }
  },

  setScore(e) {
    const score = parseInt(e.currentTarget.dataset.score);
    this.setData({
      score: score,
      scoreText: this.scoreTexts[score]
    });
  },

  onContentInput(e) {
    this.setData({ content: e.detail.value });
  },

  chooseImage() {
    if (this.data.images.length >= 3) {
      wx.showToast({ title: '最多上传3张图片', icon: 'none' });
      return;
    }
    wx.chooseImage({
      count: 3 - this.data.images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          images: [...this.data.images, ...res.tempFilePaths]
        });
      }
    });
  },

  deleteImage(e) {
    const index = e.currentTarget.dataset.index;
    const images = [...this.data.images];
    images.splice(index, 1);
    this.setData({ images });
  },

  previewImage(e) {
    const index = e.currentTarget.dataset.index;
    wx.previewImage({
      urls: this.data.images,
      current: this.data.images[index]
    });
  },

  async submitEvaluation() {
    if (this.data.submitting) return;

    if (this.data.score === 0) {
      wx.showToast({ title: '请选择评分', icon: 'none' });
      return;
    }

    this.setData({ submitting: true });

    try {
      const data = {
        orderId: this.data.orderId,
        merchantId: this.data.merchantId,
        score: this.data.score,
        content: this.data.content,
        images: this.data.images.join(',')
      };

      const res = await api.addEvaluation(data);
      if (res.code === 200) {
        wx.showToast({ title: '评价成功', icon: 'success' });
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      } else {
        wx.showToast({ title: res.msg || '评价失败', icon: 'none' });
        this.setData({ submitting: false });
      }
    } catch (err) {
      console.error('提交评价失败', err);
      wx.showToast({ title: err.msg || '评价失败', icon: 'none' });
      this.setData({ submitting: false });
    }
  }
});
