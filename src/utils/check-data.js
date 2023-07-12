// 检查字数

const userService = require('../service/user.service')

/**
 * 检查字符串长度是否符合要求
 * @param {number} length 字符串长度
 * @param {*} string 参数
 * @returns true为符合要求
 */
const checkLength = (length, string) => {
  return string.length < length
}

/**
 * 检查是否缺少必要参数
 * @param {Array} requiredParams 必传的参数
 * @param {object} content 被检查的对象
 * @returns true为没问题，false为有问题
 */
const CheckIfMissing = (requiredParams, content) => {
  const missingParams = requiredParams.filter(param => !content[param])

  return missingParams <= 0
}

const checkAdmin = async userId => {
  const [result] = await userService.checkLandlord(userId)
  return result.identity > 1
}

const transferToSeconds = time => {
  return new Date(time).getTime()
}
module.exports = {
  checkAdmin,
  checkLength,
  CheckIfMissing,
  transferToSeconds
}
