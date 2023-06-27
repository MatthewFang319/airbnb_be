const KoaRouter = require('@koa/router')
const { create } = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')

const enrollRouter = new KoaRouter({ prefix: '/enroll' })

// 用户注册接口
enrollRouter.post('/', verifyUser, handlePassword, create)

module.exports = enrollRouter