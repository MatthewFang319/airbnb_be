const KoaRouter = require('@koa/router')
const homeRouter = new KoaRouter({ prefix: '/home' })
const { verifyAuth, getTokenUser } = require('../middleware/login.middleware')
const { verifyAdmin } = require('../middleware/user.middleware')
const {
  create,
  update,
  detail,
  getType,
  queryHome
} = require('../controller/home.controller')
const {
  checkHomeData,
  updatePictures,
  updateLabel
} = require('../middleware/home.middleware')
const { verifyPermission } = require('../middleware/permission.middleware')

homeRouter.post('/', verifyAuth, verifyAdmin, checkHomeData, create)
homeRouter.get('/', getTokenUser, queryHome)
homeRouter.patch(
  '/:homeId',
  verifyAuth,
  verifyPermission,
  updatePictures,
  updateLabel,
  update
)
homeRouter.get('/type', getType)

homeRouter.get('/detail/:homeId', getTokenUser, detail)

module.exports = homeRouter
