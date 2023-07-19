const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/secrect')

class LoginController {
  sign(ctx) {
    // 1.获取用户信息
    const { id, username, identity } = ctx.user
    // 2.颁发令牌token
    const token = jwt.sign({ id, username, identity }, PRIVATE_KEY, {
      expiresIn: '5m',
      algorithm: 'RS256'
    })

    // 3.返回用户信息
    const data = {
      userId: id,
      username,
      identity,
      token
    }
    ctx.body = { code: 200, msg: '登录成功~', data }
  }
}

module.exports = new LoginController()
