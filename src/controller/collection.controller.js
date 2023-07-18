const {
  HOME_IS_NOT_EXISTS,
  COLLECTION_NAME_LENGTH_EXCEEDS
} = require('../config/error')
const { COLLECTION_NAME_LENGTH } = require('../constant/params-length')
const collectionService = require('../service/collection.service')
const { checkLength } = require('../utils/check-data')

class CollectionController {
  async create(ctx) {
    const { name } = ctx.request.body
    const { id } = ctx.user
    if (!checkLength(COLLECTION_NAME_LENGTH, name))
      return ctx.app.emit('error', COLLECTION_NAME_LENGTH_EXCEEDS, ctx)
    const result = await collectionService.create(name, id)
    console.log(result)
    ctx.body = {
      code: 200,
      msg: '创建心愿单成功',
      data: {
        id: result.insertId,
        name
      }
    }
  }

  async update(ctx) {
    const { name, collectionId } = ctx.request.body
    try {
      if (!checkLength(COLLECTION_NAME_LENGTH, name))
        return ctx.app.emit('error', COLLECTION_NAME_LENGTH_EXCEEDS, ctx)

      await collectionService.update(name, collectionId)
      const data = {
        id: collectionId,
        name: name
      }
      ctx.body = {
        code: 200,
        msg: '修改心愿单成功',
        data
      }
    } catch (err) {
      console.log(err)
    }
  }

  async del(ctx) {
    const { collectionId } = ctx.request.body
    await collectionService.delete(collectionId)
    ctx.body = {
      code: 200,
      msg: '成功删除'
    }
  }

  // 收藏房源
  async addHome(ctx) {
    const { collectionId, homeId } = ctx.request.body
    // 判断该心愿单是否已存在该房源
    const isExists = await collectionService.hasHome(collectionId, homeId)
    if (isExists) {
      ctx.body = {
        code: 400,
        msg: '心愿单中已有该房源'
      }
    } else {
      try {
        await collectionService.collectHome(collectionId, homeId)
        ctx.body = {
          code: 200,
          msg: '收藏成功'
        }
      } catch (err) {
        if (err.errno == 1452) {
          return ctx.app.emit('error', HOME_IS_NOT_EXISTS, ctx)
        }
      }
    }
  }

  // 取消收藏房源
  async delHome(ctx) {
    const { collectionId, homeId } = ctx.request.body
    // 判断该心愿单是否存在该房源
    const isExists = await collectionService.hasHome(collectionId, homeId)
    if (!isExists) {
      ctx.body = {
        code: 400,
        msg: '心愿单中不存在该房源'
      }
    } else {
      try {
        await collectionService.uncollectHome(collectionId, homeId)
        ctx.body = {
          code: 200,
          msg: '取消收藏成功'
        }
      } catch (err) {
        if (err.errno == 1452) {
          return ctx.app.emit('error', HOME_IS_NOT_EXISTS, ctx)
        }
      }
    }
  }

  // 获取心愿单详情
  async getCollection(ctx) {
    const { collectionId } = ctx.params
    const result = await collectionService.getCollectionDetail(collectionId)
    // result.homes.map(innerItem => {
    //   if (innerItem.remark.id == null) {
    //     innerItem.remark = null
    //   }
    // })
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: result.length > 0 ? result[0] : null
    }
  }

  // 获取用户心愿单列表
  async getCollectionList(ctx) {
    const { id } = ctx.user
    const result = await collectionService.getList(id)

    // result.map(item => {
    //   item.homes.map(innerItem => {
    //     if (innerItem.remark.id == null) {
    //       innerItem.remark = null
    //     }
    //   })
    // })

    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: result
    }
  }
}

module.exports = new CollectionController()
