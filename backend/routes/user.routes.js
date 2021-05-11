const express = require('express');

const userController = require('../controller/user');

const userRoutes = express.Router();

userRoutes.post('/signup', userController.sigupUser);
userRoutes.post('/login', userController.loginUser);
userRoutes.get('/getUserById', userController.getUserById);

module.exports = userRoutes;