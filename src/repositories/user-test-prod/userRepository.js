const knex = require('../../database/knex')
const {hash, compare} = require('bcryptjs')
const AppError = require('../../utils/AppError')

class UserRepository {
    async findByEmail(email) {
        const userExists = await knex('users')
        .where({email})
        .first()
    
        return userExists
    }
    async create({name, email, password}){
        const hashedPassword = await hash(password , 8)
        const [userId] = await knex('users')
        .insert({
            name,
            email,
            password : hashedPassword
        })
        return userId
    }


    //utilizando o conceito de factory juntamente com inversao de injecao de dependencias
    
    sendInvitation = async ({user, card_id}) => {
        console.log(user)
        try{
            await knex('cards_has_users')
            .insert({
                card_id,
                user_id : user.id
            }).then(() => {
                return "ok"
            })
        } catch (e) {
            return console.error(e)
        }
    }
    
    
    
    async update({
        user_id,
        newName,
        newEmail,
        oldPassword,
        newPassword
    }){
        const updateName = async () => {
            try{
                await knex('users')
                .where({id : user_id})
                .update({name : newName})
            } catch (err){
                console.error(err)
            }
        }

        const updateEmail = async () => {
            try{

                const emailExists = await knex('users')
                .where({email : newEmail})
                .first()

                if(emailExists)throw new AppError('E-mail já cadastrado.')

                await knex('users')
                .where({id : user_id})
                .update({email : newEmail})
            } catch (err){
                console.error(err)
            }
        }

        const updatePassword = async () => {
            console.log('update password')
            const user = await knex('users')
            .where({id : user_id})
            .first()

            const checkedPassword = await compare(oldPassword,user.password)
            console.log(checkedPassword)//only for see the results
            if(!checkedPassword) throw new AppError('Senha inválida', 401)

            const hashedPassword = await hash(newPassword, 8)

            try{
                await knex('users')
                .where({id : user_id})
                .update({password : hashedPassword})
            } catch (err){
                console.error(err)
            }
        }
        
        return {
            updateName,
            updateEmail,
            updatePassword
        }
    }
}

module.exports = UserRepository