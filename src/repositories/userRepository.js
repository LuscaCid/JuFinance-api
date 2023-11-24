const knex = require('../database/knex')
const AppError = require('../utils/AppError')


class userRepository {
    async findByEmail(email) {
        const userExists = await knex('users')
        .where({email})
        .first()
        
        if(userExists) throw new AppError('Este e-mail já está cadastrado.',401)
    
        return userExists
    }
    async create({name, email, password}){
        const userId = await knex('users')
        .insert({
            name,
            email,
            password

        })
        return userId
    }

}

module.exports = userRepository