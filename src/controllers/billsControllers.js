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
        console.log(userId)
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
            console.log(e)
        })
        return response.status(201).json(billId)
    }

    async showAll(request, response){
        const user_id = request.user.id 
        try{
            const userBills = await knex('bills')
            .select(['title' , 'value','description', 'name'])
            .where({created_by : user_id})
            .innerJoin("users" , "bills.created_by", "users.id")
            .orderBy('title')

            const filteredUserBills = userBills.map(element => {
                return {
                    created_by : element.name,
                    title : element.title,
                    

                }
            })

            console.log(filteredUserBills)
            return response.status(200).json(userBills)

        } catch (err) {
            console.error(err)
            return response.status(500).json({message : "error"})
        }

    }

}

module.exports = BillsControllers