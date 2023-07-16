const connection = require('../app/database')
class CollectionService {
  async create(name, userId) {
    const statement = 'INSERT INTO `collection` (name, user_id) VALUES (?, ?);'
    const [result] = await connection.execute(statement, [name, userId])
    return result
  }

  async update(name, collectionId) {
    const statement = 'UPDATE `collection` SET `name` = ? WHERE id = ?;'
    const [result] = await connection.execute(statement, [name, collectionId])
    return result
  }

  async delete(collectionId) {
    const statement = 'DELETE FROM `collection` WHERE id = ?;'
    const [result] = await connection.execute(statement, [collectionId])
    return result
  }

  // 判断心愿单中是否有对应房源
  async hasHome(collectionId, homeId) {
    const statement =
      'SELECT * FROM home_collection WHERE collection_id = ? AND home_id = ?'
    const [result] = await connection.execute(statement, [collectionId, homeId])
    return result[0]
  }

  // 收藏房源
  async collectHome(collectionId, homeId) {
    const statement =
      'INSERT INTO `home_collection` (collection_id, home_id) VALUES (?, ?);'
    const [result] = await connection.execute(statement, [collectionId, homeId])
    return result
  }

  // 取消收藏房源
  async uncollectHome(collectionId, homeId) {
    const statement =
      'DELETE FROM `home_collection` WHERE collection_id = ? AND home_id = ?;'
    const [result] = await connection.execute(statement, [collectionId, homeId])
    return result
  }

  // 根据id获取心愿单
  async getCollectionById(id) {
    const statement = `SELECT * FROM collection WHERE id = ?`
    const [result] = await connection.execute(statement, [id])
    return result[0]
  }

  // 获取心愿单详情
  async getCollectionDetail(id) {
    const statement = `SELECT 
      collection.id,
      collection.name,
      COUNT(home.id) AS 'count',
      CASE
        WHEN COUNT(home.id) != 0 THEN (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', home.id, 
              'title', home.title, 
              'star', home.star, 
              'reviewCount', (SELECT COUNT(*) FROM \`order\` o JOIN review r ON r.order_id = o.id WHERE o.home_id = home.id),
              'remark', CASE WHEN remark.id IS NOT NULL THEN JSON_OBJECT('id',remark.id,'content',remark.content) ELSE JSON_OBJECT() END,
              'pictures', (SELECT CASE WHEN COUNT(hp.id) != 0 THEN JSON_ARRAYAGG(hp.picture_url) ELSE JSON_ARRAY() END FROM home_picture AS hp WHERE hp.home_id = home.id)
            ))
            FROM home_collection AS hc 
            INNER JOIN home ON hc.home_id = home.id
            LEFT JOIN remark ON hc.collection_id = remark.collection_id AND hc.home_id = remark.home_id
            WHERE collection.id = hc.collection_id
          )
        ELSE JSON_ARRAY()
      END AS 'homes'
    FROM collection
    INNER JOIN home_collection AS hc ON collection.id = hc.collection_id
    INNER JOIN home ON hc.home_id = home.id
    WHERE collection.id = ?
    GROUP BY collection.id;`
    const [result] = await connection.execute(statement, [id])
    return result[0]
  }

  // 获取用户的心愿单列表
  async getList(userId) {
    const statement = `SELECT 
      collection.id,
      collection.name,
      COUNT(home.id) AS 'count',
      CASE
        WHEN COUNT(home.id) != 0 THEN (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', home.id, 
              'title', home.title, 
              'pictures', (SELECT CASE WHEN COUNT(hp.id) != 0 THEN JSON_ARRAYAGG(hp.picture_url) ELSE JSON_ARRAY() END FROM home_picture AS hp WHERE hp.home_id = home.id)
            ))
            FROM home_collection AS hc 
            INNER JOIN home ON hc.home_id = home.id
            WHERE collection.id = hc.collection_id
          )
        ELSE JSON_ARRAY()
      END AS 'homes'
    FROM collection
    INNER JOIN home_collection AS hc ON collection.id = hc.collection_id
    INNER JOIN home ON hc.home_id = home.id
    WHERE collection.user_id = ?
    GROUP BY collection.id;`
    const [result] = await connection.execute(statement, [userId])
    return result
  }

  // 根据homeid和userId查询用户是否收藏过
  async judgeStarOrnot(userId, homeId) {
    const statement = `SELECT hc.*
    FROM home_collection hc
    JOIN collection c on hc.collection_id = c.id
    WHERE c.user_id = ? AND hc.home_id = ?;`

    const [result] = await connection.execute(statement, [userId, homeId])

    return result.length > 0 ? 1 : 0
  }
}

module.exports = new CollectionService()
