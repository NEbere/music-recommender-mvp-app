const Router = require('koa-router')
const controllers = require('../controllers')

const router = new Router()

// HEALTH CHECK ROUTE
router.get('/_health', controllers.healthCheckController.healthCheck)

// USER ROUTES
router.get('/user/:userId/', controllers.userController.getUser)
router.post('/user', controllers.userController.createUser)
router.get('/users', controllers.userController.getUsers)
router.get('/user/:userId/playlist', controllers.userController.getUserPlaylist)
router.post('/follow', controllers.userController.createUserFollower)
router.post('/listen', controllers.userController.addMusicToUserPlayList)

// MUSIC ROUTES
router.get('/music', controllers.musicController.getMusic)
router.post('/music', controllers.musicController.createMusic)

// RECOMMENDATION ROUTES
router.get('/user/:userId/recommendations', controllers.recommendationController.getUserRecommendations)

module.exports = router
