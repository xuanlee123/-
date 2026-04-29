Page({
  data: {
    helpList: [
      {
        title: '如何使用社区服务',
        content: '在首页可以看到所有社区服务，点击进入详情页，选择服务时间并提交订单即可。服务完成后可对服务进行评价。',
        expanded: false
      },
      {
        title: '如何发布邻里圈动态',
        content: '在邻里圈页面，点击右下角的发布按钮，可以发布文字、图片等动态内容，与邻居分享生活点滴。',
        expanded: false
      },
      {
        title: '如何报名参加活动',
        content: '在活动页面选择感兴趣的活动，查看活动详情后在规定时间内点击报名按钮即可参加。',
        expanded: false
      },
      {
        title: '如何修改个人信息',
        content: '进入"我的"页面，点击编辑按钮，可以修改昵称、头像、个人简介等信息。',
        expanded: false
      },
      {
        title: '如何联系客服',
        content: '如有疑问，可以在"我的-帮助中心"查看常见问题，也可以联系社区物业获得更多帮助。',
        expanded: false
      },
      {
        title: '忘记密码怎么办',
        content: '在登录页面点击"忘记密码"，联系管理员重置密码，或前往社区物业办公室找回账号。',
        expanded: false
      }
    ]
  },

  toggleHelp(e) {
    const index = e.currentTarget.dataset.index;
    const list = this.data.helpList.map((item, i) => {
      if (i === index) {
        return { ...item, expanded: !item.expanded };
      }
      return item;
    });
    this.setData({ helpList: list });
  }
});
