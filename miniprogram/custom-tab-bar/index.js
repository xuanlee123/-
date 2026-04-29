Component({
  properties: {
    active: {
      type: String,
      value: ''
    },
    role: {
      type: String,
      value: 'user'  // user, merchant, admin
    }
  },

  data: {
    tabs: []
  },

  observers: {
    'role, active': function () {
      this.updateTabs();
    }
  },

  lifetimes: {
    attached() {
      this.updateTabs();
    }
  },

  methods: {
    updateTabs() {
      const role = this.properties.role;
      const active = this.properties.active;
      let tabs = [];

      if (role === 'user') {
        tabs = [
          { pagePath: '/pages/index/index', text: '首页', icon: '🏠' },
          { pagePath: '/pages/neighborhood/list', text: '邻里圈', icon: '👥' },
          { pagePath: '/pages/order/list', text: '订单', icon: '📋' },
          { pagePath: '/pages/mine/mine', text: '我的', icon: '👤' }
        ];
      } else if (role === 'merchant') {
        tabs = [
          { pagePath: '/pages/merchant/index', text: '首页', icon: '🏠' },
          { pagePath: '/pages/merchant/order', text: '订单', icon: '📋' },
          { pagePath: '/pages/merchant/mine', text: '我的', icon: '👤' }
        ];
      } else if (role === 'admin') {
        tabs = [
          { pagePath: '/pages/admin/index', text: '工作台', icon: '🏠' },
          { pagePath: '/pages/admin/data', text: '数据', icon: '📊' },
          { pagePath: '/pages/admin/order', text: '订单', icon: '📋' },
          { pagePath: '/pages/admin/mine', text: '我的', icon: '👤' }
        ];
      }

      this.setData({ tabs });
    },

    switchTab(e) {
      const path = e.currentTarget.dataset.path;
      const query = e.currentTarget.dataset.query || '';
      const active = this.properties.active;

      let url = path;
      if (query) {
        url = path + '?' + query;
      }

      if (path !== active) {
        if (this.properties.role === 'user') {
          wx.switchTab({ url: path });
        } else {
          wx.redirectTo({ url });
        }
      }
    }
  }
});
