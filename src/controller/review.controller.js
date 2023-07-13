const reviewService = require('../service/review.service')

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
}

module.exports = new ReviewController()
