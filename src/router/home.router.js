const KoaRouter = require('@koa/router')
const homeRouter = new KoaRouter({ prefix: '/home' })
const { verifyAuth } = require('../middleware/login.middleware')
const { create } = require('../controller/home.controller')

homeRouter.post('/', verifyAuth, create)

module.exports = homeRouter
