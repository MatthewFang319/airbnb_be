const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const registerRouters = require('../router')
const cors = require('koa2-cors')

const fs = require('fs')
const path = require('path')
const { format } = require('date-fns')
const { utcToZonedTime } = require('date-fns-tz')

// 创建日志文件路径
const logFilePath = path.join(__dirname, '../../logs/logs.log')

// 检查日志文件是否存在，如果不存在则创建
if (!fs.existsSync(logFilePath)) {
  fs.writeFileSync(logFilePath, '')
}

const app = new Koa()
app.use(cors())
app.use(bodyParser())
// 打印请求信息
app.use(async (ctx, next) => {
  // 获取当前时间并转换为中国大陆时区（东八区）
  const currentDate = utcToZonedTime(new Date(), 'Asia/Shanghai')

  // 格式化日期和时间
  const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss.SSS')

  // 记录请求的方法、URL、请求头和请求体
  const logMessage = `${formattedDate} - 收到 ${ctx.method} 请求：${
    ctx.url
  }，请求头：${JSON.stringify(ctx.request.headers)}，请求体：${JSON.stringify(
    ctx.request.body
  )}`

  // 追加一行到日志文件
  fs.appendFileSync(logFilePath, logMessage + '\n')

  await next()
})
registerRouters(app)

module.exports = app
