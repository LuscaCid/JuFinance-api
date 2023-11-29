const knex = require('../database/knex')
const AppError = require('../utils/AppError')

/**
 * this controller will be made to create new payments methods
 * this controller will be made to update current user payments methods
 * this controller will be made to delete current user payments methods
 */
class CardsControllers {
    
    create = async (req, res) => {
        const { id } = req.user
        const {
            initalValue,
            cardName, 
        } = req.body
        try{
            const cardId = await knex('cards')
            .insert({
                balance : initalValue,
                card_name : cardName,
                created_by  : id
            }).then(e => console.log(e))

            return res.status(201).json({
                message : "card has been created with success",
                card_id : cardId 
            })
        } catch(err) {
            console.error('error : ',err)
        }
    }

    viewAll  = async (req, res) => {
        const user_id = req.user.id

        const allCards = await knex('cards')
        .where({created_by :  user_id})
        .orderBy('card_name')

        return res.status(200).json(allCards)
    }

    update = async (req, res) => {//update selected card
        const user_id = req.user.id
        const {card} = req.params
        const { 
            newCardName,
            newBalance,

        } = req.body
        try{
            //preciso verificar o usuario que esta tentando atualizar, para isso o cartao deve ter o mesmo id do dono
            const userUsing = await knex('users')
            .where({id : user_id})
            .first()
            //aqui eu retorno as infos do cartao que esta sendo atualizado
            const userHavesCard = await knex('cards')
            .select(["id", "card_name"])
            .where({id : card})
            .first()

            if(userHavesCard.id != userUsing.id) throw new AppError('Invalid access from this user')

            await knex('cards')
            .where({id  : card_id})
            .update({
                balance : newBalance,
                card_name : newCardName
            })

            return res.status(200).json("updated")
        } catch (error){
            return console.log(error)
        }
        
    }

    delete = async (req, res) => {
        const user_id = req.user.id
        const { card_id } = req.body

        try {

            const userUsing = await knex('users')
            .select(["id","name"])
            .where({id : user_id})
            .first()

            const cardId= await knex('cards')
            .select(["id", "card_name"])
            .where({id :card_id})
            .first()

            if(cardId.id != userUsing.id)throw new AppError('Acesso inválido', 401)

            await knex('cards')
            .where({id : card_id})
            .delete()
            .then(() => console.log('deleted with success'))
        }catch (error){
            return res.status(500).json()
        }
        
        return res.status(200).json({
            messagem : "okay",
            
        })
    }
}
module.exports = CardsControllers