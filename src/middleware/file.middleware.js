const multer = require('@koa/multer')
const path = require('path')
const { UPLOAD_PATH } = require('../config/path')

// 定义存储引擎
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(req, file)
    cb(null, UPLOAD_PATH) // 指定存储目录
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname) // 获取原始文件后缀名
    cb(null, file.fieldname + '_' + Date.now() + extname) // 自定义文件名，并加上后缀名
  }
})

const uploadPicture = multer({
  dest: UPLOAD_PATH,
  storage
})

// 上传头像的中间件
const handleAvatar = uploadPicture.single('avatar')

// 上传房源图的中间件
const handlePicture = uploadPicture.array('pictures')

module.exports = {
  handleAvatar,
  handlePicture
}
