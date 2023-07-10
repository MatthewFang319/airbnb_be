const KoaRouter = require('@koa/router')
const homeRouter = new KoaRouter({ prefix: '/home' })
const { verifyAuth } = require('../middleware/login.middleware')
const { verifyAdmin } = require('../middleware/user.middleware')
const { create } = require('../controller/home.controller')
const { checkHomeData } = require('../middleware/home.middleware')

homeRouter.post('/', verifyAuth, verifyAdmin, checkHomeData, create)

module.exports = homeRouter
