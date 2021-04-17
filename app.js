
'use strict'

const express = require('express')
const app = express()
const cors = require('cors')
const requestId = require('./src/middleware/requestId')
const logger = require('./src/middleware/logger')
const port = process.env.PORT

require('./src/lib/database')

app.use(cors())
app.use(express.json())
app.use(requestId())

require('./src/routes')(app)

app.use((_req, res) => {
  res.status(404).send({ success: false, message: 'The request you are looking for us to serve, is not available at our end', content: {} });
})


app.listen(port, (err) => {
  if (err) {
    logger.error(`Error while listening on port: %s`, port)
  } else {
    logger.info(`Service is running on port: %s`, port)
  }
})

module.exports = app