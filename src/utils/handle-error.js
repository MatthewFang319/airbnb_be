const app = require('../app')
const {
  INVALID_REQUEST_BODY,
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
  OPERATION_IS_NOT_ALLOWED,
  INVALID_FILE_TYPE,
  DATA_INSERTION_FAILED,
  USER_IS_NOT_EXISTS,
  HOME_IS_NOT_EXISTS,
  COLLECTION_IS_NOT_EXISTS,
  HOUSETYPE_IS_NOT_EXISTS,
  LABLE_IS_NOT_EXISTS,
  REVIEW_IS_NOT_EXISTS,
  REMARK_IS_NOT_EXISTS,
  TITLE_LENGTH_EXCEEDS,
  MISSING_REQUIRED_PARAMS,
  HOME_PICTURE_ERROR,
  HOME_PICTURE_EMPTY,
  HOME_LABEL_EMPTY,
  UNKNOW_ERROR
} = require('../config/error')

app.on('error', (error, ctx) => {
  let code = 0
  let msg = ''

  switch (error) {
    case UNKNOW_ERROR:
      code = 400
      msg = '发生未知错误,请检查传参'
      break
    case INVALID_REQUEST_BODY:
      code = -1000
      msg = '传入不合理参数'
      break
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      msg = '用户名或者密码不能为空'
      break
    case NAME_IS_ALREADY_EXISTS:
      code = -1002
      msg = '用户名已存在'
      break
    case NAME_IS_NOT_EXISTS:
      code = -1003
      msg = '用户名不存在'
      break
    case PASSWORD_IS_INCORRENT:
      code = -1004
      msg = '密码错误'
      break
    case UNAUTHORIZATION:
      code = -1005
      msg = '无效的token或者token已经过期'
      break
    case OPERATION_IS_NOT_ALLOWED:
      code = -2001
      msg = '没有操作该资源的权限'
      break
    case USER_IS_NOT_EXISTS:
      code = -3001
      msg = '不存在该用户'
      break
    case HOME_IS_NOT_EXISTS:
      code = -3002
      msg = '不存在该房源'
      break
    case COLLECTION_IS_NOT_EXISTS:
      code = -3003
      msg = '不存在该心愿单'
      break
    case HOUSETYPE_IS_NOT_EXISTS:
      code = -3004
      msg = '传入了不存在的房型'
      break
    case LABLE_IS_NOT_EXISTS:
      code = -3005
      msg = '传入了不存在的标签'
      break
    case REVIEW_IS_NOT_EXISTS:
      code = -3006
      msg = '传入了不存在的评价'
      break
    case REMARK_IS_NOT_EXISTS:
      code = -3007
      msg = '不存在该备注'
      break
    case INVALID_FILE_TYPE:
      code = -2002
      msg = '存在错误的文件类型'
      break
    case TITLE_LENGTH_EXCEEDS:
      code = 400
      msg = '标题长度不得超过20'
      break
    case DATA_INSERTION_FAILED:
      code = 400
      msg = '插入数据失败，请检查参数的格式'
      break
    case HOME_PICTURE_EMPTY:
      code = 400
      msg = '图片不能为空'
      break
    case HOME_LABEL_EMPTY:
      code = 400
      msg = '标签为空'
      break
    case MISSING_REQUIRED_PARAMS:
      code = 400
      msg = '缺失必传参数'
      break
    case HOME_PICTURE_ERROR:
      code = 400
      msg = '传入图片格式有误'
      break
  }

  ctx.body = { code, msg }
})
