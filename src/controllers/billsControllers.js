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
        const userId = request.user.id //advindo da criacao la no ensureAuth, criando um objeto user dentro da request
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
            try {//treatment of errors
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


    async deleteOwnBill(req,res){//an selected bill that will be deleted
        const {bill_id} = req.body
        try{
            await knex('bills')
            .where({id :bill_id})
            .delete()
            return res.status(200).json({message : "deleted with success"})
        } catch (err){
            return console.log(err)
        }
    }

    async showAll(request, response){ // when the user searches also
        const user_id = request.user.id 
        let {search} = request.body
        if(!search)search = ''

        try{
            const userBills = await knex('bills')
            .select('*')
            .where({created_by : user_id})
            .whereLike('title', `%${String(search)}%`)//search tava chegando como undefined
            .innerJoin("users" , "bills.created_by", "users.id")
            .orderBy('title')

            console.log(userBills)
            const filteredUserBills = userBills.map(element => {//destruct -> ({name, title, value, created_at}) e so aloca <3
            console.log(element)
                return {
                    created_by : element.name,
                    title : element.title,
                    value : element.value,
                    created_at : element.created_at,
                    maturity : element.maturity
                }
            })

            console.log(filteredUserBills)
            return response.status(200).json(filteredUserBills)

        } catch (err) {
            console.error(err)
            return response.status(500).json({message : "error"})
        }

    }

}

module.exports = BillsControllers