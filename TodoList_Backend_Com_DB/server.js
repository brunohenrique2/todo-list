require('dotenv').config();
const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const cors = require('cors');
const userRouter = require('./src/modules/users/users.routes');
const tasksRouter = require('./src/modules/tasks/tasks.routes');
const groupsRouter = require('./src/modules/groups/groups.routes');
const authenticateToken = require('./src/shared/middlewares/auth');
const publicRouter = express.Router()
const privateRouter = express.Router()

const corsOptions = {
   origin: function (origin, callback) {
    const whiteList = ['http://localhost:5173','http://127.0.0.1:3000'];
        if (!origin) return callback(null, true);
       if (whiteList.indexOf(origin) !== -1) {
           callback(null, true);
       }else{
           callback(new Error('Não permitido pelo CORS'));
       }
   },
   credentials: true,
   methods: ['GET','POST', 'PUT', 'DELETE', 'OPTIONS'],
   allowedHeaders: ['Content-Type','Authorization', 'X-correlation-id', 'origin']
}

app.use(cors(corsOptions));


app.use(express.json());   


//ROTAS PUBLICAS
publicRouter.use('/users', userRouter)
app.use('/public',publicRouter)

//ROTAS PRIVADAS
privateRouter.use('/tasks', authenticateToken, tasksRouter)
privateRouter.use('/groups', authenticateToken, groupsRouter)
app.use('/private', privateRouter)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

