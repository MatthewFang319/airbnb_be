const {
  MISSING_REQUIRED_PARAMS,
  TITLE_LENGTH_EXCEEDS,
  HOME_PICTURE_ERROR,
  HOME_PICTURE_EMPTY
} = require('../config/error')
const { HOME_PARAMS, HOME_TITLE_LENGTH } = require('../constant/home')
const homeService = require('../service/home.service')
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

const updatePictures = async (ctx, next) => {
  const content = ctx.request.body
  const { homeId } = ctx.params
  console.log(content)
  try {
    if ('pictures' in content) {
      await homeService.deletePictures(homeId)
      Promise.all(
        content.pictures.map(item => {
          return homeService.addPicture(homeId, item)
        })
      )
      await next()
    } else await next()
  } catch (error) {
    console.log(error)
    return ctx.app.emit('error', HOME_PICTURE_ERROR, ctx)
  }
}

const updateLabel = async (ctx, next) => {
  const content = ctx.request.body
  const { homeId } = ctx.params
  try {
    if ('labels' in content) {
      await homeService.deleteLabels(homeId)
      Promise.all(
        content.labels.map(item => {
          return homeService.addLabel(homeId, item)
        })
      )

      await next()
    } else await next()
  } catch (error) {
    console.log(error)
    return ctx.app.emit('error', HOME_PICTURE_ERROR, ctx)
  }
}
module.exports = { checkHomeData, updatePictures, updateLabel }
