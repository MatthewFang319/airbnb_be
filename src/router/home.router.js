const KoaRouter = require('@koa/router')
const homeRouter = new KoaRouter({ prefix: '/home' })
const { verifyAuth } = require('../middleware/login.middleware')
const { verifyAdmin } = require('../middleware/user.middleware')
const { create, update } = require('../controller/home.controller')
const { checkHomeData } = require('../middleware/home.middleware')
const { verifyPermission } = require('../middleware/permission.middleware')

homeRouter.post('/', verifyAuth, verifyAdmin, checkHomeData, create)
homeRouter.patch('/:homeId', verifyAuth, verifyPermission, update)

module.exports = homeRouter
