const KoaRouter = require('@koa/router')
const pictureRouter = new KoaRouter({ prefix: '/picture' })
const { verifyAuth } = require('../middleware/login.middleware')
const {
  handlePictures,
  FileErrorCatcher
} = require('../middleware/file.middleware')
const { uploadPictures, showPicture } = require('../controller/file.controller')

// 上传图片
pictureRouter.post(
  '/',
  verifyAuth,
  FileErrorCatcher,
  handlePictures,
  uploadPictures
)

// 查看图片
pictureRouter.get('/:id', showPicture)

module.exports = pictureRouter
