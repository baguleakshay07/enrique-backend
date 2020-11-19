const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/sign-up', authController.signup)
router.post('/sign-in', authController.login)


module.exports = router
