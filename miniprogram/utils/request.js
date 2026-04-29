const app = getApp();

const request = (options) => {
  return new Promise((resolve, reject) => {
    const token = app.globalData.token;
    console.log('请求 URL:', app.globalData.baseUrl + options.url);
    console.log('请求 Token:', token ? `Bearer ${token}` : '无 Token');

    wx.request({
      url: app.globalData.baseUrl + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      success: (res) => {
        console.log('响应:', res.data);
        if (res.data.code === 200) {
          resolve(res.data);
        } else if (res.data.code === 401) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          wx.removeStorageSync('role');
          app.globalData.token = null;
          app.globalData.userInfo = null;
          app.globalData.role = null;
          wx.showToast({
            title: '请先登录',
            icon: 'none',
            duration: 1500,
            success: () => {
              setTimeout(() => {
                wx.reLaunch({ url: '/pages/login/login' });
              }, 1500);
            }
          });
          reject(res.data);
        } else {
          wx.showToast({
            title: res.data.msg || '请求失败',
            icon: 'none'
          });
          reject(res.data);
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
        reject(err);
      }
    });
  });
};

module.exports = {
  request
};
