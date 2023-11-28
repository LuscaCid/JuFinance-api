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

    async update(request, response) {
        const {id} = request.params
        console.log(id)

        const {
            newTitle,
            newDescription,
            newValue
        } = request.body
        
        if(newTitle){
            try{
                await knex('bills')
                .where({id : id})
                .update({
                    title : newTitle,
                })
            } catch (err){
                console.error(err)
            }
            
        } 

        if(newDescription){
            try{
                await knex('bills')
                .where({id})
                .update({
                    description : newDescription,
                }) 
            } catch (err){
                console.error(err)
            }     
        }
        
        if(newValue){
            try {
                await knex('bills')
                .where({id})
                .update({
                    value : newValue,
                })
            } catch (err){
                console.error(err)
            }      
        }
        return response.status(200).json({message : "update with success"})
    }   

    async deleteOwnBill(req,res){
        const {id} = req.body
        try{
            await knex('bills')
            .where({id})
            .delete()
            return res.status(200).json({message : "deleted with success"})
        
        } catch (err){
            return res.status(err.status).json({message : err})
        }

    }

    async showAll(request, response){ // when the user searches too
        const user_id = request.user.id 
        const {search} = request.body
        try{
            const userBills = await knex('bills')
            .select(['title' , 'value','description', 'name'])
            .where({created_by : user_id})
            .whereLike('title', `%${search}%`)
            .innerJoin("users" , "bills.created_by", "users.id")
            .orderBy('title')

            const filteredUserBills = userBills.map(element => {
                return {
                    created_by : element.name,
                    title : element.title,
                    value : element.value,
                    created_at : element.created_at

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