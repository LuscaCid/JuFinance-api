const knex = require('../database/knex')
const AppError = require('../utils/AppError')

/**
 * this controller will be made to create new payments methods
 * this controller will be made to update current user payments methods
 * this controller will be made to delete current user payments methods
 */
class CardsControllers {
    
    owners = async (req, res) => {
        const {card_id} = req.body
        const owners = await knex('users_has_cards')
        .where({card_id })

    }

    create = async (req, res) => {
        const { id } = req.user
        const {
            initialValue,
            cardName, 
        } = req.body
        try{
            const cardId = await knex('cards')
            .insert({
                balance : initialValue,
                card_name : cardName,
                created_by  : id
            })
            console.log(cardId)
            const [card_id] = cardId 
            await knex("cards_has_users")
            .insert({
                user_id : id,
                card_id
            }).then(() => (console.log('ok, created')))
            return res.status(201).json({
                message : "card has been created with success",
                card_id : cardId 
            })
        } catch(err) {
            console.error('error : ',err)
        }
    }

    viewAll  = async (req, res) => {//sera possivel ter cartoes compartilhados dentro da aplicacao, contas tambem
        const user_id = req.user.id

        const allCards = await knex('cards_has_users')
        .select(["user_id", "card_id"])
        .where({user_id})
        .innerJoin('cards', "cards.created_by", "cards_has_users.user_id")
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
        const { card_id } = req.body //id selecionado a partir do click no cartao...

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
            message : "okay at changes!",
            
        })
    }
}
module.exports = CardsControllers