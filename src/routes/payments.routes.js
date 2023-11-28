const express =require('express')
const PaymentsControllers = require('../controllers/PaymentsControllers')
const paymentsControllers = new PaymentsControllers()

const paymentsRoutes = express()

paymentsRoutes.use(express.json())

paymentsRoutes.get('/test', paymentsControllers.test)

module.exports =paymentsRoutes