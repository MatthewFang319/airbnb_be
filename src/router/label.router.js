const KoaRouter = require('@koa/router')
const { getLabel, add } = require('../controller/label.controller')
const { verifyAdmin } = require('../middleware/user.middleware')
// const { verify } = require('jsonwebtoken')
const { verifyAuth } = require('../middleware/login.middleware')

const labelRouter = new KoaRouter({ prefix: '/label' })

labelRouter.get('/', getLabel)
labelRouter.post('/add', verifyAuth, verifyAdmin, add)

module.exports = labelRouter
