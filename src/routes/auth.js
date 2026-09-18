const { Router } = require('express')
const authController = require('../controller/authController')

const authRoutes = Router()




authRoutes.post('/register', authController.register)


authRoutes.post('/verify-email', authController.verifyEmail)


authRoutes.post('/login', authController.login)





module.exports = authRoutes