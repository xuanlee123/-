// pages/order/create.js
const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    serviceId: '',
    serviceName: '',
    price: 0,
    merchantId: '',
    reserveDate: '',
    reserveTime: '',
    remark: '',
    selectedAddress: null
  },

  onLoad(options) {
    const { serviceId, serviceName, price, merchantId } = options;
    this.setData({
      serviceId,
      serviceName: decodeURIComponent(serviceName),
      price: parseFloat(price),
      merchantId
    });
    this.setDefaultDateTime();
  },

  onShow() {
    const address = this.data.selectedAddress;
    if (address && address._updated) {
      this.setData({ selectedAddress: null });
    }
  },

  setDefaultDateTime() {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    const date = now.toISOString().split('T')[0];
    this.setData({ reserveDate: date, reserveTime: '10:00' });
  },

  onDateChange(e) {
    this.setData({ reserveDate: e.detail.value });
  },

  onTimeChange(e) {
    this.setData({ reserveTime: e.detail.value });
  },

  onRemarkInput(e) {
    this.setData({ remark: e.detail.value });
  },

  selectAddress() {
    wx.navigateTo({
      url: '/pages/mine/address?selectMode=1'
    });
  },

  submitOrder() {
    const { serviceId, reserveDate, reserveTime, selectedAddress } = this.data;
    if (!selectedAddress) {
      wx.showToast({ title: '请选择收货地址', icon: 'none' });
      return;
    }
    if (!reserveDate || !reserveTime) {
      wx.showToast({ title: '请选择预约时间', icon: 'none' });
      return;
    }
    wx.showModal({
      title: '确认预约',
      content: `地址：${selectedAddress.region} ${selectedAddress.detail}\n服务：${this.data.serviceName}\n时间：${reserveDate} ${reserveTime}\n金额：¥${this.data.price}`,
      confirmText: '确认下单',
      success: (res) => {
        if (res.confirm) {
          this.createOrder();
        }
      }
    });
  },

  async createOrder() {
    const { selectedAddress } = this.data;
    wx.showLoading({ title: '创建订单中...' });
    try {
      const res = await api.createOrder({
        serviceId: parseInt(this.data.serviceId),
        merchantId: parseInt(this.data.merchantId),
        serviceName: this.data.serviceName,
        serviceTime: `${this.data.reserveDate} ${this.data.reserveTime}:00`,
        demand: this.data.remark,
        price: this.data.price,
        addressId: selectedAddress.id,
        addressName: selectedAddress.name,
        addressPhone: selectedAddress.phone,
        addressRegion: selectedAddress.region,
        addressDetail: selectedAddress.detail
      });
      wx.hideLoading();
      const orderId = res.data?.id || res.data?.orderId || res.orderId || res.data;
      if (orderId) {
        wx.showToast({ title: '订单创建成功', icon: 'success' });
        setTimeout(() => {
          wx.redirectTo({
            url: `/pages/order/pay?orderId=${orderId}&amount=${this.data.price}`
          });
        }, 1500);
      }
    } catch (err) {
      wx.hideLoading();
      console.error('创建订单失败', err);
      wx.showToast({ title: '创建失败，请重试', icon: 'none' });
    }
  }
});
