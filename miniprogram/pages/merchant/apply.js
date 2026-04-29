// pages/merchant/apply.js - 商户入驻申请页面
const app = getApp();
const api = require('../../api/index.js');

Page({
  data: {
    categories: [],
    formData: {
      name: '',
      contactPerson: '',
      contactPhone: '',
      address: '',
      categoryId: '',
      categoryName: '',
      description: '',
      licenseUrl: '',
      qualificationUrl: ''
    },
    currentStep: 0,
    submitted: false,
    submittedData: null
  },

  onLoad() {
    this.loadCategories();
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

  onFieldChange(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({ [`formData.${field}`]: value });
  },

  onCategoryChange(e) {
    const selected = this.data.categories[e.detail.value];
    if (selected) {
      this.setData({
        'formData.categoryId': selected.id,
        'formData.categoryName': selected.name
      });
    }
  },

  chooseImage(e) {
    const field = e.currentTarget.dataset.field;
    const that = this;
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        wx.showLoading({ title: '上传中...' });
        wx.uploadFile({
          url: app.globalData.baseUrl + '/upload',
          filePath: tempFilePath,
          name: 'file',
          header: { token: app.globalData.token ? `Bearer ${app.globalData.token}` : '' },
          success: (res) => {
            wx.hideLoading();
            try {
              const data = JSON.parse(res.data);
              if (data.code === 200 && data.data) {
                const fullUrl = app.globalData.baseUrl + '/' + data.data;
                that.setData({ [`formData.${field}`]: fullUrl });
                wx.showToast({ title: '上传成功', icon: 'success' });
              } else {
                wx.showToast({ title: data.msg || '上传失败', icon: 'none' });
              }
            } catch (e) {
              wx.showToast({ title: '上传失败', icon: 'none' });
            }
          },
          fail: () => { wx.hideLoading(); wx.showToast({ title: '上传失败', icon: 'none' }); }
        });
      }
    });
  },

  clearImage(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [`formData.${field}`]: '' });
  },

  nextStep() {
    const { name, contactPerson, contactPhone, address, categoryId } = this.data.formData;
    if (!name || !name.trim()) {
      wx.showToast({ title: '请输入商户名称', icon: 'none' }); return;
    }
    if (!contactPerson || !contactPerson.trim()) {
      wx.showToast({ title: '请输入联系人', icon: 'none' }); return;
    }
    if (!contactPhone || !contactPhone.trim()) {
      wx.showToast({ title: '请输入联系电话', icon: 'none' }); return;
    }
    if (!address || !address.trim()) {
      wx.showToast({ title: '请输入商户地址', icon: 'none' }); return;
    }
    if (!categoryId) {
      wx.showToast({ title: '请选择服务类别', icon: 'none' }); return;
    }
    this.setData({ currentStep: 1 });
  },

  prevStep() {
    this.setData({ currentStep: 0 });
  },

  async submitApplication() {
    const { description, licenseUrl } = this.data.formData;
    if (!description || !description.trim()) {
      wx.showToast({ title: '请输入商户简介', icon: 'none' }); return;
    }
    if (!licenseUrl) {
      wx.showToast({ title: '请上传营业执照', icon: 'none' }); return;
    }

    const formData = { ...this.data.formData };
    formData.userId = app.globalData.userInfo ? app.globalData.userInfo.id : null;
    
    try {
      wx.showLoading({ title: '提交中...' });
      const res = await api.submitMerchantApplication(formData);
      wx.hideLoading();
      if (res.code === 200) {
        this.setData({ 
          submitted: true,
          submittedData: formData
        });
      } else {
        wx.showToast({ title: res.msg || '提交失败', icon: 'none' });
      }
    } catch (err) {
      wx.hideLoading();
      console.error('提交申请失败', err);
      wx.showToast({ title: '提交失败，请重试', icon: 'none' });
    }
  },

  goBack() {
    wx.navigateBack();
  },

  goHome() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});
