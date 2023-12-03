const collectionService = require('../service/collection.service')
const {
  OPERATION_IS_NOT_ALLOWED,
  COLLECTION_IS_NOT_EXISTS,
  REMARK_IS_NOT_EXISTS
} = require('../config/error')
const remarkService = require('../service/remark.service')

const verifyCollectAuth = async (ctx, next) => {
  const { id } = ctx.user
  const { collectionId } = ctx.request.body
  const result = await collectionService.getCollectionById(collectionId)
  console.log(id, collectionId)
  if (!result) {
    // 该心愿单不存在
    return ctx.app.emit('error', COLLECTION_IS_NOT_EXISTS, ctx)
  } else if (result.user_id != id) {
    // 没有权限修改该心愿单
    return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
  }
  await next()
}

const verifyRemarkAuth = async (ctx, next) => {
  const { id } = ctx.user
  const { remarkId } = ctx.request.body
  const result = await remarkService.getRemark(remarkId)
  if (!result) {
    return ctx.app.emit('error', REMARK_IS_NOT_EXISTS, ctx)
  }
  const result1 = await collectionService.getCollectionById(
    result.collection_id
  )

  if (!result1) {
    // 该心愿单不存在
    return ctx.app.emit('error', COLLECTION_IS_NOT_EXISTS, ctx)
  } else if (result1.user_id != id) {
    // 没有权限修改该心愿单
    return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
  }
  await next()
}

module.exports = {
  verifyCollectAuth,
  verifyRemarkAuth
}
