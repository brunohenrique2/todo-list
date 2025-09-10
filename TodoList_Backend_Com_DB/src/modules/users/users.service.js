require('dotenv').config();
const dataUsers = require('../../generated/prisma');
const prisma = require('../../../prisma/prima');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret_key = process.env.JWT_SECRET_KEY;

exports.createUser = async (name, email, password) => {
    try {

        //encriptação da senha
        const passwordCrypt = await bcrypt.hash(password, 10);

        //verificar se o usuário já existe
        const userExist = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if (userExist) {
            throw new Error("Usuario ja existe");
        }
        //armazena os dados no db
        const users = await prisma.user.create({
            data: {
                name,
                email,
                password: passwordCrypt,
            }
        });
         //payload JWT
        const tokenPayload ={
            id: users.id,
            name: users.name,
            email: users.email,
        }
        //gerando o token
        const token = jwt.sign(tokenPayload, secret_key,{expiresIn: '1h'});

        return {user: users, token: token};
    } catch (error) {
        {
            throw error;
        }
    }
}

exports.loginUser = async (email, password) => {
    try {
        
        //obriga o usuário preencher todos os campos
        if (!email || !password) {
            throw new Error("Preencha todos os campos");
                
        }
        const userExist = await prisma.user.findUnique({
            where:{
                email
            }
        });
    
        //verifica se a senha é compatível
        const passwordValid = await bcrypt.compare(password, userExist.password);
        if (!passwordValid) {
            throw new Error("Senha invalida");
            
        }
        if (!userExist) {
            throw new Error("Usuario nao existe");
                    
        }
         //payload JWT
        const tokenPayload ={
            id: userExist.id,
            name: userExist.name,
            email: userExist.email,
        }

        //gerando o token
        const token = jwt.sign(tokenPayload, secret_key,{expiresIn: '1h'});
        return {
            user: userExist, 
            token};
    } catch (error) {
        {
            throw error
        };
    }
}

exports.getUsers = async () => {
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



