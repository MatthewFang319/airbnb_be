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
    return result.length > 0
  }

  async queryDate(homeId) {
    const statement =
      'SELECT o.startTime startTime,o.endTime endTime FROM `order` o WHERE home_id = ?'
    const [result] = await connection.execute(statement, [homeId])
    return result
  }

  async queryUserOrder(userId) {
    const statement = `	SELECT 
     o.id AS orderId, 
     o.home_id AS homeId, 
     o.startTime AS startTime, 
     o.endTime AS endTime,
     IF(COUNT(r.order_id) > 0, 1, 0) AS isReview
 FROM \`order\` o
 LEFT JOIN review r ON o.id = r.order_id
 WHERE o.user_id = ?
 GROUP BY o.id, o.home_id, o.startTime, o.endTime`
    const [result] = await connection.execute(statement, [userId])
    return result
  }

  async deleteOrder(order_id) {
    const statement = 'DELETE FROM `order` WHERE id = ?'
    const [result] = await connection.execute(statement, [order_id])
    return result
  }
}

module.exports = new orderService()
