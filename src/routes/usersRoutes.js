const express = require('express')

const UserControllers = require('../controllers/UserControllers')
const userControllers = new UserControllers()

const userRoutes = express()


userRoutes.use(express.json())

userRoutes.get('/test', userControllers.test)


module.exports = userRoutes