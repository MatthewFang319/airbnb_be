const multer = require('@koa/multer')
const { UPLOAD_PATH } = require('../config/path')
const { LIMIT_UNEXPECTED_FILE } = require('../config/error')

const uploadPicture = multer({
  dest: UPLOAD_PATH
})

// 上传头像的中间件
const handleAvatar = uploadPicture.single('avatar')

// 上传房源图的中间件
const handlePictures = uploadPicture.array('pictures')

const FileErrorCatcher = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return ctx.app.emit('error', LIMIT_UNEXPECTED_FILE, ctx)
    }
  }
}

module.exports = {
  handleAvatar,
  handlePictures,
  FileErrorCatcher
}
