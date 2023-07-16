const fs = require('fs')
const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { SERVER_PORT, SERVER_HOST } = require('../config/server')
const { UPLOAD_PATH } = require('../config/path')
const {
  INVALID_FILE_TYPE,
  AVATAR_IS_NOT_EXISTS,
  INVALID_FILES_QUANTITY,
  PICTURE_IS_NOT_EXISTS
} = require('../config/error')

class FileController {
  // 上传图片
  async uploadPictures(ctx) {
    // 获取对应的信息
    const pictures = ctx.request.files
    if (!pictures.length) {
      return ctx.app.emit('error', INVALID_FILES_QUANTITY, ctx)
    }
    // 存储图片信息
    let overflow = 0
    let wrongType = 0
    pictures.map(item => {
      if (item.size > 200 * 1024 * 1024) overflow++
      if (item.mimetype.split('/')[0] != 'image') wrongType++
    })
    if (wrongType) {
      return ctx.app.emit('error', INVALID_FILE_TYPE, ctx)
    } else if (overflow) {
      ctx.body = {
        code: 400,
        msg: '图片文件大小不可超过200M'
      }
    } else {
      const result = await Promise.all(
        pictures.map(item => fileService.create(item))
      )
      const data = result.map(
        item => `${SERVER_HOST}:${SERVER_PORT}/picture/${item.insertId}`
      )
      // 返回结果
      ctx.body = {
        code: 200,
        msg: '上传成功',
        data
      }
    }
  }

  async showPicture(ctx) {
    const { id } = ctx.params
    const result = await fileService.queryPicture(id)
    if (!result.length) {
      return ctx.app.emit('error', PICTURE_IS_NOT_EXISTS, ctx)
    }
    const { filename, mimetype } = result[0]
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
  }

  // 上传头像
  async uploadAvatar(ctx) {
    const { filename, mimetype, size } = ctx.request.file
    const { id } = ctx.user
    // 存储头像信息
    const result = await fileService.createAvatar(filename, mimetype, size, id)
    // 将头像地址存入user表中
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/avatar/${result.insertId}`
    await userService.updateUserAvatar(avatarUrl, id)
    // 找到旧的头像并删除
    const oldAvatar = await fileService.queryOldAvatar(id, result.insertId)
    // 删除图片文件
    oldAvatar.forEach(item => {
      fs.unlink(`${UPLOAD_PATH}/${item.filename}`, () => {
        console.log(`删除文件：${item.filename}`)
      })
    })
    // 将数据库中数据删除
    await fileService.cleanAvatar(id, result.insertId)
    ctx.body = {
      code: 200,
      msg: '头像上传成功~',
      data: { avatarUrl }
    }
  }

  // 查看头像
  async showAvatarImage(ctx) {
    const { id } = ctx.params
    const result = await fileService.queryAvatar(id)
    if (!result.length) {
      return ctx.app.emit('error', AVATAR_IS_NOT_EXISTS, ctx)
    }
    const { filename, mimetype } = result[0]
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
  }
}

module.exports = new FileController()
