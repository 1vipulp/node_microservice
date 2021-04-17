'use strict'
const healthCheck = require('./health')
const userRoute = require('./user')

module.exports = (app) => {
  app.use('/v1/user', userRoute)
  app.use('/v1', healthCheck)
}