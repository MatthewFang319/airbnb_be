const connection = require('../app/database')

class UserService {
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

  async findUserByName(username) {
    const statement = 'SELECT * FROM `user` WHERE username = ?;'
    const [values] = await connection.execute(statement, [username])
    return values
  }

  async getUserInfo(userId) {
    const statement = 'SELECT * FROM `user` WHERE id = ?;'
    const [result] = await connection.execute(statement, [userId])
    return result[0]
  }

  async updateUserInfo(userInfo) {
    console.log(userInfo)
    const statement =
      'UPDATE user SET avatar_url = ?, profile = ? WHERE id = ?;'
    const [result] = await connection.execute(statement, [
      userInfo.avatarUrl,
      userInfo.profile,
      userInfo.userId
    ])
    return result
  }
}

module.exports = new UserService()
