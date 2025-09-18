require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const secret_key = process.env.JWT_SECRET_KEY;
const Logger = require('../../../logger')
const UserRecord = require('./userRecord')

class UserAuth {
    constructor() {
        this.userRecord = new UserRecord
    }

    async create(name, email, password) {
        try {
            const hashed = await this.hashPassword(password)
            //armazena os dados no db
            const user = await this.userRecord.create(name, email, hashed)

            return user
            
        } catch (error) {
            Logger.error(error, 'Erro ao criar o usuario')
            throw new Error('Erro ao criar o usuario')
        }
    }

    async hashPassword(password) {
        try {
            //encriptação da senha
            const passwordCrypt = await bcrypt.hash(password, 10);
        
            Logger.info({
                crypted: passwordCrypt
            }, `Sucesso ao criptografar a senha!`)

            return passwordCrypt
            
        } catch (error) {
            Logger.error(error, `falha ao criptografar a senha`)
            throw new Error('falha ao criptografar a senha')
        }
    }

    async generateToken(userData) {
        try {
            //payload JWT
            const tokenPayload = {
               id: userData.id,
               name: userData.name,
               email: userData.email,
            }

            //gerando o token
            const token = jwt.sign(tokenPayload, secret_key,{expiresIn: '1h'});
            Logger.info('Token gerado com sucesso!')
            return token
            
        } catch (error) {
            Logger.error(error, 'Não foi possivel gerar a token')
            throw new Error('Não foi possivel gerar a token')
        }
    }

    async login(email, password) {
        try {
            //obriga o usuário preencher todos os campos
            if (!email || !password) {
                Logger.error('Preecha todos os campos')
                throw new Error("Preencha todos os campos");
                    
            }
            
            const userExist = await this.userRecord.findByEmail(email)

            if (!userExist) {
                throw new Error("Usuario nao existe");
                        
            }
        
            //verifica se a senha é compatível
            const passwordValid = await bcrypt.compare(password, userExist.password);
            if (!passwordValid) {
                throw new Error("Senha invalida");
                
            }
            const token = await this.generateToken(userExist)
            return {
                user: userExist, 
                token
            };
        } catch (error) {
            Logger.error(error, 'Falha ao logar no sistema!')
            throw error
        }
    }

    async findByEmail(email) {
        console.log('entrou no find!')
        //verificar se o usuário já existe
        const userExist = await this.userRecord.findByEmail(email)
        
        if (userExist) {
            Logger.info(`Usuario encontrado!`)

            return userExist
        }
    }

}

module.exports = UserAuth