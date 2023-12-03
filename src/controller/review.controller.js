const { UNKNOW_ERROR } = require('../config/error')
const { REVIEW_CONTENT_LENGTH_EXCEEDS } = require('../config/error')
const { REVIEW_CONTENT_LENGTH } = require('../constant/params-length')
const reviewService = require('../service/review.service')
const { checkLength } = require('../utils/check-data')

class ReviewController {
  async create(ctx) {
    const { orderId } = ctx.params
    const { content, star } = ctx.request.body
    const { id } = ctx.user
    try {
      const result = await reviewService.getReviewByOrder(orderId, id)
      if (result.length > 0) {
        ctx.body = {
          code: 400,
          msg: '你已评价该订单'
        }
      } else {
        if (!checkLength(REVIEW_CONTENT_LENGTH, content))
          return ctx.app.emit('error', REVIEW_CONTENT_LENGTH_EXCEEDS, ctx)
        const createResult = await reviewService.create(
          orderId,
          content,
          star,
          id
        )

        ctx.body = {
          code: 200,
          msg: '评价成功',
          data: {
            reviewId: createResult.insertId
          }
        }
      }
    } catch (error) {
      console.log(error)
      return ctx.app.emit('error', UNKNOW_ERROR, ctx)
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
    const { limit, offset } = ctx.query
    const data = await reviewService.getHomeReview(homeId, limit, offset)
    const count = await reviewService.getHomeReviewCount(homeId)
    const hasMore = Number(data.length) + Number(offset) < count
    ctx.body = {
      code: 200,
      msg: '查询成功',
      data: {
        reviewList: data,
        totalCount: count,
        size: data.length,
        hasMore: hasMore
      }
    }
  }

  async queryByOrderId(ctx) {
    const { orderId } = ctx.params
    const { id } = ctx.user
    try {
      const result = await reviewService.forQueryReviewByOrder(orderId, id)
      if (result.length <= 0)
        ctx.body = {
          code: 400,
          msg: '暂未评价或无权限'
        }
      else {
        ctx.body = {
          code: 200,
          msg: '获取成功',
          data: {
            reviewId: result[0].id,
            content: result[0].content,
            star: result[0].star
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new ReviewController()
