const groupsControllers = require('./groups.controllers');
const express = require('express');
const router = express();

router.post('/groups', groupsControllers.createGroupController);
router.get('/groups', groupsControllers.listGroupController);
router.get('/groups/:id', groupsControllers.listGroupByIdController);
router.put('/groups/:id', groupsControllers.updateGroupController);
router.delete('/groups/:id', groupsControllers.deleteGroupController);
module.exports = router;