'use strict'
const router = require('express').Router()
const userController = require('../controllers/user')
const { verifyUnAuthenticatedAPI, verifyAuthenticatedAPI } = require('../middleware/authentication')

router.post('/registration', verifyUnAuthenticatedAPI, userController.userRegistration)
router.post('/login', verifyUnAuthenticatedAPI, userController.userLogin)
router.get('/profile/:user_id', verifyAuthenticatedAPI, userController.getUserProfile)

module.exports = router