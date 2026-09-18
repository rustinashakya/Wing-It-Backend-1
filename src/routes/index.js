const { Router } = require('express')
const authRoutes = require('./auth')
const userRoutes = require('./user')

const router = Router()



// all routes 
router.use("/auth", authRoutes)
router.use("/user", userRoutes)






module.exports = router