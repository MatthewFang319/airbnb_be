const {
  DATA_INSERTION_FAILED,
  LABLE_IS_NOT_EXISTS,
  INVALID_REQUEST_BODY,
  HOME_IS_NOT_EXISTS,
  USER_NOT_ADMIN,
  USER_IS_NOT_EXISTS,
  UNKNOW_ERROR
} = require('../config/error')
const collectionService = require('../service/collection.service')
const homeService = require('../service/home.service')
const { checkAdmin } = require('../utils/check-data')

class HomeController {
  async create(ctx) {
    const { id } = ctx.user
    // console.log(ctx.user)
    const content = ctx.request.body

    try {
      // 添加房源基本信息
      const { insertId: homeId } = await homeService.create(content, id)
      // 为房源添加图片
      await Promise.all(
        content.pictures.map(item => {
          return homeService.addPicture(homeId, item)
        })
      )

      // 查询标签是否为存在,不存在则报错处理
      await Promise.all(
        content.labels.map(async item => {
          return homeService.addLabel(homeId, item)
        })
      )

      ctx.body = {
        code: 200,
        msg: '创建房源成功',
        data: {
          homeId: homeId
        }
      }
    } catch (error) {
      if (
        error.sql ===
        'INSERT INTO `home_label` (home_id,label_id) VALUES (?, ?);'
      )
        return ctx.app.emit('error', LABLE_IS_NOT_EXISTS, ctx)

      return ctx.app.emit('error', DATA_INSERTION_FAILED, ctx)
    }
    // console.log(result)
  }

  async search(ctx) {
    const { id } = ctx.user
    console.log(id)
    try {
      const { keyword, houseTypeId = undefined, offset, limit } = ctx.query
      let result = await homeService.search(keyword, offset, limit, houseTypeId)

      // 遍历每一个item检查是否有收藏
      result = await Promise.all(
        result.map(async item => {
          const judge = await collectionService.judgeStarOrnot(id, item.id)
          return {
            ...item,
            isCollected: judge
          }
        })
      )
      ctx.body = {
        code: 200,
        msg: '获取成功',
        data: result.length > 0 ? result : null
      }
    } catch (error) {
      console.log(error)
      return ctx.app.emit('error', UNKNOW_ERROR, ctx)
    }
  }
  async update(ctx) {
    const content = ctx.request.body
    const homeId = ctx.params['homeId']
    // 如果有传入图片，则删除图片
    for (let key in content) {
      try {
        if (key === 'pictures' || key === 'labels') continue
        // 修改常规内容
        await homeService.patch(homeId, key, content[key])

        // 修改标签
      } catch (error) {
        console.log(error)
        return ctx.app.emit('error', INVALID_REQUEST_BODY, ctx)
      }
    }

    ctx.body = {
      code: 200,
      msg: '修改成功',
      data: null
    }
  }

  async detail(ctx) {
    // const { homeId } = ctx.params
    const user = ctx.user
    const { homeId } = ctx.params

    try {
      const result = await collectionService.judgeStarOrnot(user.id, homeId)
      const [basicResult] = await homeService.queryById(homeId)
      if (basicResult === undefined) {
        return ctx.app.emit('error', HOME_IS_NOT_EXISTS, ctx)
      }
      console.log(basicResult)
      const finalResult = { ...basicResult, isCollected: result }
      ctx.body = {
        code: 200,
        msg: '获取成功',
        data: finalResult
      }
    } catch (error) {
      console.log(error)
      return ctx.app.emit('error')
    }
  }

  async getType(ctx) {
    const result = await homeService.queryHomeType()

    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: result
    }
  }

  async queryHome(ctx) {
    const { id } = ctx.user
    const { offset, limit, houseType_id } = ctx.query
    try {
      let result = await homeService.quryHome(offset, limit, houseType_id)

      // 遍历每一个item检查是否有收藏
      result = await Promise.all(
        result.map(async item => {
          const judge = await collectionService.judgeStarOrnot(id, item.id)
          return {
            ...item,
            isCollected: judge
          }
        })
      )

      ctx.body = {
        code: 200,
        msg: '获取成功',
        data: result
      }
    } catch (error) {
      console.log(error)
      return ctx.app.emit('error', UNKNOW_ERROR, ctx)
    }
  }

  async getAdminHome(ctx) {
    try {
      const { userId } = ctx.params
      const userIdentity = await checkAdmin(userId)
      if (!userIdentity) {
        return ctx.app.emit('error', USER_NOT_ADMIN, ctx)
      }
      const result = await homeService.queryUserHome(userId)

      ctx.body = {
        code: 200,
        msg: '获取成功',
        data: result
      }
    } catch (error) {
      console.log(error)
      return ctx.app.emit('error', USER_IS_NOT_EXISTS, ctx)
    }
  }
}

module.exports = new HomeController()
