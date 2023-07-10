const KoaRouter = require('@koa/router')
const collectionRouter = new KoaRouter({ prefix: '/collection' })
const { verifyAuth } = require('../middleware/login.middleware')
const {
  create,
  update,
  del,
  addHome,
  delHome,
  getCollection,
  getCollectionList
} = require('../controller/collection.controller')
const { verifyCollectAuth } = require('../middleware/collection.middleware')

// 创建心愿单
collectionRouter.post('/', verifyAuth, create)

// 修改心愿单内容
collectionRouter.post('/update', verifyAuth, verifyCollectAuth, update)

// 删除心愿单
collectionRouter.del('/', verifyAuth, verifyCollectAuth, del)

// 收藏房源
collectionRouter.post('/home', verifyAuth, verifyCollectAuth, addHome)

// 取消收藏房源
collectionRouter.del('/home', verifyAuth, verifyCollectAuth, delHome)

// 获取心愿单列表
collectionRouter.get('/', verifyAuth, getCollectionList)

// 获取心愿单详情
collectionRouter.get('/:collectionId', verifyAuth, getCollection)

module.exports = collectionRouter
