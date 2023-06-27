const KoaRouter = require('@koa/router')
const userRouter = new KoaRouter({ prefix: '/user' })
const { updateInfo, getInfo } = require('../controller/user.controller')
const { verifyAuth } = require('../middleware/login.middleware')

// 更新用户信息
userRouter.post('/', verifyAuth, updateInfo)

// 获取用户信息
userRouter.get('/:userId', getInfo)

module.exports = userRouter
