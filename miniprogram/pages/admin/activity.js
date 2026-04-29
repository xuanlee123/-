const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    activities: [],
    allActivities: [],
    loading: false,
    currentTab: 0,
    tabs: ['全部', '报名中', '进行中', '已结束'],
    statusText: ['已下架', '报名中', '进行中', '已结束'],
    showForm: false,
    showSignupList: false,
    currentActivity: null,
    signupList: [],
    formData: {
      id: null,
      title: '',
      content: '',
      address: '待定',
      // 报名时间（分开存储）
      signupStartDate: '',
      signupStartTime: '00:00',
      signupEndDate: '',
      signupEndTime: '23:59',
      // 活动时间（分开存储）
      startDate: '',
      startTime: '09:00',
      endDate: '',
      endTime: '18:00',
      maxPeople: '',
      imageUrl: ''
    },
    isEditing: false
  },

  onShow() {
    this.loadActivities();
  },

  async loadActivities() {
    this.setData({ loading: true });
    try {
      const res = await api.getActivityList({ pageNum: 1, pageSize: 200, all: 1 });
      const data = res.data;
      const list = (data && data.records) ? data.records.map(a => {
        a.startTime = a.startTime ? this.formatTime(a.startTime) : '';
        a.endTime = a.endTime ? this.formatTime(a.endTime) : '';
        a.currentPeople = a.currentParticipants || 0;
        a.maxPeople = a.maxPeople || a.maxParticipants || '';
        return a;
      }) : [];
      this.setData({ allActivities: list, loading: false });
      this.applyFilter();
    } catch (err) {
      console.error('加载活动失败', err);
      this.setData({ loading: false });
    }
  },

  applyFilter() {
    const tab = this.data.currentTab;
    let filtered = this.data.allActivities;
    if (tab === 1) filtered = filtered.filter(a => a.status === 1);
    else if (tab === 2) filtered = filtered.filter(a => a.status === 2);
    else if (tab === 3) filtered = filtered.filter(a => a.status === 3);
    this.setData({ activities: filtered });
  },

  switchTab(e) {
    const idx = Number(e.currentTarget.dataset.idx);
    this.setData({ currentTab: idx });
    this.applyFilter();
  },

  formatTime(timeStr) {
    if (!timeStr) return '';
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
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  },

  // 解析日期时间字符串为日期和时间部分
  parseDateTime(dateTimeStr) {
    if (!dateTimeStr) return { date: '', time: '' };
    let d;
    if (typeof dateTimeStr === 'string') {
      const normalizedStr = dateTimeStr.replace(' ', 'T');
      d = new Date(normalizedStr);
    } else {
      d = new Date(dateTimeStr);
    }
    if (isNaN(d.getTime())) {
      return { date: '', time: '' };
    }
    const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const time = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    return { date, time };
  },

  openAddForm() {
    this.setData({
      showForm: true,
      isEditing: false,
      formData: {
        id: null,
        title: '',
        content: '',
        location: '待定',
        signupStartDate: '',
        signupStartTime: '00:00',
        signupEndDate: '',
        signupEndTime: '23:59',
        startDate: '',
        startTime: '09:00',
        endDate: '',
        endTime: '18:00',
        maxPeople: '',
        imageUrl: ''
      }
    });
  },

  openEditForm(e) {
    const item = e.currentTarget.dataset.item;
    const signupStart = this.parseDateTime(item.signupStartTime);
    const signupEnd = this.parseDateTime(item.signupEndTime);
    const start = this.parseDateTime(item.startTime);
    const end = this.parseDateTime(item.endTime);

    this.setData({
      showForm: true,
      isEditing: true,
      formData: {
        id: item.id,
        title: item.title,
        content: item.content,
        address: item.location || item.address || '待定',
        signupStartDate: signupStart.date,
        signupStartTime: signupStart.time || '00:00',
        signupEndDate: signupEnd.date,
        signupEndTime: signupEnd.time || '23:59',
        startDate: start.date,
        startTime: start.time || '09:00',
        endDate: end.date,
        endTime: end.time || '18:00',
        maxPeople: item.maxPeople || item.maxParticipants || '',
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

  // 报名开始日期选择
  onSignupStartDateChange(e) {
    this.setData({ 'formData.signupStartDate': e.detail.value });
  },

  // 报名开始时间选择
  onSignupStartTimeChange(e) {
    this.setData({ 'formData.signupStartTime': e.detail.value });
  },

  // 报名截止日期选择
  onSignupEndDateChange(e) {
    this.setData({ 'formData.signupEndDate': e.detail.value });
  },

  // 报名截止时间选择
  onSignupEndTimeChange(e) {
    this.setData({ 'formData.signupEndTime': e.detail.value });
  },

  // 活动开始日期选择
  onStartDateChange(e) {
    this.setData({ 'formData.startDate': e.detail.value });
  },

  // 活动开始时间选择
  onStartTimeChange(e) {
    this.setData({ 'formData.startTime': e.detail.value });
  },

  // 活动结束日期选择
  onEndDateChange(e) {
    this.setData({ 'formData.endDate': e.detail.value });
  },

  // 活动结束时间选择
  onEndTimeChange(e) {
    this.setData({ 'formData.endTime': e.detail.value });
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

  // 组合日期和时间，格式化为 yyyy-MM-dd HH:mm:ss
  combineDateTime(date, time) {
    if (!date) return null;
    if (!time) time = '00:00';
    return `${date} ${time}:00`;
  },

  async submitForm() {
    const { title, content, location, startDate, startTime, endDate, endTime } = this.data.formData;
    if (!title || !title.trim()) { wx.showToast({ title: '请输入标题', icon: 'none' }); return; }
    if (!content || !content.trim()) { wx.showToast({ title: '请输入活动内容', icon: 'none' }); return; }
    if (!startDate || !endDate) { wx.showToast({ title: '请选择活动时间', icon: 'none' }); return; }

    const formData = {};
    formData.id = this.data.formData.id || null;
    formData.title = this.data.formData.title.trim();
    formData.content = this.data.formData.content.trim();
    formData.address = this.data.formData.address?.trim() || '待定';
    formData.location = this.data.formData.address?.trim() || '待定';
    formData.startTime = this.combineDateTime(this.data.formData.startDate, this.data.formData.startTime);
    formData.endTime = this.combineDateTime(this.data.formData.endDate, this.data.formData.endTime);
    formData.signupStartTime = this.combineDateTime(this.data.formData.signupStartDate, this.data.formData.signupStartTime);
    formData.signupEndTime = this.combineDateTime(this.data.formData.signupEndDate, this.data.formData.signupEndTime);
    if (this.data.formData.maxPeople) {
      formData.maxParticipants = Number(this.data.formData.maxPeople);
    }
    if (this.data.formData.imageUrl) {
      formData.imageUrl = this.data.formData.imageUrl;
    }
    try {
      wx.showLoading({ title: '保存中...' });
      if (this.data.isEditing) {
        await api.updateActivity(formData);
        wx.showToast({ title: '保存成功', icon: 'success' });
      } else {
        await api.addActivity(formData);
        wx.showToast({ title: '创建成功', icon: 'success' });
      }
      wx.hideLoading();
      this.closeForm();
      this.loadActivities();
    } catch (err) {
      wx.hideLoading();
      console.error('保存活动失败', err);
      wx.showToast({ title: '保存失败', icon: 'none' });
    }
  },

  async deleteActivity(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除该活动吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            await api.deleteActivity(id);
            wx.showToast({ title: '删除成功', icon: 'success' });
            this.loadActivities();
          } catch (err) {
            console.error('删除活动失败', err);
          }
        }
      }
    });
  },

  async viewSignups(e) {
    const item = e.currentTarget.dataset.item;
    this.setData({ currentActivity: item, showSignupList: true });
    try {
      const res = await api.getSignupList(item.id);
      const list = (res.data || []).map(s => {
        s.signUpTime = s.signUpTime ? this.formatTime(s.signUpTime) : '';
        return s;
      });
      this.setData({ signupList: list });
    } catch (err) {
      console.error('加载报名列表失败', err);
      this.setData({ signupList: [] });
    }
  },

  closeSignupList() {
    this.setData({ showSignupList: false });
  },

  async cancelSignup(e) {
    const signupId = e.currentTarget.dataset.signupid;
    wx.showModal({
      title: '确认取消',
      content: '确定要取消该报名吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            await api.cancelSignup(signupId);
            wx.showToast({ title: '已取消', icon: 'success' });
            this.viewSignups({ currentTarget: { dataset: { item: this.data.currentActivity } } });
          } catch (err) {
            console.error('取消报名失败', err);
          }
        }
      }
    });
  }
});
