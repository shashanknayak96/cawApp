const express = require('express');

const cawMessageController = require('../controller/cawMessage');

const cawRoutes = express.Router();


cawRoutes.post('/add', cawMessageController.addCaw);
cawRoutes.post('/get', cawMessageController.getCaws);

module.exports = cawRoutes;