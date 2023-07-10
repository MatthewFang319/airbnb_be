const KoaRouter = require('@koa/router')
const { getHouseTypeList } = require('../controller/houseType.controller')
const houseTypeRouter = new KoaRouter({ prefix: '/houseType' })

// 获取地区列表
houseTypeRouter.get('/', getHouseTypeList)

module.exports = houseTypeRouter
