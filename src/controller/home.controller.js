const {
  DATA_INSERTION_FAILED,
  LABLE_IS_NOT_EXISTS
} = require('../config/error')
const homeService = require('../service/home.service')

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

  async update(ctx) {
    console.log(ctx.request.body)
    const content = ctx.request.body
    const homeId = ctx.params['homeId']
    // const { id } = ctx.user

    for (let key in content) {
      try {
        console.log(key)
        if (key === 'pictures' || key === 'labels') {
          console.log('特别的')
          return
        }
        await homeService.patch(homeId, key, content[key])
      } catch (error) {
        console.log(error)
      }
    }

    ctx.body = {
      code: 200,
      msg: '修改成功',
      data: null
    }
  }
}

module.exports = new HomeController()
