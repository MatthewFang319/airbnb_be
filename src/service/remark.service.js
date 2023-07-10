const connection = require('../app/database')

class RemarkService {
  // 添加房源备注
  async create(collectionId, homeId, content) {
    const statement =
      'INSERT INTO `remark` (content, collection_id, home_id) VALUES (?, ?, ?);'
    const [result] = await connection.execute(statement, [
      content,
      collectionId,
      homeId
    ])
    return result
  }

  // 修改房源备注
  async update(remarkId, content) {
    const statement = 'UPDATE `remark` SET `content` = ? WHERE id = ?;'
    const [result] = await connection.execute(statement, [content, remarkId])
    return result
  }

  // 删除房源备注
  async delete(remarkId) {
    const statement = 'DELETE FROM `remark` WHERE id = ?;'
    const [result] = await connection.execute(statement, [remarkId])
    return result
  }

  // 获取备注内容
  async getRemark(remarkId) {
    const statement = `SELECT * FROM remark WHERE id = ?`
    const [result] = await connection.execute(statement, [remarkId])
    return result[0]
  }
}

module.exports = new RemarkService()
