const express = require('express');
const router = express.Router();

const UserController = require('./users.controllers');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/', UserController.getAllUsers)
router.get('/:id', UserController.getUserByEmail)


module.exports = router;