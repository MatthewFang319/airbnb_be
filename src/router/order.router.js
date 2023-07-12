const KoaRouter = require('@koa/router')
const { create } = require('../controller/order.controller')
const { verifyAuth } = require('../middleware/login.middleware')
const {
  checkTenant,
  checkOrderAuth,
  checkDate
} = require('../middleware/order.middleware')

const orderRouter = new KoaRouter({ prefix: '/order' })

orderRouter.post(
  '/:homeId',
  verifyAuth,
  checkOrderAuth,
  checkTenant,
  checkDate,
  create
)
module.exports = orderRouter
