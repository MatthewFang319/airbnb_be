const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/secrect')

class LoginController {
  sign(ctx) {
    // 1.获取用户信息
    const { id, username } = ctx.user

    // 2.颁发令牌token
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: 'RS256'
    })

    // 3.返回用户信息
    const data = {
      userId: id,
      username,
      token
    }
    ctx.body = { code: 200, msg: '登录成功~', data }
  }
}

module.exports = new LoginController()
