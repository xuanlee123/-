// pages/merchant/service-add.js
const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    isEdit: false,
    serviceId: null,
    merchantId: null,
    name: '',
    categoryId: null,
    price: '',
    description: '',
    images: [],
    status: 1,
    categories: [],
    submitting: false
  },

  onLoad(options) {
    if (app.globalData.role !== 2) {
      wx.showToast({ title: '无权访问', icon: 'none' });
      setTimeout(() => {
        wx.reLaunch({ url: '/pages/login/login' });
      }, 1500);
      return;
    }

    this.loadMerchantInfo();
    this.loadCategories();

    if (options.id) {
      wx.setNavigationBarTitle({ title: '编辑服务' });
      this.setData({
        isEdit: true,
        serviceId: parseInt(options.id)
      });
      this.loadServiceDetail(options.id);
    } else {
      wx.setNavigationBarTitle({ title: '新增服务' });
    }
  },

  async loadMerchantInfo() {
    try {
      const res = await api.getMerchantInfo();
      if (res.code === 200 && res.data) {
        this.setData({ merchantId: res.data.id });
      }
    } catch (err) {
      console.error('获取商户信息失败', err);
    }
  },

  async loadCategories() {
    try {
      const res = await api.getCategories();
      if (res.code === 200) {
        this.setData({ categories: res.data || [] });
      }
    } catch (err) {
      console.error('加载分类失败', err);
    }
  },

  async loadServiceDetail(id) {
    wx.showLoading({ title: '加载中...' });
    try {
      const res = await api.getServiceDetail(id);
      if (res.code === 200 && res.data) {
        const service = res.data;
        this.setData({
          name: service.name || '',
          categoryId: service.categoryId,
          price: service.price ? String(service.price) : '',
          description: service.description || '',
          images: service.images ? service.images.split(',').filter(Boolean) : [],
          status: service.status || 1
        });
      }
      wx.hideLoading();
    } catch (err) {
      wx.hideLoading();
      console.error('加载服务详情失败', err);
      wx.showToast({ title: '加载失败', icon: 'none' });
    }
  },

  onNameInput(e) {
    this.setData({ name: e.detail.value });
  },

  onPriceInput(e) {
    this.setData({ price: e.detail.value });
  },

  onDescInput(e) {
    this.setData({ description: e.detail.value });
  },

  selectCategory(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({ categoryId: id });
  },

  onStatusChange(e) {
    this.setData({ status: e.detail.value ? 1 : 0 });
  },

  chooseImage() {
    if (this.data.images.length >= 5) {
      wx.showToast({ title: '最多上传5张图片', icon: 'none' });
      return;
    }
    wx.chooseImage({
      count: 5 - this.data.images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 实际项目中应该上传到服务器，这里简化处理
        // 演示时直接使用本地路径
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

  async submitForm() {
    if (this.data.submitting) return;

    // 表单验证
    if (!this.data.name.trim()) {
      wx.showToast({ title: '请输入服务名称', icon: 'none' });
      return;
    }
    if (!this.data.categoryId) {
      wx.showToast({ title: '请选择服务分类', icon: 'none' });
      return;
    }
    if (!this.data.price || parseFloat(this.data.price) < 0) {
      wx.showToast({ title: '请输入有效的服务价格', icon: 'none' });
      return;
    }

    this.setData({ submitting: true });

    try {
      const data = {
        merchantId: this.data.merchantId,
        categoryId: this.data.categoryId,
        name: this.data.name.trim(),
        price: parseFloat(this.data.price),
        description: this.data.description.trim(),
        images: this.data.images.join(','),
        status: this.data.status
      };

      let res;
      if (this.data.isEdit) {
        data.id = this.data.serviceId;
        res = await api.updateService(data);
      } else {
        res = await api.addService(data);
      }

      if (res.code === 200) {
        wx.showToast({
          title: this.data.isEdit ? '修改成功' : '添加成功',
          icon: 'success'
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      } else {
        wx.showToast({ title: res.msg || '操作失败', icon: 'none' });
        this.setData({ submitting: false });
      }
    } catch (err) {
      console.error('提交失败', err);
      wx.showToast({ title: err.msg || '操作失败', icon: 'none' });
      this.setData({ submitting: false });
    }
  }
});
