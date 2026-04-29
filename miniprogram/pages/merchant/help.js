// pages/merchant/help.js - 商户帮助中心
Page({
  data: {
    helpList: [
      {
        title: '如何添加服务项目',
        content: '在商户工作台点击"添加服务"按钮，填写服务名称、价格、服务描述等信息后提交即可。',
        expanded: false
      },
      {
        title: '如何处理订单',
        content: '当有新订单时，您会收到通知。进入订单管理页面，点击"接单"确认接单，或点击"拒单"拒绝订单。',
        expanded: false
      },
      {
        title: '如何查看收入明细',
        content: '在数据统计页面可以查看今日收入、本月收入以及账户余额。收入将在订单完成后自动到账。',
        expanded: false
      },
      {
        title: '如何回复用户评价',
        content: '在评价管理页面可以看到所有用户评价，点击评价详情可以对评价进行回复。',
        expanded: false
      },
      {
        title: '如何创建优惠券',
        content: '在商户工作台点击"创建优惠券"，设置优惠金额、使用条件、有效期等信息后发布即可。',
        expanded: false
      },
      {
        title: '如何申请提现',
        content: '在账户管理页面点击"提现"按钮，输入提现金额后提交申请。审核通过后将在1-3个工作日到账。',
        expanded: false
      },
      {
        title: '如何修改商户信息',
        content: '在"我的"页面点击"编辑"按钮，可以修改商户名称、头像、联系电话、地址等信息。',
        expanded: false
      },
      {
        title: '忘记密码怎么办',
        content: '在登录页面点击"忘记密码"，联系平台管理员重置密码，或前往社区物业办公室找回账号。',
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
