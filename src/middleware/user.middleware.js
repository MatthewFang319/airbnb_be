const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  OPERATION_IS_NOT_ALLOWED
} = require('../config/error')
const userService = require('../service/user.service')
const md5password = require('../utils/md5-password')

const verifyUser = async (ctx, next) => {
  // 判断传入用户名或密码是否为空
  const { username, password } = ctx.request.body
  if (!username || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }
  // 判断数据库中是否存在该用户名
  const users = await userService.findUserByName(username)
  // console.log(users);
  if (users.length) {
    return ctx.app.emit('error', NAME_IS_ALREADY_EXISTS, ctx)
  }
  await next()
}

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  // 对密码进行加密
  ctx.request.body.password = md5password(password)
  await next()
}

// 判断是否为管理员
const verifyAdmin = async (ctx, next) => {
  const { identity } = ctx.user
  if (identity !== 2) {
    return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
  }

  await next()
}

module.exports = {
  verifyUser,
  handlePassword,
  verifyAdmin
}
