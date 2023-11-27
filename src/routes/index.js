const express = require('express')
const Router = express() 
Router.use(express.json())

const sessionsRoutes = require('./sessionsRoutes')
const userRoutes = require('./usersRoutes')
const paymentsRoutes = require('./paymentsRoutes')

Router.use("/sessions",sessionsRoutes)
Router.use("/users",userRoutes)
Router.use("/payments",paymentsRoutes)

module.exports = Router