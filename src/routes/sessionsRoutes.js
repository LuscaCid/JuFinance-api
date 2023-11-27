const express = require('express')
const sessionsRoutes = express()
const SessionsControllers = require('../controllers/SessionsControllers')
const sessionsControllers = new SessionsControllers()
sessionsRoutes.use(express.json())

sessionsRoutes.post('/login', sessionsControllers.create)

module.exports = sessionsRoutes