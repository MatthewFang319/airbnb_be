const mysql = require('mysql2')

const connectionPool = mysql.createPool({
  host: '43.139.230.42',
  port: 3306,
  database: 'airbnb',
  user: 'root',
  password: 'Cws88895865!',
  connectionLimit: 7,
  connectTimeout: 10000 // 增加连接超时时间为10秒
})

connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log('获取连接失败：', err)
    return
  }
  connection.connect(err => {
    if (err) {
      console.log('和数据库交互失败：', err)
    } else {
      console.log('数据库连接成功, 可以操作数据库~')
    }
  })
})

const connection = connectionPool.promise()

module.exports = connection
