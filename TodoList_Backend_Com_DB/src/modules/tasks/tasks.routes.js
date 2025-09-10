const express = require('express');
const router = express();
const taskController = require('./tasks.controllers');

router.post('/groups/create', taskController.createTask);
router.get('/tasks/:id', taskController.listTasksController);
router.put('/tasks/:id', taskController.updateTasksController);
router.delete('/tasks/:id', taskController.deleteTasksController);

module.exports = router;