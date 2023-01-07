const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const upload = require('../middlewares/imageUpload')

router.route('/register').post(upload.single('image'), authController.saveUser)

module.exports = router