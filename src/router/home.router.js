const KoaRouter = require('@koa/router')
const homeRouter = new KoaRouter({ prefix: '/home' })
const { verifyAuth } = require('../middleware/login.middleware')
const { verifyAdmin } = require('../middleware/user.middleware')
const { create } = require('../controller/home.controller')

homeRouter.post('/', verifyAuth, verifyAdmin, create)

module.exports = homeRouter
