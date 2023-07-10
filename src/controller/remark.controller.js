const collectionService = require('../service/collection.service')
const remarkService = require('../service/remark.service')

class RemarkController {
  // 备注房源
  async remark(ctx) {
    const { collectionId, homeId, remark } = ctx.request.body

    // 判断该心愿单是否存在该房源
    const isExists = await collectionService.hasHome(collectionId, homeId)
    if (!isExists) {
      ctx.body = {
        code: -2004,
        msg: '心愿单中不存在该房源'
      }
    }
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
