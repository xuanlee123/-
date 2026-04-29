// pages/mine/address-edit.js
const api = require('../../api/index.js');

Page({
  data: {
    addressId: '',
    name: '',
    phone: '',
    region: '',
    detail: '',
    isDefault: false,
    isEditMode: false,
    showRegionPicker: false
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ addressId: options.id, isEditMode: true });
      wx.setNavigationBarTitle({ title: '编辑地址' });
      this.loadAddress(options.id);
    } else {
      wx.setNavigationBarTitle({ title: '新增地址' });
    }
  },

  async loadAddress(id) {
    try {
      const res = await api.getAddressDetail(id);
      const addr = res.data;
      this.setData({
        name: addr.name || '',
        phone: addr.phone || '',
        region: addr.region || '',
        detail: addr.detail || '',
        isDefault: addr.isDefault === 1
      });
    } catch (err) {
      console.error(err);
    }
  },

  onNameInput(e) {
    this.setData({ name: e.detail.value });
  },

  onPhoneInput(e) {
    this.setData({ phone: e.detail.value });
  },

  onRegionChange(e) {
    const arr = e.detail.value;
    this.setData({ region: arr.join(''), showRegionPicker: false });
  },

  onDetailInput(e) {
    this.setData({ detail: e.detail.value });
  },

  onDefaultChange(e) {
    this.setData({ isDefault: e.detail.value.length > 0 });
  },

  toggleEditRegion() {
    this.setData({ showRegionPicker: true });
  },

  async saveAddress() {
    const { name, phone, region, detail } = this.data;
    if (!name.trim()) {
      wx.showToast({ title: '请输入收货人姓名', icon: 'none' });
      return;
    }
    if (!phone.trim() || !/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }
    if (!region.trim()) {
      wx.showToast({ title: '请选择省市区', icon: 'none' });
      return;
    }
    if (!detail.trim()) {
      wx.showToast({ title: '请输入详细地址', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '保存中...' });
    try {
      const data = {
        name,
        phone,
        region,
        detail,
        isDefault: this.data.isDefault ? 1 : 0
      };
      if (this.data.addressId) {
        data.id = parseInt(this.data.addressId);
        await api.updateAddress(data);
      } else {
        await api.addAddress(data);
      }
      wx.hideLoading();
      wx.showToast({ title: '保存成功', icon: 'success' });
      setTimeout(() => wx.navigateBack(), 1500);
    } catch (err) {
      wx.hideLoading();
      console.error(err);
    }
  }
});
