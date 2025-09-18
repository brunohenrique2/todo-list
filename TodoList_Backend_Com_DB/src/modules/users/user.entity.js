class User {
    constructor(name, email, password) {
        this.name = name
        this.email = email
        this.password = password
    }

    changeName(newName) {
        //TODO: Regras de negocio
        return this.name = newName
    }

    changeEmail(newEmail) {
        //TODO: Regras de negocio
        return this.email = newEmail
    }

    changePassword(newPassword) {
        //TODO: Regras de negocio
        return this.password = newPassword
    }
}

module.exports = User