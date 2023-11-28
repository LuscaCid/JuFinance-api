const express = require('express')
const BillsControllers = require('../controllers/billsControllers')
const billsControllers = new BillsControllers()
const EnsureAuth = require('../middleware/EnsureAuth')

const ensureAuthenticated = new EnsureAuth()

const BillsRoutes = express()

BillsRoutes.use(express.json())

BillsRoutes.get('/show', ensureAuthenticated.EnsureAuthenticated, billsControllers.showAll)

BillsRoutes.put('/update/:id', ensureAuthenticated.EnsureAuthenticated, billsControllers.update)

BillsRoutes.post('/create', ensureAuthenticated.EnsureAuthenticated,billsControllers.create)

BillsRoutes.delete('/delete', ensureAuthenticated.EnsureAuthenticated, billsControllers.deleteOwnBill)

module.exports = BillsRoutes

