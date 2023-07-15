const KoaRouter = require('@koa/router')
const {
  create,
  get,
  getUser,
  deleteOrder
} = require('../controller/order.controller')
const { verifyAuth } = require('../middleware/login.middleware')
const {
  checkTenant,
  checkOrderAuth,
  checkDate
} = require('../middleware/order.middleware')
const { verifyPermission } = require('../middleware/permission.middleware')

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
orderRouter.delete('/:orderId', verifyAuth, verifyPermission, deleteOrder)
module.exports = orderRouter
