const User = require('../models').User
const { handleApiErrors } = require('../utils/apiErrorHandler')
const { STATUS_CODES } = require('../utils/constants')

/**
 * getUser: Get a user record with userId
 * @param { IRouterContext } ctx Router context passed to the endpoint.
 * ctx params should contain userId param
 * @param { Promise<any> } next the next function. It suspends and passes control to the next middleware defined
 * @returns { Object } A response object that contains the user,
 * playlist and  followers playlist
 */
const getUser = async (ctx, next) => {
  const userId = parseInt(ctx.params.userId, 10)
  let status, response

  if (isNaN(userId)) {
    status = STATUS_CODES.BAD_REQUEST
    response = handleApiErrors(status)
  } else {
    status = STATUS_CODES.OK
    response = await User.findById(userId, {
      include: [
        { model: User, as: 'followers', include: ['playList'] }
      ]
    })
  }

  ctx.status = status
  ctx.body = { response }
}

/**
 * createUser: Creates a user record
 * @param { IRouterContext } ctx Router context passed to the endpoint.
 * ctx request body should name of the user to be created.
 * @param { Promise<any> } next the next function. It suspends and passes control to the next middleware defined
 * @returns { Object } A response object that contains the created user
 */
const createUser = async (ctx, next) => {
  const { user } = ctx.request.body
  let status, response

  if (!user || !user.name) {
    status = STATUS_CODES.BAD_REQUEST
    response = handleApiErrors(status)
  } else {
    status = STATUS_CODES.CREATED
    response = await User.create(user)
  }

  ctx.status = status
  ctx.body = { response }
}

/**
 * getUserPlaylist: Get a user playlist (Music user has listened to) with userId
 * @param { IRouterContext } ctx Router context passed to the endpoint.
 * ctx params should contain userId param
 * @param { Promise<any> } next the next function. It suspends and passes control to the next middleware defined
 * @returns { Object } An object that contains playlist array of all Music the user has listend to
 */
const getUserPlaylist = async (ctx, next) => {
  const userId = parseInt(ctx.params.userId, 10)
  let status, response

  if (isNaN(userId)) {
    status = STATUS_CODES.BAD_REQUEST
    response = handleApiErrors(status)
  } else {
    status = STATUS_CODES.OK
    const user = await User.findById(userId)
    response = await user.getPlayList()
  }

  ctx.status = status
  ctx.body = { response }
}

/**
 * getUsers: Get all users in database
 * @param { IRouterContext } ctx Router context passed to the endpoint.
 * @param { Promise<any> } next the next function. It suspends and passes control to the next middleware defined
 * @returns { Object } an object that contains a users array.
 */
const getUsers = async (ctx, next) => {
  const users = await User.findAll()

  ctx.status = 200
  ctx.body = { users }
}

/**
 * createUserFollower: Create a user follower.
 * @param { IRouterContext } ctx Router context passed to the endpoint.
 * ctx request body should 'to'(user) and 'from'(follower) properties
 * @param { Promise<any> } next the next function. It suspends and passes control to the next middleware defined
 * @returns { Object } A response object that contains userId and followerId
 */
const createUserFollower = async (ctx, next) => {
  const { from, to } = ctx.request.body
  let status, response

  if (!from || !to) {
    status = STATUS_CODES.BAD_REQUEST
    response = handleApiErrors(status)
  } else {
    const userId = parseInt(to, 10)
    const followerId = parseInt(from, 10)

    if (isNaN(userId) || isNaN(followerId)) {
      status = STATUS_CODES.BAD_REQUEST
      response = handleApiErrors(status)
    } else {
      const user = await User.findById(to)
      status = STATUS_CODES.CREATED
      response = await user.addFollower(from)
    }
  }

  ctx.status = status
  ctx.body = { response }
}

/**
 * addMusicToUserPlayList: Add music listened to by user to user playlist.
 * @param { IRouterContext } ctx Router context passed to the endpoint.
 * ctx request body should 'userId' and 'musicId' properties
 * @param { Promise<any> } next the next function. It suspends and passes control to the next middleware defined
 * @returns { Object } A response object that contains userId and musicId
 */
const addMusicToUserPlayList = async (ctx, next) => {
  const { userId, musicId } = ctx.request.body
  let status, response

  if (!userId || !musicId) {
    status = STATUS_CODES.BAD_REQUEST
    response = handleApiErrors(status)
  } else {
    parseInt(userId, 10)
    parseInt(musicId, 10)

    if (isNaN(userId) || isNaN(musicId)) {
      status = STATUS_CODES.BAD_REQUEST
      response = handleApiErrors(status)
    } else {
      const user = await User.findById(userId)
      status = STATUS_CODES.CREATED
      response = await user.addPlayList(musicId)
    }
  }

  ctx.status = status
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
