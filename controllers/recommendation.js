const models = require('../models')

const sequelize = require('sequelize')
const Op = sequelize.Op


const getUserAndFollowersPlayList = async (userId) => {
    return await models.User.findById(userId, {
        include: [
            { model: models.User, as : 'followers', include: ['playList']},
            { model: models.Music, as : 'playList'}
        ]
    })
}

const getPlayListTags = (playList) => {
    const playListTags = []
    for (let index = 0; index < playList.length; index++) {
        playListTags.push(...playList[index].tags)
    }

    return playListTags
}

const getUserRecommendations = async (ctx, next) => {
    const userId = ctx.params.userId
    const user = await getUserAndFollowersPlayList(userId)
    const playLists = [].concat(...user.playList)
    const followers = user.followers

    // Get followers playlist
    for (let index = 0; index < followers.length; index++){
        playLists.push(...followers[index].playList)
    }
    const playListTags = getPlayListTags(playLists)
    const music = await models.Music.findAll({
        where: { tags: {
            [Op.overlap]: playListTags 
        }},
        limit: 5
    })

    ctx.status = 200
    ctx.body = { user: user, playLists: playLists, tags: playListTags, music: music }

}

module.exports = {
    getUserAndFollowersPlayList,
    getUserRecommendations
}