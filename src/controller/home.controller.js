const homeService = require('../service/home.service')

class HomeController {
  async create(ctx) {
    const { id } = ctx.user
    // console.log(ctx.user)
    const content = ctx.request.body

    try {
      await homeService.create(content, id)
    } catch (error) {
      return ctx.app.emit('error')
    }
    // console.log(result)

    ctx.body = {
      code: 200,
      msg: '创建房源成功'
    }
  }
}

module.exports = new HomeController()
