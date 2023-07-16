const { NAME_IS_ALREADY_EXISTS, UNKNOW_ERROR } = require('../config/error')
const userService = require('../service/user.service')

class UserController {
  // 注册
  async create(ctx) {
    const user = ctx.request.body
    const result = await userService.create(user)
    const data = {
      userId: result.insertId,
      username: user.username,
      identity: user.identity
    }
    ctx.body = {
      code: 200,
      msg: '创建用户成功',
      data
    }
  }

  // 获取用户信息
  async getInfo(ctx) {
    // 1.获取用户id
    const { userId } = ctx.params
    // 2.获取用户信息
    const userInfo = await userService.getUserInfo(userId)
    // 3.返回用户信息
    const data = {
      userId: userInfo.id,
      username: userInfo.username,
      avatarUrl: userInfo.avatar_url,
      identity: userInfo.identity,
      school: userInfo.school,
      career: userInfo.career,
      pet: userInfo.pet,
      skill: userInfo.skill,
      profile: userInfo.profile
    }
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data
    }
  }

  // 修改用户信息
  async updateInfo(ctx) {
    const userInfo = ctx.request.body
    const { id } = ctx.user
    try {
      await userService.updateUserInfo(userInfo, id)
      ctx.body = {
        code: 200,
        msg: '修改成功'
      }
    } catch (err) {
      ctx.body = {
        code: 400,
        msg: '传入参数不合理'
      }
    }
  }
  // 检查用户名是否存在
  async checkUsername(ctx) {
    const { username } = ctx.request.body
    const users = await userService.findUserByName(username)
    if (users.length) {
      return ctx.app.emit('error', NAME_IS_ALREADY_EXISTS, ctx)
    } else {
      ctx.body = {
        code: 200,
        msg: '该用户名不存在，可以注册'
      }
    }
  }

  // 查询用户的所有评价
  async getUserReview(ctx) {
    const { userId } = ctx.params
    try {
      const result = await userService.getUserReview(userId)
      ctx.body = {
        code: 200,
        msg: '获取成功',
        data: result.length > 0 ? result : null
      }
    } catch (error) {
      console.log(error)
      return ctx.app.emit('error', UNKNOW_ERROR, ctx)
    }
  }
}

module.exports = new UserController()
