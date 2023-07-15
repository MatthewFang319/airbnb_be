// const { end } = require('../app/database')
const { UNKNOW_ERROR, ORDER_IS_NOT_EXISTED } = require('../config/error')
const orderService = require('../service/order.service')
const { formatDate } = require('../utils/check-data')

class orderController {
  async create(ctx) {
    try {
      const content = ctx.request.body
      const { id } = ctx.user
      const { homeId } = content
      // console.log(content, id, homeId)

      const result = await orderService.add(homeId, id, content)
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

  async deleteOrder(ctx) {
    const { orderId } = ctx.params
    try {
      const result = await orderService.deleteOrder(orderId)
      if (result.affectedRows === 0)
        return ctx.app.emit('error', ORDER_IS_NOT_EXISTED, ctx)
      ctx.body = {
        code: 200,
        msg: '删除成功',
        data: null
      }
    } catch (error) {
      console.log(error)
      return ctx.app.emit('error', UNKNOW_ERROR, ctx)
    }
  }
}

module.exports = new orderController()
