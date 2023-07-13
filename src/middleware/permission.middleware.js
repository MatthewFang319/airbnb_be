const { OPERATION_IS_NOT_ALLOWED } = require('../config/error')
const permissionService = require('../service/permission.service')

const verifyPermission = async (ctx, next) => {
  // 获取登录用户的id
  const { id } = ctx.user

  // 获取资源的name/id
  // name => moment/user/comment/label
  // params: { momentId: 4 }
  // keyName => momentId
  const keyName = Object.keys(ctx.params)[0]
  console.log(keyName)
  const resourceId = ctx.params[keyName]
  const resourceName = keyName.replace('Id', '')

  console.log(
    'keyname' + keyName,
    'resourceId' + resourceId,
    'resourceName' + resourceName
  )
  // 2.查询user的id是否有修改momentId的权限
  const isPermission = await permissionService.checkResouce(
    resourceName,
    resourceId,
    id
  )
  if (!isPermission) {
    return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
  }

  // 3.执行下一个中间件
  await next()
}
module.exports = {
  verifyPermission
}
