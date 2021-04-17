'use strict'
const bcrypt = require('bcrypt');
const saltRounds = 10;
const httpStatusCodes = require('http-status-codes')
const randomString = require('randomstring')

// @TODO: Remove unused function

module.exports.logger = require('../middleware/logger')
module.exports.STATUS_CODE = httpStatusCodes.StatusCodes
module.exports.msgCons = require('../constants/msgConstant')

module.exports.checkValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

module.exports.globalResponse = (success, content, message) => {
  return {
    success,
    content,
    message
  }
}

module.exports.generateHash = (plainText) => {
  return bcrypt.hash(plainText, saltRounds).then(function (hash) {
    return hash
  });
}

module.exports.compareHash = (plainText, hash) => {
  return bcrypt.compare(plainText, hash).then(function (result) {
    return result
  });
}

module.exports.joiValidatorHandler = (joiSchema, dataToValidate) => {
  console.info('Incoming original request body: ', JSON.stringify(dataToValidate, null, 2))
  const joiResult = joiSchema.validate(dataToValidate)

  if (joiResult && joiResult.error) {
    let message = joiResult.error.message || joiResult.error.details[0].message
    message = message.replace(new RegExp(/[\\"]*/, 'gm'), '')
    throw this.globalResponse(false, {}, message)
  }
  return joiResult.value
}

module.exports.separateKeysFromObj = (elem, identifier) => {
  const json = {}
  for (const singleKey of Object.keys(elem)) {
    if (singleKey && singleKey.startsWith(identifier)) {
      const value = elem[singleKey]
      if (value !== null && typeof value !== 'undefined') json[singleKey.replace(identifier, '')] = value
      delete elem[singleKey]
    }
  }
  return Object.keys(json).length > 0 ? json : undefined
}

module.exports.generateRandomString = (data) => {
  return randomString.generate(data)
}