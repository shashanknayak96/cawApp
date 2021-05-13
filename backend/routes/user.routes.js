const express = require('express');

const userController = require('../controller/user');

const userRoutes = express.Router();

userRoutes.post('/signup', userController.sigupUser);
userRoutes.post('/login', userController.loginUser);
userRoutes.get('/getUserById', userController.getUserById);
userRoutes.get('/getUserByNameOrTag', userController.getUserByNameOrTag);
userRoutes.post('/followUser', userController.followUser);
userRoutes.post('/unfollowUser', userController.unfollowUser);



module.exports = userRoutes;