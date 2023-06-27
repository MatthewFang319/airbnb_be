const KoaRouter = require('@koa/router')
const userRouter = new KoaRouter({ prefix: '/user' })
const { updateUserInfo } = require('../controller/user.controller')
const { verifyAuth } = require('../middleware/login.middleware')

// 更新用户信息
userRouter.post('/', verifyAuth, updateUserInfo)

userRouter.get('/:id', ctx => {
  const id = ctx.params.id
  ctx.body = '获取某个用户的数据:' + id
})

module.exports = userRouter
