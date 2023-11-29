const express =require('express')
const PaymentsControllers = require('../controllers/PaymentsControllers')
const EnsureAuthenticated = require('../middleware/EnsureAuth')
const ensureAuth = new EnsureAuthenticated()
const paymentsControllers = new PaymentsControllers()


const paymentsRoutes = express()

paymentsRoutes.use(express.json())

paymentsRoutes.post('/pay', ensureAuth.EnsureAuthenticated, paymentsControllers.pay)

module.exports =paymentsRoutes