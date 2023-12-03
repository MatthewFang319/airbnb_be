const { REMARK_CONTENT_LENGTH_EXCEEDS } = require('../config/error')
const { REMARK_CONTENT_LENGTH } = require('../constant/params-length')
const collectionService = require('../service/collection.service')
const remarkService = require('../service/remark.service')
const { checkLength } = require('../utils/check-data')

class RemarkController {
  // 备注房源
  async remark(ctx) {
    const { collectionId, homeId, remark } = ctx.request.body

    // 判断该心愿单是否存在该房源
    const isExists = await collectionService.hasHome(collectionId, homeId)
    console.log(isExists)
    if (!isExists) {
      return (ctx.body = {
        code: 400,
        msg: '心愿单中不存在该房源'
      })
    }
    const isExists2 = await remarkService.hasRemark(collectionId, homeId)
    if (isExists2) {
      return (ctx.body = {
        code: 400,
        msg: '心愿单中该房源已有备注'
      })
    }
    if (!checkLength(REMARK_CONTENT_LENGTH, remark))
      return ctx.app.emit('error', REMARK_CONTENT_LENGTH_EXCEEDS, ctx)
    const result = await remarkService.create(collectionId, homeId, remark)
    ctx.body = {
      code: 200,
      msg: '备注成功',
      data: {
        id: result.insertId,
        content: remark
      }
    }
  }

  async updateRemark(ctx) {
    const { remarkId, content } = ctx.request.body
    if (!checkLength(REMARK_CONTENT_LENGTH, content))
      return ctx.app.emit('error', REMARK_CONTENT_LENGTH_EXCEEDS, ctx)
    await remarkService.update(remarkId, content)
    ctx.body = {
      code: 200,
      msg: '修改成功'
    }
  }

  async deleteRemark(ctx) {
    const { remarkId } = ctx.request.body
    await remarkService.delete(remarkId)
    ctx.body = {
      code: 200,
      msg: '删除成功'
    }
  }
}

module.exports = new RemarkController()
