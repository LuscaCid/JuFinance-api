//a ideia eh trabalhar em cima da criacao de contas a pagar para em seguida fazer o pagamento das mesmas

const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class BillsControllers {

    async create(request, response){
        const {
            title,
            description,
            value,
            maturity,
            
        } = request.body
        //const {id} = request.params
        const userId = request.user.id
        
        const billId = await knex('bills')
        .insert({
            title,
            description,
            value,
            maturity,
            created_by : userId
        })
        .then(() => {
            console.log('created with success')
        })
        .catch(e => {
            if(e instanceof AppError){
                return response.status(e.status).json({
                    message : e.message,
                    status : e.status
                })
            } else return response.status(500).json({
                message : "internal server error",
                status : 500
            })
        })
        return response.status(201).json(billId)
    }


}

module.exports = BillsControllers