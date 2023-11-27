class SessionsCreateSevice {
    constructor(sessionsRepository){
        this.sessionsRepository = sessionsRepository
    }
    async execute({email, password}){

        const {user, token} = await this.sessionsRepository.verifyCredentials({email, password})
        
        return {user, token}
    }
}

module.exports =  SessionsCreateSevice