const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const routes = require('./routes')

const app = new Koa()

// Middlewares
app.use(bodyParser())

// Routes
app.use(routes.router.routes()).use(routes.router.allowedMethods())

// Add the logger after the health routes
const consoleLogger = console.log
app.use(consoleLogger)

module.exports = app
