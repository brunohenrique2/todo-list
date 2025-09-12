const prisma = require('../../../prisma/prima');
const dataTasks = require('../../generated/prisma');

const createTask =  async ({name, descricao, status, creatorId, groupId}) => {
    try {
        
        const idGroup = await prisma.groupTasks.findUnique({where:{id: groupId} })
        const newTask = await prisma.tasks.create({
            data: {
                name,
                descricao,
                status,
                creator:{
                    connect:{
                        id: creatorId
                    }
                },
                group: {
                    connect:{
                        id: idGroup.id
                    }
                }
            }
        });
        return {task: newTask};
    } catch (error) {
        throw error;
    }
    
}

const listTasks = async (taskId) => {
    try {
        const resultTasks = await prisma.tasks.findUnique({
            where: {
                id: taskId
            },
            include:{
                group: true
            }
        });
        if (!resultTasks) {
            throw new Error("Essa atividade não existe");
            
        }
        return {tasks: resultTasks}
    } catch (error) {
        throw error;
    }
}

const updateTasks = async (taskId,{name,descricao,status}) => {
    try {
        const updateTask = await prisma.tasks.update({
            where:{
                id: parseInt(taskId)
            },
            data:{
                name,
                descricao,
                status,
            },   
        });
        return updateTask
    } catch (error) {
        throw error;
    }
}

const deleteTasks = async (taskId) => {
    try {
        const updateTask = await prisma.tasks.delete({
            where:{
                id: parseInt(taskId)
            }
    }); 
    }catch (error) {
        throw error;    
    }
}

module.exports = {
    createTask,
    listTasks,
    updateTasks,
    deleteTasks
};