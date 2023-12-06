const express =require('express')
const PaymentsControllers = require('../controllers/PaymentsControllers')
const EnsureAuthenticated = require('../middleware/EnsureAuth')
const ensureAuth = new EnsureAuthenticated()
const paymentsControllers = new PaymentsControllers()

const paymentsRoutes = express()

paymentsRoutes.use(express.json())
paymentsRoutes.use(ensureAuth.EnsureAuthenticated)


paymentsRoutes.post('/master', paymentsControllers.debitPay)



module.exports = paymentsRoutes