const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const registerRouters = require('../router')

const cors = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', ctx.header.origin)
  ctx.set('Access-Control-Allow-Headers', 'content-type')
  ctx.set(
    'Access-Control-Allow-Methods',
    'POST,GET,OPTIONS,HEAD,PUT,DELETE,PATCH'
  ) // 支持的方法
  ctx.set('Access-Control-Allow-Credentials', 'true') // 允许传入Cookie

  // 通过预检请求
  if (ctx.request.method === 'OPTIONS') {
    ctx.status = 204
    return
  }
  await next()
}

const app = new Koa()
app.use(cors)
app.use(bodyParser())
registerRouters(app)

module.exports = app
