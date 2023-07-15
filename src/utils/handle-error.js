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
  UNKNOW_ERROR,
  USER_NOT_ADMIN,
  TENANT_EXCEED,
  ORDER_SELF,
  START_GREATER_END,
  ORDER_EXISTED,
  AVATAR_LENGTH_EXCEEDS,
  PET_LENGTH_EXCEEDS,
  CAREER_LENGTH_EXCEEDS,
  SCHOOL_LENGTH_EXCEEDS,
  SKILL_LENGTH_EXCEEDS,
  PROFILE_LENGTH_EXCEEDS,
  UNVALID_DATE,
  LABEL_IS_EXISTED,
  ORDER_IS_NOT_EXISTED
} = require('../config/error')
const {
  USER_AVATAR_LENGTH,
  USER_PROFILE_LENGTH,
  USER_SKILL_LENGTH,
  USER_SCHOOL_LENGTH,
  USER_CAREER_LENGTH,
  USER_PET_LENGTH
} = require('../constant/user')

app.on('error', (error, ctx) => {
  let code = 0
  let msg = ''

  switch (error) {
    case ORDER_IS_NOT_EXISTED:
      code = 400
      msg = '该订单不存在'
      break
    case LABEL_IS_EXISTED:
      code = 400
      msg = '该标签已存在'
      break
    case UNVALID_DATE:
      code = 400
      msg = '日期不符合格式'
      break
    case ORDER_EXISTED:
      code = 400
      msg = '该时间段已被预约'
      break
    case START_GREATER_END:
      code = 400
      msg = '开始时间不得大于结束时间'
      break
    case ORDER_SELF:
      code = 400
      msg = '不可订阅本人房源'
      break
    case UNKNOW_ERROR:
      code = 400
      msg = '服务器内部错误'
      break
    case INVALID_REQUEST_BODY:
      code = 400
      msg = '传入不合理参数'
      break
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = 400
      msg = '用户名或者密码不能为空'
      break
    case NAME_IS_ALREADY_EXISTS:
      code = 400
      msg = '用户名已存在'
      break
    case NAME_IS_NOT_EXISTS:
      code = 400
      msg = '用户名不存在'
      break
    case PASSWORD_IS_INCORRENT:
      code = 400
      msg = '密码错误'
      break
    case UNAUTHORIZATION:
      code = 401
      msg = '无效的token或者token已经过期'
      break
    case OPERATION_IS_NOT_ALLOWED:
      code = 403
      msg = '没有操作该资源的权限'
      break
    case USER_IS_NOT_EXISTS:
      code = 400
      msg = '不存在该用户'
      break
    case HOME_IS_NOT_EXISTS:
      code = 400
      msg = '不存在该房源'
      break
    case COLLECTION_IS_NOT_EXISTS:
      code = 400
      msg = '不存在该心愿单'
      break
    case HOUSETYPE_IS_NOT_EXISTS:
      code = 400
      msg = '传入了不存在的房型'
      break
    case LABLE_IS_NOT_EXISTS:
      code = 400
      msg = '传入了不存在的标签'
      break
    case REVIEW_IS_NOT_EXISTS:
      code = 400
      msg = '传入了不存在的评价'
      break
    case REMARK_IS_NOT_EXISTS:
      code = 400
      msg = '不存在该备注'
      break
    case INVALID_FILE_TYPE:
      code = 400
      msg = '存在错误的文件类型'
      break
    case AVATAR_LENGTH_EXCEEDS:
      code = 400
      msg = `avatarUrl参数长度不得超过${USER_AVATAR_LENGTH}`
      break
    case PET_LENGTH_EXCEEDS:
      code = 400
      msg = `pet参数长度不得超过${USER_PET_LENGTH}`
      break
    case CAREER_LENGTH_EXCEEDS:
      code = 400
      msg = `carrer参数长度不得超过${USER_CAREER_LENGTH}`
      break
    case SCHOOL_LENGTH_EXCEEDS:
      code = 400
      msg = `school参数长度不得超过${USER_SCHOOL_LENGTH}`
      break
    case SKILL_LENGTH_EXCEEDS:
      code = 400
      msg = `skill参数长度不得超过${USER_SKILL_LENGTH}`
      break
    case PROFILE_LENGTH_EXCEEDS:
      code = 400
      msg = `profile参数长度不得超过${USER_PROFILE_LENGTH}`
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
    case USER_NOT_ADMIN:
      code = 403
      msg = '用户不是房东'
      break
    case TENANT_EXCEED:
      code = 400
      msg = '入住人数超出限定人数'
      break
  }

  ctx.body = { code, msg }
})
