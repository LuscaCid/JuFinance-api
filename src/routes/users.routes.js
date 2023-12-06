const express = require('express')

const UserControllers = require('../controllers/UserControllers')
const EnsureAuth = require('../middleware/EnsureAuth')
const ensureAuth = new EnsureAuth()
const userControllers = new UserControllers()

const userRoutes = express()


userRoutes.use(express.json())

userRoutes.get('/myinvites', ensureAuth.EnsureAuthenticated, userControllers.viewInvites)

userRoutes.post('/invite', ensureAuth.EnsureAuthenticated, userControllers.cardInvitation)

userRoutes.put('/update', ensureAuth.EnsureAuthenticated,userControllers.update)

userRoutes.post('/register', userControllers.create)

module.exports = userRoutes