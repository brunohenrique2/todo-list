const prisma = require('../../../prisma/prima');
const Logger = require('../../../logger')

class UserRecord {
    async findByEmail(email) {
        try {
            //verificar se o usuário já existe
            const userExist = await prisma.user.findUnique({
                where:{
                    email: email
                }
            })
            
            if (userExist) {
                Logger.info(`Usuario encontrado!`)

                return userExist
            }
            
        } catch (error) {
            Logger.error('Usuario não encontrando ou não existe')
            throw error
        }
    }

    async create(name, email, password) {
        try {
            //armazena os dados no db
            const user = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: password
                }
            });

            return user
            
        } catch (error) {
            Logger.error(error, 'Erro ao criar o usuario')
            throw new Error('Erro ao criar o usuario')
        }
    }

    async getAllUsersData() {
        try {
            const users = await prisma.user.findMany({
                include: {
                    task: {
                        select: {
                                name: true                       
                }
            },
            groupTasks:{
        
            }
        }});
            return {users}
        } catch (error) {
            throw error;
        }
    }

}

module.exports = UserRecord