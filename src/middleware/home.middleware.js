const checkHomeData = async (ctx, next) => {
  console.log('当前处于检查阶段', ctx.request.body)
  await next()
}
module.exports = { checkHomeData }
