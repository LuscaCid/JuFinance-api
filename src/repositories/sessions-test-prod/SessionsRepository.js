const {sign} = require('jsonwebtoken')
const knex = require('../../database/knex')
const AppError = require('../../utils/AppError')
const {compare} = require('bcryptjs')
const AuthConfig = require('../../configs/AuthConfig')


class SessionsRepository {
    userLogged = null

    async verifyCredentials({email, password}){
       
        const userFound = await knex('users')
        .where({email})
        .first()
        
        if(!userFound)throw new AppError('E-mail ou senha inválidos', 401)
    
        const checkPassword = await compare( password,  userFound.password)
        if(!checkPassword) throw new AppError('E-mail ou senha inválidos', 401)

        this.userLogged = userFound

        const {user, token} = await this.insertInApp()

        return {user, token} //se caso tudo estiver correto, retorna o usuario

    }
    async insertInApp(){
        const {expiresIn, secret} = AuthConfig.jwt
        const token = sign({}, secret, {
            subject : String(this.userLogged.id),
            expiresIn
        
        })

        return {user : this.userLogged, token}
    }
   
}
module.exports = SessionsRepository