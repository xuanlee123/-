const api = require('../../api/index.js');

Page({
  data: {
    users: [],
    loading: false,
    keyword: '',
    currentTab: 0,
    tabs: ['全部', '居民', '商户', '管理员'],
    roleMap: { 1: '居民', 2: '商户', 3: '管理员' },
    statusMap: { 0: '禁用', 1: '正常' },
    showActionSheet: false,
    actionUser: null,
    actionOptions: [
      { name: '启用账号', value: 'enable' },
      { name: '禁用账号', value: 'disable' },
      { name: '重置密码', value: 'reset' }
    ]
  },

  onShow() {
    this.loadUsers();
  },

  async loadUsers() {
    this.setData({ loading: true });
    try {
      const params = { pageNum: 1, pageSize: 200 };
      if (this.data.keyword) params.keyword = this.data.keyword;
      if (this.data.currentTab > 0) params.role = this.data.currentTab;
      const res = await api.getAdminUserList(params);
      const data = res.data;
      const list = (data && data.records) ? data.records : [];
      this.setData({ users: list, loading: false });
    } catch (err) {
      console.error('加载用户失败', err);
      this.setData({ loading: false });
    }
  },

  switchTab(e) {
    const idx = Number(e.currentTarget.dataset.idx);
    this.setData({ currentTab: idx });
    this.loadUsers();
  },

  onKeywordInput(e) {
    this.setData({ keyword: e.detail.value });
  },

  search() {
    this.loadUsers();
  },

  showUserActions(e) {
    const user = e.currentTarget.dataset.user;
    this.setData({ showActionSheet: true, actionUser: user });
  },

  closeAction() {
    this.setData({ showActionSheet: false, actionUser: null });
  },

  async handleAction(e) {
    const action = e.currentTarget.dataset.action;
    const user = this.data.actionUser;
    this.closeAction();

    if (action === 'enable') {
      await this.updateStatus(user.id, 1, '启用');
    } else if (action === 'disable') {
      wx.showModal({
        title: '确认禁用',
        content: `确定要禁用用户「${user.username}」吗？禁用后该用户将无法登录。`,
        success: async (res) => {
          if (res.confirm) await this.updateStatus(user.id, 0, '禁用');
        }
      });
    } else if (action === 'reset') {
      wx.showModal({
        title: '确认重置',
        content: `确定要重置用户「${user.username}」的密码吗？重置后密码将恢复为 123456。`,
        success: async (res) => {
          if (res.confirm) await this.resetPassword(user.id, user.username);
        }
      });
    }
  },

  async updateStatus(userId, status, label) {
    try {
      await api.updateAdminUserStatus(userId, status);
      wx.showToast({ title: `${label}成功`, icon: 'success' });
      this.loadUsers();
    } catch (err) {
      wx.showToast({ title: `${label}失败`, icon: 'none' });
    }
  },

  async resetPassword(userId, username) {
    try {
      await api.resetAdminPassword(userId, '123456');
      wx.showModal({
        title: '密码已重置',
        content: `用户「${username}」的密码已重置为「123456」，请告知用户及时修改。`,
        showCancel: false
      });
      this.loadUsers();
    } catch (err) {
      wx.showToast({ title: '重置失败', icon: 'none' });
    }
  }
});
