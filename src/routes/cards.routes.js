const express = require('express')
const cardsRoutes = express()
const CardsControllers = require('../controllers/CardsControllers')
const EnsureAuthenticated = require('../middleware/EnsureAuth')
const ensureAuth = new EnsureAuthenticated()
const cardsControllers = new CardsControllers()

/**
 * acima as importacoes instancias...
 */
cardsRoutes.use(express.json())

cardsRoutes.get('owners', ensureAuth.EnsureAuthenticated, cardsControllers.owners)

cardsRoutes.post('/create', ensureAuth.EnsureAuthenticated, cardsControllers.create)

cardsRoutes.get('/view', ensureAuth.EnsureAuthenticated, cardsControllers.viewAll)

cardsRoutes.delete('/delete', ensureAuth.EnsureAuthenticated, cardsControllers.delete)

cardsRoutes.put('/update/:card', ensureAuth.EnsureAuthenticated, cardsControllers.update)

module.exports = cardsRoutes

/**
 * seria importante ter uma area onde eu possa ver os donos do cartao criado
 * 
 */