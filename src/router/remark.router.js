const KoaRouter = require('@koa/router')
const remarkRouter = new KoaRouter({ prefix: '/remark' })
const { verifyAuth } = require('../middleware/login.middleware')
const {
  verifyCollectAuth,
  verifyRemarkAuth
} = require('../middleware/collection.middleware')
const {
  remark,
  updateRemark,
  deleteRemark
} = require('../controller/remark.controller')

// 添加房源备注
remarkRouter.post('/', verifyAuth, verifyCollectAuth, remark)

// 修改房源备注
remarkRouter.post('/update', verifyAuth, verifyRemarkAuth, updateRemark)

// 删除房源备注
remarkRouter.del('/', verifyAuth, verifyRemarkAuth, deleteRemark)

module.exports = remarkRouter
