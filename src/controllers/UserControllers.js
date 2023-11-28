const userRepository = require('../repositories/user-test-prod/userRepository')
const UserCreateServices = require('../services/UserCreateService')
const UserUpdateServices = require('../services/UserUpdateService')

const UserRepository = require('../repositories/user-test-prod/userRepository')
const UserRepositoryArray = require('../repositories/user-test-prod/UserRepositoryArray')

class UserControllers{
    async test(req, res){
        const message =" testado na rota de test "
        return res.json({
            message : message 
        })
    }
    async create(request, response, next){
        const {name, email, password } = request.body
         
        const userRepository = new UserRepository()
        const userCreateService = new UserCreateServices(userRepository)
        
        const user_id = await userCreateService.execute({name, email, password})
        

        return response.status(201).json({message : "User has been registered",user_id})
    }
    async update(request, response){
        console.log('abaixo')
        const user_id = req.user.id
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
    
}

module.exports = UserControllers