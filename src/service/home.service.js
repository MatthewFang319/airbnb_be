const connection = require('../app/database')

class HomeService {
  async create(content, userId) {
    // console.log(content, userId)
    const statement =
      'INSERT INTO `home` (user_id, title, introduce, price, houseType_id,tenant ) VALUES (?, ?, ?, ?, ?, ?);'
    const [result] = await connection.execute(statement, [
      userId,
      content.title,
      content.introduce,
      content.price,
      content.houseType_id,
      content.tenant
    ])
    return result
  }
}

module.exports = new HomeService()
