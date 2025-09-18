const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();

const testDB = async () => {
    try {
        const connect = await prisma.$connect()
        if(connect === undefined){
            console.log('prisma conectado')
        } 
        
        
    } catch (error) {
        console.error('Erro ao conectar ao banco', error)
    }
}
console.log(testDB())
module.exports = prisma;