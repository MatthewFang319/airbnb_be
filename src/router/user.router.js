const KoaRouter = require('@koa/router')
const userRouter = new KoaRouter({ prefix: '/user' })
const {
  updateInfo,
  getInfo,
  checkUsername,
  getUserReview
} = require('../controller/user.controller')
const { verifyAuth } = require('../middleware/login.middleware')
const { checkParams } = require('../middleware/user.middleware')

// 更新用户信息
userRouter.post('/', verifyAuth, checkParams, updateInfo)

// 获取用户信息
userRouter.get('/:userId', getInfo)

// 检查用户名是否存在
userRouter.post('/username', checkUsername)

// 查询用户的所有评价
userRouter.get('/review/:userId', getUserReview)

module.exports = userRouter
