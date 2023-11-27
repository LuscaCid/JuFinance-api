const knex = require('../../database/knex')
const {hash} = require('bcryptjs')

class UserRepository {
    async findByEmail(email) {
        const userExists = await knex('users')
        .where({email})
        .first()
    
        return userExists
    }
    async create({name, email, password}){
        const hashedPassword = await hash(password , 8)
        const userId = await knex('users')
        .insert({
            name,
            email,
            password : hashedPassword

        })
        return userId
    }

}

module.exports = UserRepository