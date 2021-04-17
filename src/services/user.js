'use strict'
const userRepo = require('../repository/user')
const tokenRepo = require('../repository/token')
const { joiValidatorHandler, msgCons, generateHash, compareHash, generateRandomString } = require('../utils/utils')
const joiSchemas = require('../utils/joiSchema')

module.exports.userRegistration = async (body, language) => {

  // ++++++-------------  VALIDATE INCOMING REQUEST BODY  -------------++++++
  body = joiValidatorHandler(joiSchemas.registrationJoiSchema, body)

  // ++++++-------------  CHECK EMAIL ALREADY REGISTERED OR NOT  -------------++++++
  const checkForExistingUser = await userRepo.getDataByQuery({
    email: body.email
  })
  if (checkForExistingUser && checkForExistingUser.length) {
    throw {
      message: msgCons.EMAIL_ALREADY_USED[language]
    }
  }

  // ++++++-------------  HASH THE PASSWORD AND SAVE TO DB  -------------++++++
  const bodyToSave = { ...body }
  bodyToSave.password = await generateHash(body.password)

  await userRepo.createData(bodyToSave)
  return { data: true }
}

module.exports.userLogin = async (body, channel, language) => {

  if (!channel) {
    throw {
      message: msgCons.ERROR_GENERIC_CHANNEL_REQUIRED[language]
    }
  }

  // ++++++-------------  VALIDATE INCOMING REQUEST BODY  -------------++++++
  body = joiValidatorHandler(joiSchemas.userLoginJoiSchema, body)

  // ++++++-------------  FETCH USER DATA BY ID AND THROW ERROR IF NO DATA FOUND  -------------++++++
  let [userData = null] = await userRepo.getDataByQuery({
    email: body.email
  }, { __v: 0 })
  if (!userData) {
    throw {
      message: msgCons.NO_USER_FOUND[language]
    }
  }

  if (!userData['is_active']) {
    throw {
      message: msgCons.PROFILE_TEMPORARY_BLOCKED[language]
    }
  }

  const comparePassword = await compareHash(body.password, userData['password'])
  if (!comparePassword) {
    throw {
      message: msgCons.PASSWORD_NOT_MATCH[language]
    }
  }

  const dataToSend = JSON.parse(JSON.stringify(userData))
  dataToSend['secret'] = generateRandomString({ length: 32 })
  delete dataToSend['password']

  await tokenRepo.updateData({
    user: dataToSend._id,
    channel
  }, {
    user: dataToSend._id,
    channel,
    token: dataToSend['secret']
  }, {
    upsert: true
  })

  return { data: dataToSend }
}

module.exports.getUserProfile = async (userId, language) => {

  // ++++++-------------  FETCH USER DATA BY ID AND THROW ERROR IF NO DATA FOUND  -------------++++++
  const [data = null] = await userRepo.getDataByQuery({
    _id: userId
  }, { password: 0, __v: 0 })
  if (!data) {
    throw {
      message: msgCons.NO_USER_FOUND[language]
    }
  }

  return { data }
}