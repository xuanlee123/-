const app = getApp();

Page({
  data: {
    userInfo: null
  },

  onShow() {
    const userInfo = app.globalData.userInfo;
    this.setData({ userInfo });
  },

  goToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },

  goToOrder() {
    if (!app.checkLogin()) return;
    wx.switchTab({
      url: '/pages/order/list'
    });
  },

  goToOrders(e) {
    if (!app.checkLogin()) return;
    const status = e.currentTarget.dataset.status;
    wx.navigateTo({
      url: `/pages/order/list?status=${status}`
    });
  },

  goToCollection() {
    if (!app.checkLogin()) return;
    wx.navigateTo({
      url: '/pages/mine/collection'
    });
  },

  goToCoupon() {
    if (!app.checkLogin()) return;
    wx.navigateTo({
      url: '/pages/mine/coupon'
    });
  },

  goToAddress() {
    if (!app.checkLogin()) return;
    wx.navigateTo({
      url: '/pages/mine/address'
    });
  },

  goToActivity() {
    if (!app.checkLogin()) return;
    wx.navigateTo({
      url: '/pages/activity/list'
    });
  },

  goToEdit() {
    if (!app.checkLogin()) return;
    wx.navigateTo({
      url: '/pages/mine/edit'
    });
  },

  goToMerchant() {
    if (!app.checkLogin()) return;
    const role = app.globalData.role;
    if (role === 2) {
      wx.navigateTo({
        url: '/pages/merchant/index'
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '您还不是商户，是否申请入驻？',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/merchant/apply'
            });
          }
        }
      });
    }
  },

  goToHelp() {
    wx.navigateTo({
      url: '/pages/mine/help'
    });
  },

  goToSettings() {
    wx.navigateTo({
      url: '/pages/mine/settings'
    });
  },

  switchToMerchant() {
    if (!app.checkLogin()) return;
    const role = app.globalData.role;
    if (role === 2) {
      wx.navigateTo({
        url: '/pages/merchant/index'
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '您还不是商户，是否申请入驻？',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/merchant/apply'
            });
          }
        }
      });
    }
  },

  switchToAdmin() {
    if (!app.checkLogin()) return;
    const role = app.globalData.role;
    if (role === 3) {
      wx.navigateTo({
        url: '/pages/admin/index'
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '您不是管理员，无权访问管理端',
        showCancel: false
      });
    }
  },

  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          app.clearUserInfo();
          this.setData({ userInfo: null });
          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          });
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/login/login'
            });
          }, 1000);
        }
      }
    });
  }
});
