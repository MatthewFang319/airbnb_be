const connection = require('../app/database')
class CollectionService {
  async create(name, userId) {
    const statement = 'INSERT INTO `collection` (name, user_id) VALUES (?, ?);'
    const [result] = await connection.execute(statement, [name, userId])
    return result
  }
  async delete(collectionId) {
    const statement = 'DELETE FROM `collection` WHERE id = ?;'
    const [result] = await connection.execute(statement, [collectionId])
    return result
  }
  async hasHome(collectionId, homeId) {
    const statement =
      'SELECT * FROM home_collection WHERE collection_id = ? AND home_id = ?'
    const [result] = await connection.execute(statement, [collectionId, homeId])
    return result
  }
  // 收藏房源
  async collectHome(collectionId, homeId) {
    const statement =
      'INSERT INTO `home_collection` (collection_id, home_id) VALUES (?, ?);'
    const [result] = await connection.execute(statement, [collectionId, homeId])
    return result
  }

  // 根据id获取心愿单
  async getCollectionById(id) {
    const statement = `SELECT * FROM collection WHERE id = ?`
    const [result] = await connection.execute(statement, [id])
    return result
  }

  // 获取用户的心愿单列表
  async getList(userId) {
    const statement = `SELECT 
        collection.id AS collection_id,
        collection.user_id,
        GROUP_CONCAT(home.id) AS home_ids,
        GROUP_CONCAT(home.other_info) AS home_infos
    FROM 
        collection
    INNER JOIN 
        home_collection ON collection.id = home_collection.collection_id
    INNER JOIN 
        home ON home_collection.home_id = home.id
    WHERE 
        collection.user_id = ?
    GROUP BY 
        collection.id;`
    const [result] = await connection.execute(statement, [userId])
    return result
  }
}

module.exports = new CollectionService()
