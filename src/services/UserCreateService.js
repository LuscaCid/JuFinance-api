const AppError = require('../utils/AppError')

class UserCreateServices {
    constructor(userRepository){
        this.userRepository = userRepository
    }

    async execute({name, password, email}){
        const userExists = await this.userRepository.findByEmail(email)
        console.log('execute', userExists)
        if(userExists) throw new AppError('Este e-mail já está cadastrado.',401)
        
        const userId = this.userRepository.create({name, password, email})
        return userId
    }
}

module.exports = UserCreateServices