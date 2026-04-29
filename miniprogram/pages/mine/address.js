// pages/mine/address.js
const api = require('../../api/index.js');

Page({
  data: {
    addressList: []
  },

  onLoad(options) {
    const { selectMode } = options;
    this.setData({ selectMode: selectMode === '1' });
  },

  onShow() {
    this.loadAddressList();
  },

  async loadAddressList() {
    try {
      const res = await api.getAddressList();
      this.setData({ addressList: res.data || [] });
    } catch (err) {
      console.error('加载地址失败', err);
    }
  },

  selectAddress(e) {
    const { id } = e.currentTarget.dataset;
    const address = this.data.addressList.find(a => a.id == id);
    if (this.data.selectMode) {
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2];
      if (prevPage) {
        prevPage.setData({ selectedAddress: address });
      }
      wx.navigateBack();
    }
  },

  stopProp() {},

  async setDefault(e) {
    const { id } = e.currentTarget.dataset;
    try {
      await api.setDefaultAddress(id);
      this.loadAddressList();
      wx.showToast({ title: '设置成功', icon: 'success' });
    } catch (err) {
      console.error(err);
    }
  },

  async deleteAddress(e) {
    const { id } = e.currentTarget.dataset;
    const res = await wx.showModal({
      title: '确认删除',
      content: '确定要删除该地址吗？'
    });
    if (res.confirm) {
      try {
        await api.deleteAddress(id);
        wx.showToast({ title: '删除成功', icon: 'success' });
        this.loadAddressList();
      } catch (err) {
        console.error(err);
      }
    }
  },

  goToAddAddress() {
    wx.navigateTo({ url: '/pages/mine/address-edit' });
  },

  editAddress(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/mine/address-edit?id=${id}` });
  }
});
