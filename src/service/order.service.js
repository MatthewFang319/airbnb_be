const connection = require('../app/database')

class orderService {
  async add(homeId, id, content) {
    const statement =
      'INSERT INTO `order` (home_id, user_id, startTime,endTime ) VALUES (?, ?, ?, ?);'
    const [result] = await connection.execute(statement, [
      homeId,
      id,
      content.startTime,
      content.endTime
    ])
    return result
  }

  async tenant(id) {
    const statement = 'SELECT home.tenant tenant FROM home WHERE id = ?'
    const [result] = await connection.execute(statement, [id])
    return result
  }

  async orderSelf(homeId, userId) {
    console.log(homeId, userId)
    const statement = 'SELECT * FROM home WHERE id = ? AND user_id = ?'
    const [result] = await connection.execute(statement, [homeId, userId])
    console.log(result)
    return result.length > 0
  }

  async queryDate(homeId) {
    const statement =
      'SELECT o.startTime startTime,o.endTime endTime FROM `order` o WHERE home_id = ?'
    const [result] = await connection.execute(statement, [homeId])
    return result
  }
}

module.exports = new orderService()
