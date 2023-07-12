const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  OPERATION_IS_NOT_ALLOWED,
  PROFILE_LENGTH_EXCEEDS,
  PET_LENGTH_EXCEEDS,
  CAREER_LENGTH_EXCEEDS,
  SCHOOL_LENGTH_EXCEEDS,
  SKILL_LENGTH_EXCEEDS
} = require('../config/error')
const {
  USER_PROFILE_LENGTH,
  USER_SKILL_LENGTH,
  USER_SCHOOL_LENGTH,
  USER_CAREER_LENGTH,
  USER_PET_LENGTH
} = require('../constant/user')
const userService = require('../service/user.service')
const { checkLength } = require('../utils/check-data')
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

// 判断输入参数字符串长度是否过长
const checkParams = async (ctx, next) => {
  const { profile, pet, career, school, skill } = ctx.request.body
  if (profile && !checkLength(USER_PROFILE_LENGTH, profile))
    return ctx.app.emit('error', PROFILE_LENGTH_EXCEEDS, ctx)
  if (pet && !checkLength(USER_PET_LENGTH, pet))
    return ctx.app.emit('error', PET_LENGTH_EXCEEDS, ctx)
  if (career && !checkLength(USER_CAREER_LENGTH, career))
    return ctx.app.emit('error', CAREER_LENGTH_EXCEEDS, ctx)
  if (school && !checkLength(USER_SCHOOL_LENGTH, school))
    return ctx.app.emit('error', SCHOOL_LENGTH_EXCEEDS, ctx)
  if (skill && !checkLength(USER_SKILL_LENGTH, skill))
    return ctx.app.emit('error', SKILL_LENGTH_EXCEEDS, ctx)
  await next()
}

module.exports = {
  verifyUser,
  handlePassword,
  verifyAdmin,
  checkParams
}
