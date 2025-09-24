const express = require('express');
const router = express();
const TaskController = require('./tasks.controllers');

router.post('/create', TaskController.create);
router.get('/all/:userId', TaskController.getAllTasksByUser)
router.get('/:id', TaskController.getTaskById);
router.put('/:id', TaskController.update);
router.delete('/:id', TaskController.delete);

module.exports = router;