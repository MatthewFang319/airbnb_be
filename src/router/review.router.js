const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')

const reviewRouter = new KoaRouter({ prefix: '/review' })

reviewRouter.post('/', verifyAuth)

module.exports = reviewRouter
