const connection = require('../app/database')

class ReviewService {
  // 添加订单评价
  async create(orderId, content, star, userId) {
    const statement =
      'INSERT INTO `review` (content, order_id, star, user_id) VALUES (?, ?, ?, ?);'
    const [result] = await connection.execute(statement, [
      content,
      orderId,
      star,
      userId
    ])
    return result
  }

  // 修改订单评价
  async update(reviewId, content, star) {
    const statement =
      'UPDATE `review` SET `content` = ?, `star` = ? WHERE id = ?;'
    const [result] = await connection.execute(statement, [
      content,
      star,
      reviewId
    ])
    return result
  }

  // 删除订单评价
  async delete(reviewId) {
    console.log(reviewId)
    const statement = 'DELETE FROM `review` WHERE id = ?;'
    const [result] = await connection.execute(statement, [reviewId])
    return result
  }

  // 查询某个房源的所有评价
  async getHomeReview(homeId, size = '20', offset = '0') {
    const statement = `SELECT 
      r.id 'reviewId',
      JSON_OBJECT(
			'userId', u.id,
			'username', u.username,
			'avatarUrl', u.avatar_url) 'user',
      r.content,
      r.star,
      r.createAt,
      r.updateAt
    FROM \`order\` o
    INNER JOIN review r ON r.order_id = o.id
    INNER JOIN user u ON u.id = r.user_id
    WHERE home_id = ?
    LIMIT ? OFFSET ?;`
    const [result] = await connection.execute(statement, [homeId, size, offset])
    return result
  }

  // 查询某个房源的所有评价个数
  async getHomeReviewCount(homeId) {
    const statement = `SELECT * FROM \`order\` o
    INNER JOIN review r ON r.order_id = o.id
    INNER JOIN user u ON u.id = r.user_id
    WHERE home_id = ?`

    const [result] = await connection.execute(statement, [homeId])
    return result.length
  }
  // 根据订单查询评价
  async getReviewByOrder(orderId, userId) {
    const statement = `SELECT * FROM review WHERE order_id = ? AND user_id = ?;`
    const [result] = await connection.execute(statement, [orderId, userId])
    return result
  }
}

module.exports = new ReviewService()
