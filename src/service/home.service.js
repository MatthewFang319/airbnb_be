// const connection = require('../app/database')

class HomeService {
  async create(content, userId) {
    console.log(content, userId)
    // const statement = 'INSERT INTO `home` (user_id, title, introduce, price, region_id, ) VALUES (?, ?, ?);'
    // const [result] = await connection.execute(statement, [content, userId])
    // return result
  }
}

module.exports = new HomeService()
