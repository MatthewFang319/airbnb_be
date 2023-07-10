const connection = require('../app/database')

class HouseTypeService {
  async getList() {
    const statement = 'SELECT * FROM `house_type`;'
    const [result] = await connection.execute(statement)
    return result
  }
}

module.exports = new HouseTypeService()
