const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.route('/register').post(authController.saveUser)

module.exports = router