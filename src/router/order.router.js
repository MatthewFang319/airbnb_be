const KoaRouter = require('@koa/router')
const { create, get, getUser } = require('../controller/order.controller')
const { verifyAuth } = require('../middleware/login.middleware')
const {
  checkTenant,
  checkOrderAuth,
  checkDate
} = require('../middleware/order.middleware')

const orderRouter = new KoaRouter({ prefix: '/order' })
orderRouter.get('/user', verifyAuth, getUser)

orderRouter.get('/:homeId', get)
orderRouter.post(
  '/',
  verifyAuth,
  checkOrderAuth,
  checkTenant,
  checkDate,
  create
)
module.exports = orderRouter
