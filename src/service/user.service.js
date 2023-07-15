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

  // 查看该用户是否为房东
  async checkLandlord(userId) {
    const statement = `SELECT user.identity identity FROM user WHERE id = ?`
    const [result] = await connection.execute(statement, [userId])
    return result
  }

  // 查看用户的评价
  async getUserReview(id) {
    const statement = `
    SELECT review.content as content, review.createAt as createTime,
       (
          SELECT JSON_OBJECT('id', user.id, 'avatar_url', user.avatar_url, 'username', user.username) 
          FROM user 
          WHERE user.id = review.user_id
       ) AS user
FROM user
LEFT JOIN home ON user.id = home.user_id
LEFT JOIN \`order\` ON home.id = order.home_id
LEFT JOIN review ON order.id = review.order_id
WHERE user.id = ? AND order.id IS NOT NULL AND review.content IS NOT NULL;`
    const [result] = await connection.execute(statement, [id])
    return result
  }
}

module.exports = new UserService()
