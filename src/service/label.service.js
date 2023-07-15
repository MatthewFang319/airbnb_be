const connection = require('../app/database')

class labelService {
  async get() {
    const statement = `SELECT label.id id, label.name, name FROM label`
    const [result] = await connection.execute(statement)
    return result
  }

  async add(name) {
    const statement = 'INSERT INTO `label` (name) VALUES (?);'
    const [result] = await connection.execute(statement, [name])
    return result
  }
}

module.exports = new labelService()
