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

    let statement = 'UPDATE user SET '
    let params = []
    let count = 0

    if (profile) {
      statement += 'profile = ?, '
      params.push(profile)
      count++
    }
    if (pet) {
      statement += 'pet = ?, '
      params.push(pet)
      count++
    }
    if (career) {
      statement += 'career = ?, '
      params.push(career)
      count++
    }
    if (school) {
      statement += 'school = ?, '
      params.push(school)
      count++
    }
    if (skill) {
      statement += 'skill = ?, '
      params.push(skill)
      count++
    }
    statement = statement.slice(0, -2)
    statement += ' WHERE id = ?'
    params.push(userId)
    if (count > 0) {
      const [result] = await connection.execute(statement, params)
      return result
    }
    throw new Error('传入参数不合理')
  }

  // 修改用户头像
  async updateUserAvatar(avatarUrl, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [avatarUrl, userId])
    return result
  }
}

module.exports = new UserService()
