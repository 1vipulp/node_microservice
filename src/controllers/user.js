'use strict'
const userService = require('../services/user')
const { logger, globalResponse, STATUS_CODE, msgCons } = require('../utils/utils')

module.exports.userRegistration = async (req, res) => {
  const language = req.headers.language || process.env.DEFAULT_LANGUAGE
  try {
    const result = await userService.userRegistration(req.body, language)
    return res.send(globalResponse(true, result, msgCons.SUCCESS_REGISTERED_SUCCESSFULLY[language]))
  } catch (error) {
    logger.error(`Error from final catch block of userRegistration helper: `, JSON.stringify(error), error)
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(globalResponse(false, {}, error.message || msgCons.ERROR_REGISTRATION[language]))
  }
}

module.exports.userLogin = async (req, res) => {
  const language = req.headers.language || process.env.DEFAULT_LANGUAGE
  try {
    const channel = req.headers.channel
    const result = await userService.userLogin(req.body, channel, language)
    return res.send(globalResponse(true, result, msgCons.SUCCESS_USER_LOGGED_IN[language]))
  } catch (error) {
    logger.error(`Error from final catch block of userLogin helper: `, JSON.stringify(error), error)
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(globalResponse(false, {}, error.message || msgCons.ERROR_USER_LOGGED_IN[language]))
  }
}

module.exports.getUserProfile = async (req, res) => {
  const language = req.headers.language || process.env.DEFAULT_LANGUAGE
  try {
    const userId = req.params.user_id
    const result = await userService.getUserProfile(userId, language)
    return res.send(globalResponse(true, result, msgCons.SUCCESS_GET_USER_PROFILE[language]))
  } catch (error) {
    logger.error(`Error from final catch block of getUserProfile helper: `, JSON.stringify(error), error)
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(globalResponse(false, {}, error.message || msgCons.ERROR_GET_USER_PROFILE[language]))
  }
}