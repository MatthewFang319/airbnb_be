class sliderController {
  async getSlider(ctx) {
    const data = [
      {
        id: 1,
        title: '产品经理实战高薪课',
        brief: '全方位技能提升，职业生涯无短板',
        brightPoints: [
          '对标腾讯10+职级能力',
          '专注提升高阶产品人业务能力',
          '从理论到实战，完成职业蜕变',
          '7大阶段体系进阶 成就高级产品人'
        ],
        pcLargeImage:
          'https://s0.lgstatic.com/i/image/M00/8E/EC/CgqCHmAGQgiAfqskAAClyQVZEpw724.png'
      },
      {
        id: 2,
        title: '全栈运营实操高薪课',
        brief: '覆盖10大热门方向，系统进阶全栈技能',
        brightPoints: [
          '0基础无门槛，帮助小白快速上手',
          '一线大厂专家亲授，实力打造金牌运营',
          '爆款运营案例',
          '高效增长方法论'
        ],
        pcLargeImage:
          'https://s0.lgstatic.com/i/image6/M00/77/41/CioPOWImxGeAU8miAANef1RsM-g458.png'
      },
      {
        id: 3,
        title: '测试开发实战高薪课',
        brief: '科学专业的学习路径  全面提升测试和开发能力',
        brightPoints: [
          '名企项目实战，构造完整测试体系',
          '大厂名师授课，还原名企能力模型',
          '15大体系进阶，打造专属核心技能',
          '6大企业项目实战'
        ],
        pcLargeImage:
          'https://s0.lgstatic.com/i/image/M00/8C/FB/Ciqc1F_29CqANbTVAAX3gTVQL4Q567.png'
      },
      {
        id: 4,
        title: '大数据开发高薪课',
        brief: 'PB级企业项目实战 全面掌握大数据高薪技能',
        brightPoints: [
          'PB级别企业大数据项目实战',
          '高效系统的大数据高薪学习路径',
          '4大模拟真实业务场',
          '1000+关键技术点'
        ],
        pcLargeImage:
          'https://s0.lgstatic.com/i/image/M00/8C/FB/Ciqc1F_29CqANbTVAAX3gTVQL4Q567.png'
      },
      {
        id: 25,
        title: '商业分析高薪课',
        brief: '构建商业思维，提升业务大局观',
        brightPoints: [
          '10 大阶段提升业务大局观',
          '详析热门行业，洞悉新趋势',
          '深度还原一线大厂商业场景',
          '10 大阶段提升业务大局观'
        ],
        pcLargeImage:
          'https://s0.lgstatic.com/i/image6/M00/77/41/CioPOWImxGeAU8miAANef1RsM-g458.png'
      }
    ]

    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: data
    }
  }
}

module.exports = new sliderController()
