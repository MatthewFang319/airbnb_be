const KoaRouter = require('@koa/router')
const homeRouter = new KoaRouter({ prefix: '/home' })
const { verifyAuth, getTokenUser } = require('../middleware/login.middleware')
const { verifyAdmin } = require('../middleware/user.middleware')
const {
  create,
  update,
  detail,
  getType,
  queryHome,
  getAdminHome,
  search
} = require('../controller/home.controller')
const {
  checkHomeData,
  updatePictures,
  updateLabel
} = require('../middleware/home.middleware')
const { verifyPermission } = require('../middleware/permission.middleware')
const { getHomeReview } = require('../controller/review.controller')

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
homeRouter.get('/landlord/:userId', getAdminHome)
homeRouter.get('/search', getTokenUser, search)
// 获取房源评价列表
homeRouter.get('/review/:homeId', getHomeReview)
module.exports = homeRouter
