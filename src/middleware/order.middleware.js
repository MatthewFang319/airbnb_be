const {
  TENANT_EXCEED,
  UNKNOW_ERROR,
  ORDER_SELF,
  START_GREATER_END,
  ORDER_EXISTED
} = require('../config/error')
const orderService = require('../service/order.service')
const { transferToSeconds } = require('../utils/check-data')

const checkTenant = async (ctx, next) => {
  const { homeId } = ctx.params
  const content = ctx.request.body
  try {
    const result = await orderService.tenant(homeId)
    // 检测到入住人数小于等于0报错处理
    if (content.tenant <= 0) throw new Error()

    if (Number(result[0].tenant) < Number(content.tenant)) {
      return ctx.app.emit('error', TENANT_EXCEED, ctx)
    }
    await next()
  } catch (error) {
    console.log(error)
    return ctx.app.emit('error', UNKNOW_ERROR, ctx)
  }
}

const checkOrderAuth = async (ctx, next) => {
  const { homeId } = ctx.params
  const { id } = ctx.user

  const result = await orderService.orderSelf(homeId, id)

  if (result) return ctx.app.emit('error', ORDER_SELF, ctx)
  else await next()
}

const checkDate = async (ctx, next) => {
  const content = ctx.request.body
  const { homeId } = ctx.params
  const orderedDate = await orderService.queryDate(homeId)

  const currStart = new Date(content.startTime).getTime()
  const currEnd = new Date(content.endTime).getTime()

  if (currStart > currEnd) return ctx.app.emit('error', START_GREATER_END, ctx)

  // 检查用户的时间是否在任何订单的时间范围内
  let overlaps = orderedDate.some(
    order =>
      currStart <= transferToSeconds(order.endTime) &&
      currEnd >= transferToSeconds(order.startTime)
  )

  if (overlaps) {
    return ctx.app.emit('error', ORDER_EXISTED, ctx)
  } else {
    await next()
  }
  //   await next()
}
module.exports = {
  checkTenant,
  checkOrderAuth,
  checkDate
}
