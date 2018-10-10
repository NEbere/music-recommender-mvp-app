// Third party imports
// None

// Local imports
const Music = require('../models').Music
const { handleApiErrors } = require('../utils/apiErrorHandler')
const { STATUS_CODES } = require('../utils/constants')

/**
 * getMusic: Gets all the Music records in the database
 * @param { IRouterContext } ctx Router context passed to the endpoint
 * @param { Promise<any> } next the next function. It suspends and passes control to the next middleware defined
 * @returns { Object } A response object that contains the music records
 */
const getMusic = async (ctx, next) => {
  const music = await Music.findAll()
  ctx.status = STATUS_CODES.OK
  ctx.body = { music: music }
}

/**
 * createMusic: Creates a music record
 * @param { IRouterContext } ctx Router context passed to the endpoint.
 * ctx requext body should contain an object music, that has the music tags to be created
 * @param { Promise<any> } next the next function. It suspends and passes control to the next middleware defined
 * @returns { Object } A response object that contains the created music
 */
const createMusic = async (ctx, next) => {
  const { music } = ctx.request.body
  let status, response

  if (!music || !music.tags) {
    status = STATUS_CODES.BAD_REQUEST
    response = handleApiErrors(status)
  } else {
    status = STATUS_CODES.CREATED
    response = await Music.create(music)
  }

  ctx.status = status
  ctx.body = { response }
}

module.exports = {
  getMusic,
  createMusic
}
