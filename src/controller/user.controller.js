const fs = require('fs')
const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { UPLOAD_PATH } = require('../config/path')

class UserController {
    
    async create(ctx, next) {
        const user = ctx.request.body
        const result = await userService.create(user)
        const data = {
            userId: result.insertId,
            username: user.username,
            identity: user.identity
        }
        ctx.body = {
            code: 200,
            msg: "创建用户成功",
            data: data
        }
    }

    async getInfo(ctx, next){
        // 1.获取用户id
        const { userId } = ctx.params
        // 2.获取用户信息
        const avatarInfo = await fileService.queryAvatarWithUserId(userId)
        // 3.返回用户信息
    }

    async updateUserInfo(ctx, next){
        // 1.获取用户id
        const { userId } = ctx.params
        // 2.获取用户信息

        // 3.返回用户信息
    }

    async showAvatarImage(ctx, next) {
        // 1.获取用户id
        const { userId } = ctx.params

        // 2.获取userId对应头像信息
        const avatarInfo = await fileService.queryAvatarWithUserId(userId)

        // 3.读取头像所在的文件
        const { filename, mimetype } = avatarInfo
        ctx.type = mimetype
        ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
    }
}
module.exports = new UserController()