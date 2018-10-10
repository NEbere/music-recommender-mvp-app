
// Third party imports
const sequelize = require('sequelize')

// Local imports
const Music = require('../models').Music
const User = require('../models').User
const { handleApiErrors } = require('../utils/apiErrorHandler')
const { STATUS_CODES } = require('../utils/constants')
const Op = sequelize.Op

/**
 * getUserAndFollowersPlayList: Get a user followers and the
 * followers playlist(music followers have listend to)
 * @param { Number } userId
 * @returns a user object with playlist, followers and follower playlists
 */
const getUserAndFollowersPlayList = async (userId) => {
  return User.findById(userId, {
    include: [
      { model: User, as: 'followers', include: ['playList'] },
      { model: Music, as: 'playList' }
    ]
  })
}

/**
 * getPlayListTags: Returns the tags from array of playlist
 * @param { Array } playList : Array of all the playlists to extract tags from
 * @returns { Array } playListTags: Tags extracted from the playlist
 */
const getPlayListTags = (playList) => {
  const playListTags = []
  for (let index = 0; index < playList.length; index++) {
    playListTags.push(...playList[index].tags)
  }

  return playListTags
}

/**
 * getUserRecommendations: Get music recommendation for user
 * Recommendation is based on the music user has listened to
 * and the music user followers has listened to
 * @param { IRouterContext } ctx Router context passed to the endpoint.
 * ctx params should contain userId param
 * @param { Promise<any> } next the next function. It suspends and passes control to the next middleware defined
 * @returns { Object } A response Array of recommended music for user
 * response array contains the top five music recommeneded for user
 */
const getUserRecommendations = async (ctx, next) => {
  const userId = parseInt(ctx.params.userId, 10)
  let status, response

  if (isNaN(userId)) {
    status = STATUS_CODES.BAD_REQUEST
    response = handleApiErrors(status)
  } else {
    const user = await getUserAndFollowersPlayList(userId)
    const playLists = [].concat(...user.playList)
    const followers = user.followers

    // Get followers playlist
    for (let index = 0; index < followers.length; index++) {
      playLists.push(...followers[index].playList)
    }
    const playListTags = getPlayListTags(playLists)

    status = STATUS_CODES.OK
    response = await Music.findAll({
      where: { tags: {
        [Op.overlap]: playListTags
      } },
      limit: 5
    })
  }

  ctx.status = status
  ctx.body = { response }
}

module.exports = {
  getUserAndFollowersPlayList,
  getUserRecommendations
}
