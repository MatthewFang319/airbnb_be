const KoaRouter = require('@koa/router')
const userRouter = new KoaRouter({ prefix: '/user' })
const {
  updateInfo,
  getInfo,
  checkUsername
} = require('../controller/user.controller')
const { verifyAuth } = require('../middleware/login.middleware')
const { checkParams } = require('../middleware/user.middleware')

// 更新用户信息
userRouter.post('/', verifyAuth, checkParams, updateInfo)

// 获取用户信息
userRouter.get('/:userId', getInfo)

// 检查用户名是否存在
userRouter.post('/username', checkUsername)

module.exports = userRouter
