class UserUpdateService{
    constructor(userRepository){
        this.userRepository = userRepository
    }
    async execute({
        user_id,
        newName,
        newEmail,
        oldPassword,
        newPassword
    }){
    const functions = await this.userRepository.update({
        user_id,
        newName,
        newEmail,
        oldPassword,
        newPassword
    })
    
    newName && await functions.updateName()
    newEmail && await functions.updateEmail()
    oldPassword && newPassword && await functions.updatePassword()
    
    return 
    }

}

module.exports = UserUpdateService