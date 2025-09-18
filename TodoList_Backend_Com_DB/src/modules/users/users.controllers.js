const Logger = require('../../../logger')
const UserAuth = require('./userAuth.service')

class UserController {
    constructor() {
        this.userAuth = new UserAuth()
    }

    register = async (req, res) => {
        try {
            const { name, email, password } = req.body;
        
            const userExisting = await this.userAuth.findByEmail(email)
            if(userExisting) {
                return res.status(400).json({message: 'usuario já existe!'})
            }
            const newUser = await this.userAuth.create(name, email, password)

            res.status(201).json({
                message: `usuário criado com sucesso` ,
                user: newUser
            });
            Logger.info('usuário criado com sucesso')
        } catch (error) {
            res.status(500).json({
                error: 'Error ao criar usuário',
                message: error
            });
        }
    }

    login = async (req, res) => {
        try {
            const {email, password} = req.body;
            const result = await this.userAuth.login(email, password);
            res.status(200).json({
                message: 'Login efetuado com sucesso',
                user: result.userExists, 
                token: result.token
            });
            Logger.info('usuário logado com sucesso')
        } catch (error) {
            Logger.error(error, 'Erro ao logar')
            res.status(401).json({error: 'Falha ao efetuar o Login, reveja as credeciais e tente novamente.'});  
        }
    }

    getAllUsers = async (req, res) => {
        try {
            const result = await userService.getUsers();
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: `Erro no servidor`
            });
        }
    }
}

module.exports = new UserController