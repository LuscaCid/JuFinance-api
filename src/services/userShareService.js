const AppError = require("../utils/AppError")

class UserShareService{
    constructor(userRepository){
        this.userRepository = userRepository
    }
    //execute the sharing function
    execute = async ({user_id ,email_to, card_id, message}) => {
        const user = await this.userRepository.findByEmail(email_to)
        if(!user && user.id !== user_id)throw new AppError('Este usuário não está cadastrado!')
        
        const guest_id = user.id

        await this.userRepository.sendInvitation({user_id, guest_id, card_id, message})
    }
}
module.exports = UserShareService