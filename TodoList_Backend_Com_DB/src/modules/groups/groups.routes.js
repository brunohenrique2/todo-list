const GroupsTaskController = require('./groups.controllers');
const express = require('express');
const router = express();

router.post('/create', GroupsTaskController.create);
router.get('/', GroupsTaskController.getAll);
router.get('/:id', GroupsTaskController.getGroupById);
router.put('/:id', GroupsTaskController.update);
router.delete('/:id', GroupsTaskController.delete);
module.exports = router;