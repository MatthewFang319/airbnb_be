const KoaRouter = require('@koa/router')
const avatarRouter = new KoaRouter({ prefix: '/avatar' })
const { verifyAuth } = require('../middleware/login.middleware')
const { handleAvatar } = require('../middleware/file.middleware')
const {
  uploadAvatar,
  showAvatarImage
} = require('../controller/file.controller')

// 上传头像
avatarRouter.post('/', verifyAuth, handleAvatar, uploadAvatar)

// 查看头像
avatarRouter.get('/:filename', showAvatarImage)

module.exports = avatarRouter
