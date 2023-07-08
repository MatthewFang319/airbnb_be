const homeService = require('../service/home.service')

class HomeController {
  async create(ctx) {
    const { id } = ctx.user
    console.log(ctx.user)
    const content = ctx.request.body
    const result = await homeService.create(content, id)
    console.log(result)
    ctx.body = {
      code: 200,
      msg: '创建房源成功'
    }
  }
}

module.exports = new HomeController()
