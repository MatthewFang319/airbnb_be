const { DATA_INSERTION_FAILED } = require('../config/error')
const homeService = require('../service/home.service')

class HomeController {
  async create(ctx) {
    const { id } = ctx.user
    // console.log(ctx.user)
    const content = ctx.request.body

    try {
      await homeService.create(content, id)
    } catch (error) {
      console.log(error)
      return ctx.app.emit('error', DATA_INSERTION_FAILED)
    }
    // console.log(result)

    ctx.body = {
      code: 200,
      msg: '创建房源成功'
    }
  }
}

module.exports = new HomeController()
