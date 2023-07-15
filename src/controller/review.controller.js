const { REVIEW_CONTENT_LENGTH_EXCEEDS } = require('../config/error')
const { REVIEW_CONTENT_LENGTH } = require('../constant/params-length')
const reviewService = require('../service/review.service')
const { checkLength } = require('../utils/check-data')

class ReviewController {
  async create(ctx) {
    const { orderId } = ctx.params
    const { content, star } = ctx.request.body
    const { id } = ctx.user
    const result = await reviewService.getReviewByOrder(orderId, id)
    if (result.length > 0) {
      ctx.body = {
        code: -2001,
        msg: '你已评价该订单'
      }
    } else {
      if (!checkLength(REVIEW_CONTENT_LENGTH, content))
        return ctx.app.emit('error', REVIEW_CONTENT_LENGTH_EXCEEDS, ctx)
      await reviewService.create(orderId, content, star, id)
      ctx.body = {
        code: 200,
        msg: '评价成功'
      }
    }
  }

  async updateReview(ctx) {
    const { reviewId } = ctx.params
    const { content, star } = ctx.request.body
    if (!checkLength(REVIEW_CONTENT_LENGTH, content))
      return ctx.app.emit('error', REVIEW_CONTENT_LENGTH_EXCEEDS, ctx)
    await reviewService.update(reviewId, content, star)
    ctx.body = {
      code: 200,
      msg: '修改成功'
    }
  }

  async deleteReview(ctx) {
    const { reviewId } = ctx.params
    await reviewService.delete(reviewId)
    ctx.body = {
      code: 200,
      msg: '删除成功'
    }
  }

  async getHomeReview(ctx) {
    const { homeId } = ctx.params
    const { size, offset } = ctx.query
    const data = await reviewService.getHomeReview(homeId, size, offset)
    ctx.body = {
      code: 200,
      msg: '查询成功',
      data
    }
  }
}

module.exports = new ReviewController()
