const AppError = require('../../utils/AppError')
const {hash} = require('bcryptjs')

class SessionsRepositoryTest{
    testDatabase = [
        {
            name : "lucas",
            password : "123",
            email : "lucasfelipaa@gmail.com"
        },
        {
            name : "andre",
            password : "123",
            email : "andre@gmail.com"
        },
        {
            name : "maiana",
            password : "123",
            email : "maiana@gmail.com"
        }
    ] // the space that will have fictional data
    
    async verifyCredentials({email, password}){
       
        const userInDatabase = this.testDatabase.filter(account =>  account.email == email && account.password == password)
        
        if(userInDatabase.length == 0)throw new AppError('E-mail or password is invalid', 401)

        const [user] = userInDatabase
        
        const objectJson = JSON.stringify(user)
        
        const token = await hash(objectJson, 8)
        
        return{
            user,
            token : token
        }
    }

  
}

module.exports = SessionsRepositoryTest