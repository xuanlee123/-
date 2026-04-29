const api = require('../../api/index.js');
const app = getApp();

Page({
  data: {
    id: null,
    post: null,
    comments: [],
    commentPage: 1,
    commentPageSize: 20,
    commentHasMore: true,
    commentLoading: false,
    loading: true,
    commentText: '',
    replyTo: null,
    isLiked: false,
    currentUserId: null,
    timeAgo: ''
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ id: Number(options.id) });
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo) this.setData({ currentUserId: userInfo.id });
      this.loadPostDetail();
      this.loadComments();
    }
  },

  async loadPostDetail() {
    this.setData({ loading: true });
    try {
      const res = await api.getPostDetail(this.data.id);
      if (res.data) {
        const p = res.data;
        p.imagesArray = p.images ? p.images.split(',') : [];
        this.setData({
          post: p,
          isLiked: p.isLiked || false,
          timeAgo: this.formatTimeAgo(p.createTime),
          loading: false
        });
      } else {
        this.setData({ loading: false });
        wx.showToast({ title: '帖子不存在', icon: 'none' });
      }
    } catch (err) {
      console.error('加载帖子详情失败', err);
      this.setData({ loading: false });
    }
  },

  async loadComments(reset = false) {
    if (this.data.commentLoading || (!reset && !this.data.commentHasMore)) return;
    this.setData({ commentLoading: true });
    try {
      const res = await api.getCommentList(this.data.id);
      const list = res.data || [];
      list.forEach(c => {
        c.timeAgo = this.formatTimeAgo(c.createTime);
      });
      this.setData({
        comments: list,
        commentLoading: false,
        commentHasMore: list.length === this.data.commentPageSize
      });
    } catch (err) {
      console.error('加载评论失败', err);
      this.setData({ commentLoading: false });
    }
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

  onCommentInput(e) {
    this.setData({ commentText: e.detail.value });
  },

  startReply(e) {
    const comment = e.currentTarget.dataset.comment;
    this.setData({
      replyTo: comment,
      commentText: `回复 @${comment.username || '用户'}：`
    });
  },

  cancelReply() {
    this.setData({ replyTo: null, commentText: '' });
  },

  async submitComment() {
    if (!app.checkLogin()) return;
    const text = this.data.commentText.trim();
    if (!text) {
      wx.showToast({ title: '请输入评论内容', icon: 'none' }); return;
    }
    try {
      const data = {
        postId: this.data.id,
        content: text,
        parentId: this.data.replyTo ? this.data.replyTo.id : null,
        replyUserId: this.data.replyTo ? this.data.replyTo.userId : null
      };
      await api.addComment(data);
      wx.showToast({ title: '评论成功', icon: 'success' });
      this.setData({ commentText: '', replyTo: null });
      this.loadComments(true);
      this.loadPostDetail();
    } catch (err) {
      console.error('评论失败', err);
    }
  },

  async toggleLike() {
    if (!app.checkLogin()) return;
    const id = this.data.id;
    const isLiked = this.data.isLiked;
    try {
      if (isLiked) {
        await api.unlikePost(id);
      } else {
        await api.likePost(id);
      }
      this.setData({ isLiked: !isLiked });
      const post = { ...this.data.post };
      post.likeCount = (post.likeCount || 0) + (isLiked ? -1 : 1);
      this.setData({ post });
    } catch (err) {
      console.error('点赞操作失败', err);
    }
  },

  async deleteComment(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条评论吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            await api.deleteComment(id);
            wx.showToast({ title: '删除成功', icon: 'success' });
            this.loadComments(true);
            this.loadPostDetail();
          } catch (err) {
            console.error('删除评论失败', err);
          }
        }
      }
    });
  },

  previewImage(e) {
    const images = this.data.post.imagesArray;
    const current = e.currentTarget.dataset.src;
    wx.previewImage({ urls: images, current });
  },

  onShareAppMessage() {
    const p = this.data.post;
    if (!p) return {};
    return {
      title: p.content ? p.content.substring(0, 50) : '邻里圈动态',
      path: `/pages/neighborhood/detail?id=${p.id}`
    };
  }
});
