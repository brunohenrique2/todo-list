const express = require('express')
const app = express()
const PORT = 3000
const HOST = "localhost"
const tasksData = require('./data/tasks.json')
const usersData = require('./data/users.json')
const taskGroupsData = require('./data/taskGroups.json')
const cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
    res.send('API funcionando')  
})

app.get('/users', (req, res) => {
    res.json(usersData)
})

app.get('/tasks', (req, res) => {
    res.json(tasksData)
})

app.get('/taskGroups', (req, res) => {
    res.json(taskGroupsData)
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`)
})