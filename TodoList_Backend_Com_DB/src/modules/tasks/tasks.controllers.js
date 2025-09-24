const taskService = require("./tasks.service");

class TaskController {
    create = async (req, res) => {
        try {
            const correlationID = req.headers['x-correlation-id'];
            const { name, descricao, status, groupId } = req.body;
            console.log('Id do usuario', req.user?.id)
            const creatorId = req.user?.id;
            const result = await taskService.createTask({ name, descricao, status, creatorId, groupId });
            res.status(201).json({
                message: `Tarefa criada`,
                task: result.newTask,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error no servidor' });
        }
    }

    getAllTasksByUser = async (req, res) => {
        try {
            const userid = parseInt(req.params.userId)
            const result = await taskService.getAllTasksByUser(userid)
        } catch (error) {
            res.status(500).json({
                message: `Erro no servidor`
            });
        }
    }

    getTaskById = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const result = await taskService.listTasks(id);
            res.status(200).json(result);

        } catch (error) {
            res.status(500).json({
                message: `Erro no servidor`
            });
        }
    }

    update = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const { name, descricao, status } = req.body;
            const result = await taskService.updateTasks(id, { name, descricao, status });
            res.status(201).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: `Error no servidor`
            });
        }
    }

    delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const result = await taskService.deleteTasks(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({
                message: `Erro no servidor`
            });
        }
    }
}

module.exports = new TaskController

