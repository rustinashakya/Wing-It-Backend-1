const { Router } = require('express')
const userController = require('../controller/userController')

const userRoutes = Router()




userRoutes.get('/', userController.getallUsers)


module.exports = userRoutes