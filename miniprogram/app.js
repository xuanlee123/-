App({
  globalData: {
    userInfo: null,
    token: null,
    role: null,
    baseUrl: 'http://localhost:8080'
  },
  
  onLaunch() {
    const token = wx.getStorageSync('token');
    const userInfo = wx.getStorageSync('userInfo');
    const role = wx.getStorageSync('role');
    
    if (token) {
      this.globalData.token = token;
      this.globalData.userInfo = userInfo;
      this.globalData.role = role;
    }
  },
  
  setUserInfo(userInfo, token, role) {
    this.globalData.userInfo = userInfo;
    this.globalData.token = token;
    this.globalData.role = role;
    
    wx.setStorageSync('token', token);
    wx.setStorageSync('userInfo', userInfo);
    wx.setStorageSync('role', role);
  },
  
  clearUserInfo() {
    this.globalData.userInfo = null;
    this.globalData.token = null;
    this.globalData.role = null;
    
    wx.removeStorageSync('token');
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('role');
  },
  
  checkLogin() {
    if (!this.globalData.token) {
      wx.showModal({
        title: '提示',
        content: '请先登录',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login'
            });
          }
        }
      });
      return false;
    }
    return true;
  }
})
