const AppError = require("../utils/AppError")

class UserShareService{
    constructor(userRepository){
        this.userRepository = userRepository
    }
    //execute the sharing function
    execute = async (user_id ,{email_to, card_id}) => {
        const user = await this.userRepository.findByEmail(email_to)
        if(!user && user.id !== user_id)throw new AppError('Este usuário não está cadastrado!')

        await this.userRepository.shareCard({user ,card_id})
    }
}
module.exports = UserShareService