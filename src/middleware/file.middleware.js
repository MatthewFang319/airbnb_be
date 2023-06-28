const multer = require('@koa/multer')
const { UPLOAD_PATH } = require('../config/path')

const uploadPicture = multer({
  dest: UPLOAD_PATH
})

// 上传头像的中间件
const handleAvatar = uploadPicture.single('avatar')

// 上传房源图的中间件
const handlePictures = uploadPicture.array('pictures')

module.exports = {
  handleAvatar,
  handlePictures
}
