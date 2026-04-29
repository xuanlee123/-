const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    announcements: [],
    loading: false,
    showForm: false,
    typeOptions: [
      { value: 0, label: '系统公告' },
      { value: 1, label: '活动通知' }
    ],
    urgencyOptions: [
      { value: 0, label: '普通' },
      { value: 1, label: '紧急' }
    ],
    formData: {
      id: null,
      title: '',
      content: '',
      type: 0,
      typeLabel: '系统公告',
      urgency: 0,
      urgencyLabel: '普通',
      imageUrl: ''
    },
    isEditing: false
  },

  onShow() {
    this.loadAnnouncements();
  },

  async loadAnnouncements() {
    this.setData({ loading: true });
    try {
      const res = await api.getAnnouncementList({ pageNum: 1, pageSize: 100, all: 1 });
      const data = res.data;
      let list = data && data.records ? data.records : [];
      list = list.map(a => {
        a.createTime = a.createTime ? this.formatTime(a.createTime) : '';
        return a;
      });
      this.setData({ announcements: list, loading: false });
    } catch (err) {
      console.error('加载公告失败', err);
      this.setData({ loading: false });
    }
  },

  formatTime(timeStr) {
    if (!timeStr) return '';
    // iOS 不支持 new Date("2026-05-03") 格式
    let d;
    if (typeof timeStr === 'string') {
      const normalizedStr = timeStr.replace(' ', 'T');
      d = new Date(normalizedStr);
    } else {
      d = new Date(timeStr);
    }
    if (isNaN(d.getTime())) {
      return timeStr;
    }
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  },

  openAddForm() {
    this.setData({
      showForm: true,
      isEditing: false,
      formData: { id: null, title: '', content: '', type: 0, typeLabel: '系统公告', urgency: 0, urgencyLabel: '普通', imageUrl: '' }
    });
  },

  openEditForm(e) {
    const item = e.currentTarget.dataset.item;
    const typeOption = this.data.typeOptions.find(t => t.value === (item.type || 0)) || this.data.typeOptions[0];
    const urgencyOption = this.data.urgencyOptions.find(u => u.value === (item.urgency || 0)) || this.data.urgencyOptions[0];
    this.setData({
      showForm: true,
      isEditing: true,
      formData: {
        id: item.id,
        title: item.title,
        content: item.content,
        type: item.type || 0,
        typeLabel: typeOption.label,
        urgency: item.urgency || 0,
        urgencyLabel: urgencyOption.label,
        imageUrl: item.imageUrl || ''
      }
    });
  },

  closeForm() {
    this.setData({ showForm: false });
  },

  onFieldChange(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({ [`formData.${field}`]: value });
  },

  onTypeChange(e) {
    const selected = this.data.typeOptions[e.detail.value];
    if (selected) {
      this.setData({
        'formData.type': selected.value,
        'formData.typeLabel': selected.label
      });
    }
  },

  onUrgencyChange(e) {
    const selected = this.data.urgencyOptions[e.detail.value];
    if (selected) {
      this.setData({
        'formData.urgency': selected.value,
        'formData.urgencyLabel': selected.label
      });
    }
  },

  chooseImage() {
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
                that.setData({ 'formData.imageUrl': fullUrl });
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

  clearImage() {
    this.setData({ 'formData.imageUrl': '' });
  },

  async submitForm() {
    const { title, content } = this.data.formData;
    if (!title || !title.trim()) { wx.showToast({ title: '请输入标题', icon: 'none' }); return; }
    if (!content || !content.trim()) { wx.showToast({ title: '请输入内容', icon: 'none' }); return; }

    const formData = {};
    formData.id = this.data.formData.id || null;
    formData.title = this.data.formData.title.trim();
    formData.content = this.data.formData.content.trim();
    formData.type = this.data.formData.type || 0;
    formData.urgency = this.data.formData.urgency || 0;
    if (this.data.formData.imageUrl) {
      formData.imageUrl = this.data.formData.imageUrl;
    }
    try {
      wx.showLoading({ title: '保存中...' });
      if (this.data.isEditing) {
        await api.updateAnnouncement(formData);
        wx.showToast({ title: '修改成功', icon: 'success' });
      } else {
        await api.addAnnouncement(formData);
        wx.showToast({ title: '发布成功', icon: 'success' });
      }
      wx.hideLoading();
      this.closeForm();
      this.loadAnnouncements();
    } catch (err) {
      wx.hideLoading();
      console.error('保存公告失败', err);
      wx.showToast({ title: '保存失败', icon: 'none' });
    }
  },

  async publishAnnouncement(e) {
    const id = e.currentTarget.dataset.id;
    try {
      await api.publishAnnouncement(id);
      wx.showToast({ title: '发布成功', icon: 'success' });
      this.loadAnnouncements();
    } catch (err) {
      console.error('发布公告失败', err);
    }
  },

  async deleteAnnouncement(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除该公告吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            await api.deleteAnnouncement(id);
            wx.showToast({ title: '删除成功', icon: 'success' });
            this.loadAnnouncements();
          } catch (err) {
            console.error('删除公告失败', err);
          }
        }
      }
    });
  }
});
