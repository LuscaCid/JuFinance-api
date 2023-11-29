const express = require('express')
const Router = express() 
Router.use(express.json())

const sessionsRoutes = require('./sessions.routes')
const userRoutes = require('./users.routes')
const paymentsRoutes = require('./payments.routes')
const BillsRoutes = require('./Bills.routes')
const cardsRoutes = require('./cards.routes')


Router.use('/bills', BillsRoutes)
Router.use('/cards', cardsRoutes )
Router.use("/sessions",sessionsRoutes)
Router.use("/users",userRoutes)
Router.use("/payments",paymentsRoutes)

module.exports = Router