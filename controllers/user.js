const User = require('../models').User

const getUser = async (ctx, next) => {
  const userId = ctx.params.userId
  const user = await User.findById(userId, {
    include: [
      { model: User, as: 'followers', include: ['playList'] }
    ]
  })

  ctx.status = 200
  ctx.body = { user }
}

const createUser = async (ctx, next) => {
  const { user } = ctx.request.body
  const response = await User.create(user)
  ctx.status = 200
  ctx.body = { response }
}

const getUserPlaylist = async (ctx, next) => {
  const userId = ctx.params.userId
  const user = await User.findById(userId)
  const playList = await user.getPlayList()

  ctx.status = 200
  ctx.body = { playList }
}

const getUsers = async (ctx, next) => {
  const users = await User.findAll()

  ctx.status = 200
  ctx.body = { users }
}

const createUserFollower = async (ctx, next) => {
  const { from, to } = ctx.request.body
  const user = await User.findById(to)
  const response = await user.addFollower(from)
  ctx.status = 200
  ctx.body = { response }
}

const addMusicToUserPlayList = async (ctx, next) => {
  const { userId, musicId } = ctx.request.body
  const user = await User.findById(userId)
  const response = await user.addPlayList(musicId)

  ctx.status = 200
  ctx.body = { response }
}

module.exports = {
  getUser,
  createUser,
  getUserPlaylist,
  getUsers,
  createUserFollower,
  addMusicToUserPlayList
}
