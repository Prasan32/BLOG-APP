const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const upload = require('../middlewares/imageUpload')
const userValidator = require('../middlewares/validation/userValidator')

router.route('/register').post(upload.single('image'), userValidator, authController.saveUser)

module.exports = router