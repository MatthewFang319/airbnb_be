const connection = require('../app/database')

class RegionService {
  async getList() {
    const statement = 'SELECT * FROM `region`;'
    const [result] = await connection.execute(statement)
    return result
  }
}

module.exports = new RegionService()
