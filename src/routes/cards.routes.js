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

cardsRoutes.get('/owners', ensureAuth.EnsureAuthenticated, cardsControllers.owners)//add new owners to an card
//sent a invite and after, if the other user accepts, he receives the card
cardsRoutes.post('/create', ensureAuth.EnsureAuthenticated, cardsControllers.create)

cardsRoutes.get('/view', ensureAuth.EnsureAuthenticated, cardsControllers.viewAll)

cardsRoutes.delete('/delete', ensureAuth.EnsureAuthenticated, cardsControllers.delete)

cardsRoutes.put('/update/:card', ensureAuth.EnsureAuthenticated, cardsControllers.update)

module.exports = cardsRoutes

/**
 * seria importante ter uma area onde eu possa ver os donos do cartao criado
 * 
 * quando um cartao for selecionado deve aparecer a possibilidade de compartilhar ele com um outro usuário,
 * a possibilidade de deletar, de fazer um pagamento, ou seja ser enviado para as contas a pagar que ja foram criadas
 * a possibilidade de atualizar alguma informacao do cartao.
 * 
 * 
 */