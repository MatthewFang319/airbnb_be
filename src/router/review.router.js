const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const {
  create,
  updateReview,
  deleteReview,
  queryByOrderId
} = require('../controller/review.controller')
const { verifyPermission } = require('../middleware/permission.middleware')

const reviewRouter = new KoaRouter({ prefix: '/review' })

// 评价订单
reviewRouter.post('/:orderId', verifyAuth, verifyPermission, create)

// 修改评价
reviewRouter.post(
  '/update/:reviewId',
  verifyAuth,
  verifyPermission,
  updateReview
)

// 删除评价
reviewRouter.del('/:reviewId', verifyAuth, verifyPermission, deleteReview)

// 根据订单id获取评价
reviewRouter.get('/order/:orderId', verifyAuth, queryByOrderId)
module.exports = reviewRouter
