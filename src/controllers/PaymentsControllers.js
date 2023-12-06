const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class PaymentsControllers {
    
    debitPay = async (request, response) => {
        
        const user_id = request.user.id
        const {
            card_id, //id do cartao para debitar dele
            bill_id 
        } = request.body

        async function debit({finalValue}){
            const fixedNum = finalValue.toFixed(2)// its obviously an number
            try{
                await knex('cards')
                .where({id : card_id})
                .update({
                    balance : fixedNum
                })
                .then(async () => {
                    const [payment_id] = await knex('payments')
                    .insert({
                        bill_id : bill_id,
                        payment_method : "DEBIT"
                    })

                    await knex('last_payments')
                    .insert({
                        user_id : user_id,
                        payment_id : payment_id
                    })
                    console.log(payment_id)
                    
                    return response.status(200).json({message : `Novo valor na conta ${fixedNum}`})
                })
                  
            } catch (error) {
                throw console.error(error)
            }
            
        }
        const errorTransaction = (response) => {
            return response.status(401).json({
                message : "saldo insuficiente"
            })
        }
        
        const thisUserHasThisCard = await knex('cards_has_users')
        .where({user_id})
        .andWhere({card_id})
        .first()
        console.log(thisUserHasThisCard)
        
        if(!thisUserHasThisCard)throw new AppError("Este usuário nao possui este cartao", 401)
        //security method to prevent frauds
        const {balance} = await knex('cards')
        .select('balance')
        .where({id : card_id})
        .first()
        
        console.log("valor dentro do cartao: ",balance)
        
        const {value} = await knex('bills')
        .select("value")
        .where({id : bill_id})
        .first()
        console.log("valor da conta: ",value)

        const finalValue = Number(balance) - Number(value)
        const isPayable = finalValue > 0 
        //at debit, so, we have to check if this card haves money enough to do that
        isPayable ? await debit({finalValue}) : errorTransaction(response) // we can make an payment, we do it

    }

    viewPayments = async () => {
        
    }
}

module.exports = PaymentsControllers