const houseTypeService = require('../service/houseType.service')

class HouseTypeController {
  async getHouseTypeList(ctx) {
    const result = await houseTypeService.getList()
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: result
    }
  }
}

module.exports = new HouseTypeController()
