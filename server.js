const app = require('./app')
const { infoLogger, errorLogger } = require('./utils/logger')

const port = process.env.PORT || 3005
const httpServer = app.listen(port, () => {
  infoLogger('Listening on port', port)
}).on('error', (err) => {
  errorLogger('Error starting server', err)
})

module.exports = httpServer

