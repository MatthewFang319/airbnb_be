const regionService = require('../service/region.service')

class RegionController {
  async getRegionList(ctx) {
    const result = await regionService.getList()
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: result
    }
  }
}

module.exports = new RegionController()
