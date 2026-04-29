// pages/admin/merchant.js - 管理员商户管理页面
const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    merchants: [],
    allMerchants: [],
    loading: false,
    currentTab: 0,
    tabs: ['待审核', '已通过', '已驳回'],
    statusMap: { 0: '待审核', 1: '已通过', 2: '已驳回' },
    statusClass: { 0: 'pending', 1: 'approved', 2: 'rejected' }
  },

  onLoad(options) {
    if (options && options.status) {
      const status = parseInt(options.status);
      if (status === 0) this.setData({ currentTab: 0 });
    }
  },

  onShow() {
    this.loadMerchants();
  },

  async loadMerchants() {
    this.setData({ loading: true });
    try {
      const res = await api.getMerchantList({ pageNum: 1, pageSize: 200 });
      const data = res.data;
      const list = (data && data.records) ? data.records : [];
      const formattedList = list.map(m => {
        m.createTime = m.createTime ? this.formatTime(m.createTime) : '';
        m.auditTime = m.auditTime ? this.formatTime(m.auditTime) : '';
        m.avatarText = m.name ? m.name.charAt(0) : '商';
        return m;
      });
      this.setData({ allMerchants: formattedList, loading: false });
      this.applyFilter();
    } catch (err) {
      console.error('加载商户列表失败', err);
      this.setData({ loading: false });
    }
  },

  formatTime(timeStr) {
    if (!timeStr) return '';
    // iOS 不支持 new Date("2026-05-03 17:05:21") 格式
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

  applyFilter() {
    const tab = this.data.currentTab;
    const status = tab; // 0=pending, 1=approved, 2=rejected
    const filtered = this.data.allMerchants.filter(m => m.status === status);
    this.setData({ merchants: filtered });
  },

  switchTab(e) {
    const idx = Number(e.currentTarget.dataset.idx);
    this.setData({ currentTab: idx });
    this.applyFilter();
  },

  showDetail(e) {
    const merchant = e.currentTarget.dataset.merchant;
    wx.showModal({
      title: '商户详情',
      content: `商户名称：${merchant.name}\n联系人：${merchant.contactPerson}\n联系电话：${merchant.contactPhone}\n地址：${merchant.address}\n申请时间：${merchant.createTime}\n${merchant.auditTime ? '审核时间：' + merchant.auditTime : ''}\n${merchant.auditRemark ? '审核备注：' + merchant.auditRemark : ''}`,
      showCancel: false
    });
  },

  async passMerchant(e) {
    const id = e.currentTarget.dataset.id;
    const that = this;
    wx.showModal({
      title: '提示',
      content: '确定通过该商户申请？',
      success: async (res) => {
        if (res.confirm) {
          wx.showModal({
            title: '审核备注（选填）',
            editable: true,
            placeholderText: '输入审核备注',
            success: async (remarkRes) => {
              try {
                const result = await api.auditMerchant(id, 'pass');
                if (result.code === 200) {
                  wx.showToast({ title: '审核通过', icon: 'success' });
                  that.loadMerchants();
                } else {
                  wx.showToast({ title: result.msg || '操作失败', icon: 'none' });
                }
              } catch (err) {
                wx.showToast({ title: '操作失败', icon: 'none' });
              }
            }
          });
        }
      }
    });
  },

  async rejectMerchant(e) {
    const id = e.currentTarget.dataset.id;
    const that = this;
    wx.showModal({
      title: '提示',
      content: '确定驳回该商户申请？',
      success: async (res) => {
        if (res.confirm) {
          wx.showModal({
            title: '驳回原因（选填）',
            editable: true,
            placeholderText: '输入驳回原因',
            success: async (remarkRes) => {
              try {
                const result = await api.auditMerchant(id, 'reject');
                if (result.code === 200) {
                  wx.showToast({ title: '已驳回', icon: 'success' });
                  that.loadMerchants();
                } else {
                  wx.showToast({ title: result.msg || '操作失败', icon: 'none' });
                }
              } catch (err) {
                wx.showToast({ title: '操作失败', icon: 'none' });
              }
            }
          });
        }
      }
    });
  },

  viewLicense(e) {
    const url = e.currentTarget.dataset.url;
    if (url) {
      wx.previewImage({ urls: [url], current: url });
    } else {
      wx.showToast({ title: '暂无营业执照', icon: 'none' });
    }
  }
});
