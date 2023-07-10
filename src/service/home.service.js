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

  async addPicture(id, picture) {
    const statement =
      'INSERT INTO `home_picture` (home_id,picture_url) VALUES (?, ?);'
    const [result] = await connection.execute(statement, [id, picture])
    return result
  }

  async addLabel(home_id, label_id) {
    const statement =
      'INSERT INTO `home_label` (home_id,label_id) VALUES (?, ?);'
    const [result] = await connection.execute(statement, [home_id, label_id])
    return result
  }
}

module.exports = new HomeService()
