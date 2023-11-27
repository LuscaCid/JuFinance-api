const {verify} = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const AuthConfig = require('../configs/AuthConfig')

class EnsureAuth{
    async EnsureAuthenticated(request, response, next){
        const AuthHeaders = request.headers.authorization

        if(!AuthHeaders)throw new AppError('Jwt dont passed', 401)
        const [, token] = AuthHeaders.split(' ')

        try {
            const {sub : user_id} = verify(token, AuthConfig.jwt.secret )
            request.user = {
                id: Number(user_id),
            }
            return next()
        } catch {
            throw new AppError('invalid jwt')
        }
    }

}
module.exports = EnsureAuth