const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class PaymentsControllers {
    pay = async (request, response) => {
        const user_id = request.user.id
        const {
            card_id, //id do cartao para debitar dele
            bill_id 
        } = request.body

        try{
            const thisUserHasThisCard = await knex('users_has_cards')
            await knex()
        } catch (error) {

        }

    }

    viewPayments = async () => {
        
    }
}

module.exports = PaymentsControllers