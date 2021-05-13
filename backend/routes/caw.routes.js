const express = require('express');

const cawMessageController = require('../controller/cawMessage');

const cawRoutes = express.Router();

//Add a caw
cawRoutes.post('/add', cawMessageController.addCaw);
//Get all caws for user
cawRoutes.post('/get', cawMessageController.getCaws);
//Like~Unlike caw
cawRoutes.post('/likeCaw', cawMessageController.likeCaw);
cawRoutes.post('/unlikeCaw', cawMessageController.unlikeCaw);
//Get Caw by ID
cawRoutes.get('/getCawById', cawMessageController.getCawById);
cawRoutes.get('/getCawsForFeed', cawMessageController.getCawsForFeed);





module.exports = cawRoutes;