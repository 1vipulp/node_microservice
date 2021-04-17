'use strict'

const Joi = require('joi')

module.exports.registrationJoiSchema = Joi.object().keys({
  name: Joi.string().min(2).required().error(new Error('Please enter your name')),
  email: Joi.string().email().required().error(new Error('Please provide valid email address')),
  password: Joi.string().min(8).required().error(new Error('Please enter valid min 8 character long password'))
})

module.exports.userLoginJoiSchema = Joi.object().keys({
  email: Joi.string().email().required().error(new Error('Please provide valid email address')),
  password: Joi.string().min(8).required().error(new Error('Please enter valid min 8 character long password'))
})