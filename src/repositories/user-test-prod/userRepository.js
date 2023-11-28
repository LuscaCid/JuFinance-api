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
    async update({
        user_id,
        newName,
        newEmail,
        oldPassword,
        newPassword
    }){
        
        const updateName = async () => {
            console.log('updatename')
            try{
                await knex('users')
                .where({id : user_id})
                .update({name : newName})
            } catch (err){
                console.err(err)
            }
        }

        const updateEmail = async () => {
            try{
                await knex('users')
                .where({id : user_id})
                .update({email : newEmail})
            } catch (err){
                console.err(err)
            }
        }

        const updatePassword = async () => {

            const user = await knex('users')
            .where({id : user_id})

            const checkedPassword = await compare(oldPassword , user.password)
            console.log(checkedPassword)//only for see the results
            if(!checkedPassword) throw new AppError('Senha inválida', 401)

            try{
                await knex('users')
                .where({id : user_id})
                .update({password : newPassword})
            } catch (err){
                console.err(err)
            }
        }
        
        return{
            updateName,
            updateEmail,
            updatePassword
        }
    }
}

module.exports = UserRepository