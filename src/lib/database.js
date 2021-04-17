'use strict'

const mongoose = require('mongoose')
const logger = require('../middleware/logger')

const URL = process.env.MONGO_URL;
const OPEN_EVENT = 'open';
const ERROR_EVENT = 'error';

(async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
  } catch (e) {
    logger.error(`connection error ${e}`);
  }
})();

const db = mongoose.connection;

db.once(OPEN_EVENT, () => {
  logger.info(`Successfully connected to db`);
});
db.on(ERROR_EVENT, () => {
  logger.error(`connection error while connection at ${URL}`);
});