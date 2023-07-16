const KoaRouter = require('@koa/router')
const { getSlider } = require('../controller/slider.controller')

const sliderRouter = new KoaRouter({ prefix: '/slider' })

sliderRouter.get('/', getSlider)

module.exports = sliderRouter
