const prisma = require('../../../prisma/prima');
const groupsData = require('../../generated/prisma');

class GroupTaskService {
    async create(name, creatorId) {
        try {
            const newGroup = await prisma.groupTasks.create({
                data: {
                    name,
                    creatorId
                }
            });
            return {group: newGroup}
        } catch (error) {
            throw error;
        } 
    }

    async 
}

exports.createGroups = async (name, creatorId) => {
    try {
        const newGroup = await prisma.groupTasks.create({
            data: {
                name,
                creatorId
            }
        });
        return {group: newGroup}
    } catch (error) {
        throw error;
    }  
}

exports.listGroup = async () => {
    try {
        const groups = await prisma.groupTasks.findMany({
        select: {
            id: true,
            name: true, 
            tasks: {
                select: {
                    name: true,
                },
            },
            creator: {
                select: {
                    email: true,
                },
            },
        },
    })
    return {groups};
    } catch (error) {
        throw error;
    }
}

exports.listGroupById = async (groupId) => {
    try {
        const result = await prisma.groupTasks.findUnique({
        where: {
            id: parseInt(groupId)
        }
    });
    if (!result) {
        throw new Error("Esse grupo nao existe");
        
    }
    return {result}
    } catch (error) {
       throw error 
    }
}

exports.updateGroup = async (groupId, name) => {
    try {
        const groupUpdated = await prisma.groupTasks.update({
            where: {
                id: parseInt(groupId)
            },
            data: {
                name
            }
        })
        return {groupUpdated};
    } catch (error) {
        throw error
    }
}

exports.deleteGroups = async (groupId) => {
    try {
        const groupDelete = await prisma.groupTasks.delete({
            where: {
                id: parseInt(groupId)
        }
    });
    } catch (error) {
        throw error
    }
}

