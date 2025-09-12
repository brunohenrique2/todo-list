require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret_key = process.env.JWT_SECRET_KEY;

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            error: 'Token não encontrado'
            
        });
    }
    jwt.verify(token, secret_key, (error, user)=>{
        if (error) {
            return res.status(403).json({
                error: 'Token não é válido ou expirou!'
            });
        }
        req.user = user;
        next();
    });
    
    } catch (error) {
        res.status(500).json({
            error: 'Erro interno do servidor'
        });
    }

}

module.exports = authenticateToken;