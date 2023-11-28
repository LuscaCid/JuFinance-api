const express = require('express')
const BillsControllers = require('../controllers/billsControllers')
const billsControllers = new BillsControllers()
const EnsureAuth = require('../middleware/EnsureAuth')

const EnsureAuthenticated = new EnsureAuth()

const BillsRoutes = express()

BillsRoutes.use(express.json())

BillsRoutes.post('/create', EnsureAuthenticated.EnsureAuthenticated,billsControllers.create)

module.exports = BillsRoutes

