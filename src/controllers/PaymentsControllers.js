const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class PaymentsControllers {
    
    
    
    debitPay = async (request, response) => {
        const user_id = request.user.id
        const {
            card_id, //id do cartao para debitar dele
            bill_id 
        } = request.body

        try{
            const thisUserHasThisCard = await knex('users_has_cards')
            .where({user_id, card_id})
            .first()

            if(!thisUserHasThisCard)throw new AppError("Este usuário nao possui este cartao", 401)

            const valueInsideOfCard = await knex('cards')
            .select('balance')
            .where({card_id})
            .first()
            
            console.log("valor dentro do cartao: ",valueInsideOfCard)
            
            const billValue = await knex('bills')
            .select(['value', 'name'])
            .where({id : bill_id})
            .innerJoin('users', "bills.created_by", "users.id")
            
            console.log("valor da conta: ",billValue)

            const finalValue = Number(valueInsideOfCard) - Number(billValue)
            const isPayable = finalValue > 0 
            
            isPayable ? debit() : errorTransaction(response) // we can make an payment, we do it

            async function debit(){
                try{
                    await knex('cards')
                    .where({card_id})
                    .update({
                        balance : finalValue
                    })
                } catch (error) {
                    throw console.error(error)
                }
                
            }
            const errorTransaction = (response) => {
                return response.status(401).json({

                })
            }
            return 
        } catch (error) {
            throw console.error(error)
        }

    }

    viewPayments = async () => {
        
    }
}

module.exports = PaymentsControllers