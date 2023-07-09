const {
  OPERATION_IS_NOT_ALLOWED,
  COLLECTION_IS_NOT_EXISTS
} = require('../config/error')
const collectionService = require('../service/collection.service')

class CollectionController {
  async create(ctx) {
    const { name } = ctx.request.body
    const { id } = ctx.user
    const result = await collectionService.create(name, id)
    const data = {
      id: result.insertId,
      name: name,
      userId: id
    }
    ctx.body = {
      code: 200,
      msg: '创建心愿单成功',
      data
    }
  }

  // 删除心愿单
  async del(ctx) {
    const { id } = ctx.user
    const { collectionId } = ctx.params

    const result = await collectionService.getCollectionById(collectionId)
    if (!result) {
      // 该心愿单不存在
      ctx.app.emit('error', COLLECTION_IS_NOT_EXISTS, ctx)
    } else if (result.user_id != id) {
      // 没有权限修改该心愿单
      ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
    }
    await collectionService.delete(collectionId)
    ctx.body = {
      code: 200,
      msg: '成功删除'
    }
  }

  // 心愿单中添加房源
  async addHome(ctx) {
    const { id } = ctx.user
    const { collectionId, homeId } = ctx.request.body
    const result = await collectionService.getCollectionById(collectionId)
    if (!result) {
      // 该心愿单不存在
      ctx.app.emit('error', COLLECTION_IS_NOT_EXISTS, ctx)
    } else if (result.user_id != id) {
      // 没有权限修改该心愿单
      ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
    }

    // 判断该心愿单是否已存在该房源
    const isExists2 = await collectionService.hasHome(collectionId, homeId)
    if (isExists2.length != 0) {
      ctx.body = {
        code: -2003,
        msg: '心愿单中已有该房源'
      }
    } else {
      try {
        await collectionService.collectHome(collectionId, homeId)
        ctx.body = {
          code: 200,
          msg: '成功添加'
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  // 根据用户id获取心愿单列表
  async getCollectionList(ctx) {
    const { id } = ctx.user
    const result = await collectionService.getList(id)
    console.log(result)
  }
}

module.exports = new CollectionController()
