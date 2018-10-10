const Music = require('../models').Music

const getMusic = async (ctx, next) => {
  const music = await Music.findAll()
  ctx.status = 200
  ctx.body = { music: music }
}

const createMusic = async (ctx, next) => {
  const { music } = ctx.request.body
  const response = await Music.create(music)
  ctx.status = 200
  ctx.body = { response }
}

module.exports = {
  getMusic,
  createMusic
}
