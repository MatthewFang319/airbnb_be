const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const registerRouters = require('../router')
const cors = require('koa2-cors')

const app = new Koa()
app.use(cors())
app.use(bodyParser())

registerRouters(app)

module.exports = app
