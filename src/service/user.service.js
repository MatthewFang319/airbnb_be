const connection = require('../app/database')

class UserService {
  // 注册用户
  async create(user) {
    const { username, password, identity } = user
    const statement =
      'INSERT INTO `user` (username, password, identity) VALUES (?, ?, ?);'
    const [result] = await connection.execute(statement, [
      username,
      password,
      identity
    ])
    return result
  }

  // 根据用户名查找用户
  async findUserByName(username) {
    const statement = 'SELECT * FROM `user` WHERE username = ?;'
    const [values] = await connection.execute(statement, [username])
    return values
  }

  // 获取用户信息
  async getUserInfo(userId) {
    const statement = 'SELECT * FROM `user` WHERE id = ?;'
    const [result] = await connection.execute(statement, [userId])
    return result[0]
  }

  // 修改用户信息
  async updateUserInfo(userInfo, userId) {
    const { profile, pet, career, school, skill } = userInfo
    const statement =
      'UPDATE user SET profile = ?, pet = ?, career = ?, school = ?, skill = ? WHERE id = ?;'
    const [result] = await connection.execute(statement, [
      profile,
      pet,
      career,
      school,
      skill,
      userId
    ])
    return result
  }

  // 修改用户头像
  async updateUserAvatar(avatarUrl, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [avatarUrl, userId])
    return result
  }

  // 查看该用户是否为房东
  async checkLandlord(userId) {
    const statement = `SELECT user.identity identity FROM user WHERE id = ?`
    const [result] = await connection.execute(statement, [userId])
    return result
  }
}

module.exports = new UserService()
