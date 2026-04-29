const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    content: '',
    images: [],
    maxImages: 9,
    selectedType: 0,
    types: [
      { value: 0, label: '普通动态' },
      { value: 1, label: '闲置交换' },
      { value: 2, label: '求助咨询' }
    ],
    submitting: false
  },

  onLoad() {},

  goBack() {
    wx.navigateBack();
  },

  onContentChange(e) {
    this.setData({ content: e.detail.value });
  },

  onTypeChange(e) {
    this.setData({ selectedType: Number(e.detail.value) });
  },

  selectType(e) {
    this.setData({ selectedType: Number(e.currentTarget.dataset.value) });
  },

  chooseImage() {
    const remaining = this.data.maxImages - this.data.images.length;
    if (remaining <= 0) {
      wx.showToast({ title: '最多上传9张图片', icon: 'none' }); return;
    }
    wx.chooseMedia({
      count: remaining,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFiles = res.tempFiles.map(f => f.tempFilePath);
        this.setData({
          images: [...this.data.images, ...tempFiles].slice(0, this.data.maxImages)
        });
      }
    });
  },

  removeImage(e) {
    const index = e.currentTarget.dataset.index;
    const images = [...this.data.images];
    images.splice(index, 1);
    this.setData({ images });
  },

  previewImage(e) {
    wx.previewImage({
      urls: this.data.images,
      current: e.currentTarget.dataset.src
    });
  },

  async submit() {
    if (!app.checkLogin()) return;
    const content = this.data.content.trim();
    if (!content) {
      wx.showToast({ title: '请输入内容', icon: 'none' }); return;
    }

    this.setData({ submitting: true });

    try {
      let imageUrls = '';
      if (this.data.images.length > 0) {
        const uploadUrls = [];
        for (const path of this.data.images) {
          try {
            const uploadRes = await this.uploadImage(path);
            uploadUrls.push(uploadRes);
          } catch (err) {
            console.error('上传图片失败', err);
            wx.showToast({ title: '图片上传失败，请重试', icon: 'none' });
            this.setData({ submitting: false });
            return;
          }
        }
        imageUrls = uploadUrls.join(',');
      }

      await api.addPost({
        content,
        images: imageUrls,
        type: this.data.selectedType
      });

      wx.showToast({ title: '发布成功', icon: 'success' });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    } catch (err) {
      console.error('发布失败', err);
      this.setData({ submitting: false });
    }
  },

  uploadImage(filePath) {
    return new Promise((resolve, reject) => {
      const app = getApp();
      wx.uploadFile({
        url: app.globalData.baseUrl + '/upload',
        filePath,
        name: 'file',
        header: {
          token: app.globalData.token ? `Bearer ${app.globalData.token}` : ''
        },
        success: (res) => {
          try {
            const data = JSON.parse(res.data);
            if (data.code === 200 && data.data) {
              resolve(data.data);
            } else {
              reject(new Error(data.msg || data.message || '上传失败'));
            }
          } catch (e) {
            reject(e);
          }
        },
        fail: reject
      });
    });
  }
});
