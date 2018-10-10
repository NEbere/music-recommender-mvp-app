/**
 * errorLogger: logs error to the console
 * @param { string } errorMessage 
 * @param { Error } error 
 */
const errorLogger = (errorMessage, error) => {
  return console.error(`${errorMessage}: ${error}`)
}

/**
 * errorLogger: logs info to the console
 * @param { string } errorMessage 
 * @param { any } info 
 */
const infoLogger = (infoMessage, info) => {
  return console.info(`${infoMessage}: ${info}`)
}

module.exports = {
  errorLogger,
  infoLogger
}
