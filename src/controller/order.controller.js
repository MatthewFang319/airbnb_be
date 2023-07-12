const { UNKNOW_ERROR } = require('../config/error')
const orderService = require('../service/order.service')

class orderController {
  async create(ctx) {
    try {
      const content = ctx.request.body
      const { id } = ctx.user
      const { homeId } = ctx.params
      // console.log(content, id, homeId)

      const result = await orderService.add(homeId, id, content)
      console.log(result)
      ctx.body = {
        code: 200,
        msg: '订单成功',
        data: {
          order_id: result.insertId
        }
      }
    } catch (error) {
      console.log(error)
      return ctx.app.emit('error', UNKNOW_ERROR, ctx)
    }
  }
}

module.exports = new orderController()
