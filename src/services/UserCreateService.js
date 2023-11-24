class UserCreateServices {
    constructor(userRepository){
        this.userRepository = userRepository
    }

    async execute({name, password, email}){
        this.userRepository.create({name, password, email})
    }
}

module.exports = UserCreateServices