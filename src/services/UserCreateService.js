const AppError = require('../utils/AppError')

class UserCreateServices {
    constructor(userRepository){
        this.userRepository = userRepository
    }

    async execute({name, password, email}){
        const userExists = this.userRepository.findByEmail(email)
        
        if(userExists) throw new AppError('Este e-mail já está cadastrado.',401)
        
        const userId = this.userRepository.create({name, password, email})
        return {id : userId}
    }
}

module.exports = UserCreateServices