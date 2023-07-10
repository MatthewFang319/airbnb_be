const {
  MISSING_REQUIRED_PARAMS,
  TITLE_LENGTH_EXCEEDS,
  HOME_PICTURE_ERROR,
  HOME_PICTURE_EMPTY
} = require('../config/error')
const { HOME_PARAMS, HOME_TITLE_LENGTH } = require('../constant/home')
const { CheckIfMissing, checkLength } = require('../utils/check-data')

const checkHomeData = async (ctx, next) => {
  const content = ctx.request.body
  // 判断是否缺少必传参数
  if (!CheckIfMissing(HOME_PARAMS, content))
    return ctx.app.emit('error', MISSING_REQUIRED_PARAMS, ctx)
  // 判断标题长度
  if (!checkLength(HOME_TITLE_LENGTH, content.title))
    return ctx.app.emit('error', TITLE_LENGTH_EXCEEDS, ctx)

  // 判断图片格式
  if (!Array.isArray(content.pictures))
    return ctx.app.emit('error', HOME_PICTURE_ERROR, ctx)
  if (content.pictures.length === 0) {
    return ctx.app.emit('error', HOME_PICTURE_EMPTY, ctx)
  }

  await next()
}
module.exports = { checkHomeData }
