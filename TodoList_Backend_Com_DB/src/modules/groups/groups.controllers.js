const groupService = require(`./groups.service`);

exports.createGroupController = async (req, res) => {
    try {
        const correlationID = req.headers['x-correlation-id']
        const { name } = req.body;
        const creatorId = req.user?.id;
        const result = await groupService.createGroups(name, creatorId);
        res.status(201).json({
            message: `Grupo criado`,
            group: result.newGroup
        });
    } catch (error) {
        res.status(500).json({
            message: `Error no servidor`
        });
    }
}

exports.listGroupController = async (req, res) => {
    try {
        const result = await groupService.listGroup();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: `Erro no servidor`
        })
    }
}

exports.listGroupByIdController = async (req, res) => {
    try {
        const groupId = parseInt(req.params.id);
        const result = await groupService.listGroupById(groupId);
        (result) ? res.status(200).json(result) : res.status(404).json({ message: 'grupo não encontrado'});
    
    } catch (error) {
        res.status(500).json({
            message: `Erro no servidor`
        });
    }
}

exports.updateGroupController = async (req, res) => {
    try {
        const groupId = parseInt(req.params.id);
        const {name} = req.body;
        const result = await groupService.updateGroup(groupId, name);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: `Erro no servidor`
        });
    }
}

exports.deleteGroupController = async (req, res) => {
    try {
        const groupId = parseInt(req.params.id);
        const result = await groupService.deleteGroups(groupId);
        res.status(200).json({
            message: `Grupo deletado!`
        });
    } catch (error) {
        res.status(500).json({
            message: `Erro no servidor`
        })
    }
}