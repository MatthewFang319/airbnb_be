const connection = require('../app/database')

class FileService {
  async create(file) {
    const { filename, mimetype, size } = file
    const statement = `INSERT INTO picture (filename, mimetype, size) VALUES (?, ?, ?);`
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size
    ])
    return result
  }

  async createAvatar(filename, mimetype, size, userId) {
    const statement =
      'INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);'
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId
    ])
    return result
  }

  // 删除旧头像
  async cleanAvatar(userId, avatarId) {
    const statement = `DELETE FROM avatar WHERE user_id = ? AND id <> ?;`
    const [result] = await connection.execute(statement, [userId, avatarId])
    return result
  }

  // 根据新头像检索旧头像
  async queryOldAvatar(userId, avatarId) {
    const statement = 'SELECT * FROM avatar WHERE user_id = ? AND id <> ?;'
    const [result] = await connection.execute(statement, [userId, avatarId])
    return result
  }

  async queryAvatar(id) {
    const statement = 'SELECT * FROM avatar WHERE id = ?;'
    const [result] = await connection.execute(statement, [id])
    return result[0]
  }

  async queryPicture(id) {
    const statement = 'SELECT * FROM picture WHERE id = ?;'
    const [result] = await connection.execute(statement, [id])
    return result[0]
  }
}

module.exports = new FileService()
