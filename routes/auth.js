const express = require('express')
const authController = require('../controllers/auth.controller')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.post('/', authController.validate(), authController.login)
router.post('/register', userController.validate(), userController.store)
module.exports = router
