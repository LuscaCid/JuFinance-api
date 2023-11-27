const userRepository = require('../repositories/user-test-prod/userRepository')
const UserCreateServices = require('../services/UserCreateService')
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
        
        const users = await userCreateService.execute({name, email, password})
        

        return response.status(201).json({message : "User has been registered", users})
    }

}

module.exports = UserControllers