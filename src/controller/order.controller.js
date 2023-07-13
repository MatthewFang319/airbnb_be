// const { end } = require('../app/database')
const { UNKNOW_ERROR } = require('../config/error')
const orderService = require('../service/order.service')
const { formatDate } = require('../utils/check-data')

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

  async get(ctx) {
    const { homeId } = ctx.params
    // const result = await orderService.queryDate(homeId)
    try {
      const result = await orderService.queryDate(homeId)
      let data = result.map(item => {
        return {
          startTime: formatDate(item.startTime, false),
          endTime: formatDate(item.endTime, false)
        }
      })
      if (data.length === 0) data = null
      ctx.body = {
        code: 200,
        msg: '获取成功',
        data: data
      }
    } catch (error) {
      console.log(error)
      return ctx.app.emit('error', UNKNOW_ERROR, ctx)
    }
  }
  async getUser(ctx) {
    try {
      const { id: userId } = ctx.user
      const result = await orderService.queryUserOrder(userId)
      let data = result.map(item => {
        return {
          ...item,
          startTime: formatDate(item.startTime, false),
          endTime: formatDate(item.endTime, false)
        }
      })
      ctx.body = {
        code: 200,
        msg: '获取成功',
        data: data.length === 0 ? null : data
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new orderController()
