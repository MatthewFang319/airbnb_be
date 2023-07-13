const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const {
  create,
  updateReview,
  deleteReview
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

module.exports = reviewRouter
