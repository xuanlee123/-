// pages/order/pay.js - 订单支付
const api = require('../../api/index.js');

Page({
  data: {
    orderId: '',
    amount: 0,
    paying: false
  },

  onLoad(options) {
    const { orderId, amount } = options;
    this.setData({
      orderId,
      amount: parseFloat(amount)
    });
  },

  async doPay() {
    if (this.data.paying) return;
    this.setData({ paying: true });

    try {
      await api.payOrder(this.data.orderId);
      wx.showModal({
        title: '支付成功',
        content: '您的订单已支付成功，商户将尽快为您服务！',
        showCancel: false,
        success: () => {
          wx.switchTab({
            url: '/pages/order/list'
          });
        }
      });
    } catch (err) {
      wx.showToast({ title: '支付失败', icon: 'none' });
    } finally {
      this.setData({ paying: false });
    }
  }
});
