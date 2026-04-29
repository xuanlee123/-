const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    posts: [],
    type: 0,
    pageNum: 1,
    pageSize: 10,
    loading: false,
    hasMore: true,
    fromRole: '',
    fromRoleText: ''
  },

  onLoad(options) {
    if (options.type) {
      this.setData({ type: parseInt(options.type) });
    }
    if (options.from === 'merchant') {
      this.setData({ fromRole: 'merchant', fromRoleText: '👤 商户端 - 邻里圈' });
      wx.hideTabBar({});
    } else if (options.from === 'admin') {
      this.setData({ fromRole: 'admin', fromRoleText: '👔 管理员端 - 邻里圈' });
      wx.hideTabBar({});
    }
    this.loadPosts();
  },

  onShow() {
    this.loadPosts(true);
  },

  async loadPosts(reset = false) {
    if (this.data.loading || (!reset && !this.data.hasMore)) return;
    
    this.setData({ loading: true });
    
    try {
      const params = {
        pageNum: reset ? 1 : this.data.pageNum,
        pageSize: this.data.pageSize
      };
      
      if (this.data.type > 0) {
        params.type = this.data.type;
      }
      
      const res = await api.getPostList(params);
      const data = res.data;
      
      let posts = reset ? [] : this.data.posts;
      if (data && data.records) {
        posts = reset ? data.records : [...posts, ...data.records];
        posts.forEach(post => {
          if (post.images) {
            post.imagesArray = post.images.split(',');
          }
          post.timeAgo = this.formatTimeAgo(post.createTime);
        });
      }
      
      this.setData({
        posts,
        pageNum: reset ? 2 : this.data.pageNum + 1,
        hasMore: data && data.records && data.records.length === this.data.pageSize,
        loading: false
      });
    } catch (err) {
      console.error('加载动态失败', err);
      this.setData({ loading: false });
    }
  },

  switchTab(e) {
    const type = parseInt(e.currentTarget.dataset.type);
    this.setData({ type, posts: [], pageNum: 1, hasMore: true });
    this.loadPosts(true);
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/neighborhood/detail?id=${id}`
    });
  },

  async toggleLike(e) {
    if (!app.checkLogin()) return;
    
    const id = e.currentTarget.dataset.id;
    const isLiked = e.currentTarget.dataset.liked;
    
    try {
      if (isLiked) {
        await api.unlikePost(id);
      } else {
        await api.likePost(id);
      }
      this.loadPosts(true);
    } catch (err) {
      console.error('操作失败', err);
    }
  },

  previewImage(e) {
    const images = e.currentTarget.dataset.images;
    const current = e.currentTarget.dataset.current;
    wx.previewImage({
      urls: images,
      current
    });
  },

  stopPropagation() {},

  goToPublish() {
    if (!app.checkLogin()) return;
    wx.navigateTo({
      url: '/pages/neighborhood/publish'
    });
  },

  formatTimeAgo(dateStr) {
    if (!dateStr) return '';
    const now = Date.now();
    // iOS 不支持 new Date("2026-05-03 17:05:21") 格式，需要替换空格为 T
    let normalizedStr = dateStr;
    if (typeof dateStr === 'string') {
      normalizedStr = dateStr.replace(' ', 'T');
    }
    const d = new Date(normalizedStr).getTime();
    const diff = now - d;
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    if (diff < minute) return '刚刚';
    if (diff < hour) return Math.floor(diff / minute) + '分钟前';
    if (diff < day) return Math.floor(diff / hour) + '小时前';
    if (diff < 7 * day) return Math.floor(diff / day) + '天前';
    const date = new Date(normalizedStr);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  },

  onReachBottom() {
    this.loadPosts();
  }
});
