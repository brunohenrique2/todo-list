const userController = require('./users.controllers');
const express = require('express');
const router = express();

router.post('/register', userController.createUserController);
router.post('/login', userController.loginUserController);
router.get('/users', userController.getUsersController)


module.exports = router;