class UserRepositoryArray{
    users = []
    async findByEmail(email){
       
        const [userExists]  = this.users.filter(user => user.email == email)
        console.log(userExists)
        return userExists
    }

    async create({email, password, name}){
        const user = {
            email, 
            password,
            name
        }
        this.users.push(user)
        return this.users
    }

}

module.exports = UserRepositoryArray