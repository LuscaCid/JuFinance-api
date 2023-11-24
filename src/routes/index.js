const express = require('express')
const Router = express() 
Router.use(express.json())

const userRoutes = require('./usersRoutes')
const paymentsRoutes = require('./paymentsRoutes')
Router.use("/users",userRoutes)
Router.use("/payments",paymentsRoutes)

module.exports = Router