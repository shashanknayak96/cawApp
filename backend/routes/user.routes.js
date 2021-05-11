const express = require('express');

const userController = require('../controller/user');
// const cawMessageController = require('../controller/cawMessage');

const userRoutes = express.Router();

userRoutes.post('/signup', userController.sigupUser);
userRoutes.post('/login', userController.loginUser);

// router.post('caw/add', cawMessageController.addCaw);

module.exports = userRoutes;