const userRepository = require('../repositories/user-test-prod/userRepository')
const UserCreateServices = require('../services/UserCreateService')
const UserUpdateServices = require('../services/UserUpdateService')
const UserShareServices = require('../services/userShareService')
const UserRepository = require('../repositories/user-test-prod/userRepository')
const UserRepositoryArray = require('../repositories/user-test-prod/UserRepositoryArray')



class UserControllers{

    async create(request, response, next){
        const {name, email, password } = request.body
         
        const userRepository = new UserRepository()
        const userCreateService = new UserCreateServices(userRepository)
        
        const user_id = await userCreateService.execute({name, email, password})
        
        return response.status(201).json({message : "User has been registered",user_id})
    }
    async update(request, response){
        const user_id = request.user.id
        
        const { 
            newName,
            newEmail,
            oldPassword,
            newPassword
        } = request.body
        
        const userRepository = new UserRepository()
        const userUpdateServices = new UserUpdateServices(userRepository)
        
        await userUpdateServices.execute({
            user_id,
            newName,
            newEmail,
            oldPassword,
            newPassword
        })
        
        return response.status(200).json({message : "Usuário atualizado com sucesso"})
    }
    cardInvitation = async (req, res) => {//thats will send an invitation
        const {email_to, card_id, message} = req.body
        const user_id = req.user.id 
        //verify if this email exists
        
        const userRepository = new UserRepository()
        const userShareService = new UserShareServices(userRepository)

        await userShareService.execute({user_id ,email_to, card_id, message})

        return res.status(200).json({message : 'enviado!'})
    }
}

module.exports = UserControllers