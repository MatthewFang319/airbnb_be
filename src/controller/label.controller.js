const { LABEL_IS_EXISTED } = require('../config/error')
const labelService = require('../service/label.service')

class labelController {
  async getLabel(ctx) {
    const result = await labelService.get()
    // console.log(111)
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: result
    }
  }

  async add(ctx) {
    try {
      const { name } = ctx.request.body

      const result = await labelService.add(name)
      console.log(result)
      ctx.body = {
        code: 200,
        msg: '添加成功',
        data: {
          labelId: result.insertId
        }
      }
    } catch (error) {
      console.log(error)
      return ctx.app.emit('error', LABEL_IS_EXISTED, ctx)
    }
  }
}

module.exports = new labelController()
