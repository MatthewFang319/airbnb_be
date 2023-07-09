const KoaRouter = require('@koa/router')
const collectionRouter = new KoaRouter({ prefix: '/collection' })
const { verifyAuth } = require('../middleware/login.middleware')
const {
  create,
  del,
  addHome,
  getCollectionList
} = require('../controller/collection.controller')

// 创建心愿单
collectionRouter.post('/', verifyAuth, create)

// 心愿单中添加房源
collectionRouter.post('/home', verifyAuth, addHome)

// 删除心愿单
collectionRouter.del('/:collectionId', verifyAuth, del)
// 获取心愿单列表
collectionRouter.get('/', verifyAuth, getCollectionList)

module.exports = collectionRouter
