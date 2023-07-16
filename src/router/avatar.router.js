const KoaRouter = require('@koa/router')
const avatarRouter = new KoaRouter({ prefix: '/avatar' })
const { verifyAuth } = require('../middleware/login.middleware')
const {
  handleAvatar,
  FileErrorCatcher
} = require('../middleware/file.middleware')
const {
  uploadAvatar,
  showAvatarImage
} = require('../controller/file.controller')

// 上传头像
avatarRouter.post('/', verifyAuth, FileErrorCatcher, handleAvatar, uploadAvatar)

// 查看头像
avatarRouter.get('/:id', showAvatarImage)

module.exports = avatarRouter
