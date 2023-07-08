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
    // 1.获取用户id
    const userInfo = ctx.request.body
    const { id } = ctx.user
    // 2.获取用户信息
    await userService.updateUserInfo(userInfo, id)
    // 3.返回用户信息
    ctx.body = {
      code: 200,
      msg: '修改成功'
    }
  }
}

module.exports = new UserController()
