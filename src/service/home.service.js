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

  // 查询基本信息
  async queryById(homeId) {
    const statement = `
    SELECT h.id id, h.title title, h.introduce introduce, h.tenant tenant, h.price price, h.star star, h.createAt createTime, h.updateAt updateTime, 
    COUNT(r.id) reviewCount,
    JSON_OBJECT('id', ht.id, 'name', ht.name) houseType,
    JSON_OBJECT('id', u.id, 'name', u.username, 'avatarURL', u.avatar_url) user,
    CASE WHEN hp.home_id IS NULL THEN NULL
      ELSE JSON_ARRAYAGG(hp.picture_url)
    END pictures,
   (
    SELECT JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name))
    FROM home_label hl
    JOIN label l ON hl.label_id = l.id
    WHERE hl.home_id = h.id
  ) labels
  FROM home h
  LEFT JOIN user u ON u.id = h.user_id
  LEFT JOIN house_type ht ON h.houseType_id = ht.id
  LEFT JOIN home_picture hp ON h.id = hp.home_id
  LEFT JOIN \`order\` o ON h.id = o.home_id
  LEFT JOIN review r ON o.id = r.order_id  
  WHERE h.id = ?
  GROUP BY h.id;`

    const [result] = await connection.execute(statement, [homeId])
    return result
  }

  async search(keyword, offset = 0, limit = 20, houseType_id) {
    const statement = `SELECT h.id id, h.title title, h.introduce introduce, h.price price, h.star star,
    COUNT(r.id) reviewCount,
    JSON_OBJECT('id', ht.id, 'name', ht.name) houseType,
      CASE WHEN hp.home_id IS NULL THEN NULL
    ELSE JSON_ARRAYAGG(hp.picture_url)
  END pictures,
    JSON_OBJECT('id', u.id, 'name', u.username, 'avatarURL', u.avatar_url) user
  FROM home h
  LEFT JOIN user u ON u.id = h.user_id
  LEFT JOIN house_type ht ON h.houseType_id = ht.id
  LEFT JOIN home_picture hp ON h.id = hp.home_id
  LEFT JOIN \`order\` o ON h.id = o.home_id
  LEFT JOIN review r ON o.id = r.order_id  
  WHERE (title LIKE ? OR introduce LIKE ?) ${
    houseType_id === undefined ? '' : 'AND houseType_id = ?'
  }
  GROUP BY h.id
  LIMIT ? OFFSET ?
  `
    const [result] =
      houseType_id === undefined
        ? await connection.execute(statement, [
            `%${keyword}%`,
            `%${keyword}%`,
            limit,
            offset
          ])
        : await connection.execute(statement, [
            `%${keyword}%`,
            `%${keyword}%`,
            houseType_id,
            limit,
            offset
          ])
    return result
  }
  async patch(id, params, data) {
    const statement = `UPDATE home SET ${params} = ? WHERE id = ?`
    const [result] = await connection.execute(statement, [data, id])
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

  async updateLabel(home_id, label_id) {
    const statement = `UPDATE home_label SET label_id = ? WHERE home_id = ?`
    const [result] = await connection.execute(statement, [label_id, home_id])
    return result
  }

  async deletePictures(home_id) {
    const statement = ' DELETE FROM `home_picture` WHERE home_id = ?;'
    const [result] = await connection.execute(statement, [home_id])
    return result
  }

  async deleteLabels(home_id, label_id) {
    const statement =
      'DELETE FROM `home_label` WHERE home_id = ? AND label_id = ?;'
    const [result] = await connection.execute(statement, [home_id, label_id])
    return result
  }

  async queryHomeType() {
    const statement = 'SELECT l.id, l.name FROM house_type l ORDER BY l.id'
    const [result] = await connection.execute(statement)
    console.log(result)
    return result
  }

  async quryHome(offset = 0, limit = 10, house_type) {
    const statement = `
    SELECT h.id id, h.title title, h.introduce introduce, h.price price, h.star star,
    COUNT(r.id) reviewCount,
    JSON_OBJECT('id', ht.id, 'name', ht.name) houseType,
		  CASE WHEN hp.home_id IS NULL THEN NULL
    ELSE JSON_ARRAYAGG(hp.picture_url)
  END pictures,
    JSON_OBJECT('id', u.id, 'name', u.username, 'avatarURL', u.avatar_url) user
  FROM home h
  LEFT JOIN user u ON u.id = h.user_id
  LEFT JOIN house_type ht ON h.houseType_id = ht.id
  LEFT JOIN home_picture hp ON h.id = hp.home_id
  LEFT JOIN \`order\` o ON h.id = o.home_id
  LEFT JOIN review r ON o.id = r.order_id  
  ${house_type === undefined ? '' : 'WHERE h.houseType_id=?'} 
  GROUP BY h.id
  LIMIT ? OFFSET ?;
    `

    const [result] = await (house_type === undefined
      ? connection.execute(statement, [String(limit), String(offset)])
      : connection.execute(statement, [
          String(house_type),
          String(limit),
          String(offset)
        ]))
    // console.log(result)
    return result
  }

  async quryHomeCount(house_type) {
    const statement = `SELECT * FROM home h ${
      house_type === undefined ? '' : 'WHERE h.houseType_id=?'
    } `

    const [result] = await (house_type === undefined
      ? connection.execute(statement)
      : connection.execute(statement, [String(house_type)]))

    return result.length
  }

  async querySearchCount(keyword, houseType_id) {
    const statement = `SELECT * FROM home h WHERE (title LIKE ? OR introduce LIKE ?) ${
      houseType_id === undefined ? '' : 'AND houseType_id = ?'
    }
  `
    const [result] =
      houseType_id === undefined
        ? await connection.execute(statement, [`%${keyword}%`, `%${keyword}%`])
        : await connection.execute(statement, [
            `%${keyword}%`,
            `%${keyword}%`,
            houseType_id
          ])
    return result.length
  }
  async queryUserHome(userId = 0, offset = 0, limit = 20) {
    const statement = `
    SELECT h.id id, h.title title, h.introduce introduce, h.star star,
    CASE WHEN hp.home_id IS NULL THEN NULL
        ELSE JSON_ARRAYAGG(hp.picture_url)
    END pictures
  FROM home h
  LEFT JOIN home_picture hp ON h.id = hp.home_id
  WHERE h.user_id = ?
  GROUP BY h.id
  LIMIT ? OFFSET ?;
    `
    const [result] = await connection.execute(statement, [
      userId,
      limit,
      offset
    ])
    return result
  }
  async queryUserHomeCount(userId) {
    const statement = `
    SELECT h.id id, h.title title, h.introduce introduce, h.star star,
    CASE WHEN hp.home_id IS NULL THEN NULL
        ELSE JSON_ARRAYAGG(hp.picture_url)
    END pictures
  FROM home h
  LEFT JOIN home_picture hp ON h.id = hp.home_id
  WHERE h.user_id = ?
  GROUP BY h.id;`
    const [result] = await connection.execute(statement, [userId])
    return result.length
  }
}

module.exports = new HomeService()
