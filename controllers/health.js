// Third party imports

// Local imports
const { STATUS_CODES } = require('../utils/constants')

/**
 * Health check route. Used to check that the server is up and running
 * @param { IRouterContext } ctx Router context passed to the endpoint
 * @param { Promise<any> } next the next function. It suspends and passes control to the next middleware defined
 */
const healthCheck = async (ctx, next) => {
  ctx.status = STATUS_CODES.OK
  ctx.body = { status: 'OK' }
}

module.exports = {
  healthCheck
}
