const taskService = require("./tasks.service");
const Logger = require("../../../logger")

class TaskController {
    create = async (req, res) => {
        try {
            const correlationID = req.headers['x-correlation-id'];
            const { name, descricao, groupId } = req.body;
            console.log(groupId)
            const creatorId = req.user?.id;
            const result = await taskService.createTask({ name, descricao, creatorId, groupId });
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
            if (userid) {
                Logger.info(`Usuario passado com sucesso: ${userid}`)
            }
            const result = await taskService.getAllTasksByUser(userid)
            Logger.info(result, "Todas as tarefas do usuario retornadas com sucesso!")
            res.status(200).json({
                tasks: result
            })
        } catch (error) {
            Logger.error(error, `Error ao buscar as tarefas do usuario ${req.params.userId}`)
            res.status(500).json({
                message: `Erro no servidor`,
                error: error
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
            Logger.error(error, "Erro ao atualizar a tarefa!")
            res.status(500).json({
                message: `Erro ao atualizar a tarefa!`,
                error: error
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

