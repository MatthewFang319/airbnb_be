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

// 将xxxx-xx-xx改成utc格式
function formatDate(date, flag = true) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1 // 因为JS中月份索引从0开始，所以+1
  let day = date.getDate()

  // 如果月或日小于10，前面添加'0'
  month = (month < 10 ? '0' : '') + month
  day = (day < 10 ? '0' : '') + day

  let date2 = `${year}-${month}-${day}`
  if (flag) return new Date(date2)
  return date2
}

// 判断日期是否符合要求
const validateDate = date => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/
  if (!regEx.test(date)) {
    return false
  }

  const splitDate = date.split('-')
  const year = parseInt(splitDate[0], 10)
  const month = parseInt(splitDate[1], 10)
  const day = parseInt(splitDate[2], 10)

  if (
    year < 1000 ||
    year > 9999 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return false
  }

  return true
}

module.exports = {
  validateDate,
  checkAdmin,
  checkLength,
  CheckIfMissing,
  formatDate
}
