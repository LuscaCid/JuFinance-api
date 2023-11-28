const SessionsRepositoryTest = require('../repositories/sessions-test-prod/SessionsRepository-test')
const SessionsRepository = require('../repositories/sessions-test-prod/SessionsRepository')
const SessionsCreateSevice = require('../services/SessionsCreateService')
const AppError = require('../utils/AppError')


class SessionsControllers{
    async create(request, response){
        const {email, password} = request.body

        const sessionsRepository = new SessionsRepository()
        const SessionsCreateService = new SessionsCreateSevice(sessionsRepository)

        const {user, token} = await SessionsCreateService.execute({email, password})
        return response.json({user, token})

    }
}
module.exports = SessionsControllers