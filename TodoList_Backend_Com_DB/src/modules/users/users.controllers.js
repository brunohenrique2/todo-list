const userService = require('./users.service');

exports.createUserController = async (req, res) => {
    try {
        const{name, email, password} = req.body;
        const result = await userService.createUser(name, email, password);
        res.status(201).json({
            message: `usuário criado com sucesso` ,
            user: result.user, 
            token: result.token});
        
    } catch (error) {
        res.status(500).json({error: 'Error ao criar usuário'});
    }
}

exports.loginUserController  = async (req, res) => {
    try {
        const {email, password} = req.body;
        const result = await userService.loginUser(email, password);
        console.log('Dados: ', email, password);
        res.status(200).json({
            message: 'Login efetuado com sucesso',
            user: result.userExists, 
            token: result.token});
    } catch (error) {
      res.status(401).json({error: 'Usuário não autorizado'});  
    }
}

exports.getUsersController = async (req, res) => {
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
