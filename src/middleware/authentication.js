'use strict'

const jwt = require('jsonwebtoken')
const commonErrorObj = {
  success: false,
  message: 'You are not allowed to do this action',
  content: null
}
const tokenRepo = require('../repository/token')
const { logger } = require('../utils/utils')

module.exports.verifyUnAuthenticatedAPI = async (req, res, next) => {
  const token = process.env.SHARED_TOKEN
  let bearer = req.headers.authorization

  if (!bearer) {
    logger.error('Token not found')
    return res.status(403).send(commonErrorObj)
  }

  bearer = bearer.split(' ')
  if (bearer.length !== 2) {
    logger.error('Token not valid')
    return res.status(403).send(commonErrorObj)
  }

  jwt.verify(bearer[1], token, (err, decoded) => {
    if (err) {
      logger.error('JWT Verification err', err)
      return res.status(403).send(commonErrorObj)
    }
    next();
  })
}

module.exports.verifyAuthenticatedAPI = async (req, res, next) => {
  let bearer = req.headers.authorization

  if (!bearer) {
    logger.error('Token not found')
    return res.status(403).send(commonErrorObj)
  }

  bearer = bearer.split(' ')
  if (bearer.length !== 2) {
    logger.error('Token not valid')
    return res.status(403).send(commonErrorObj)
  }

  const decoded = jwt.decode(bearer[1])
  if (!('u' in decoded) || !('c' in decoded)) {
    logger.error('Required data not found in token')
    return res.status(403).send(commonErrorObj)
  }

  const [tokenData = null] = await tokenRepo.getDataByQuery({
    user: decoded.u,
    channel: decoded.c
  })
  if (!tokenData) {
    logger.error('Token data not found')
    return res.status(403).send(commonErrorObj)
  }

  jwt.verify(bearer[1], tokenData.token, (err, decoded) => {
    if (err) {
      logger.error('JWT Verification err', err)
      return res.status(403).send(commonErrorObj)
    }
    next();
  })
}