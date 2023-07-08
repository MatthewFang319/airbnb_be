const KoaRouter = require('@koa/router')
const { getRegionList } = require('../controller/region.controller')
const regionRouter = new KoaRouter({ prefix: '/region' })

// 获取地区列表
regionRouter.get('/', getRegionList)

module.exports = regionRouter
