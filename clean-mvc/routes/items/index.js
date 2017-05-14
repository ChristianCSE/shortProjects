'use strict';
const express = require('express');
const router = express.Router();
const itemsController = require('../../controllers/items');

//note that we don't have any verbs in the route itself 
//all verbs are maintained in the function name
//router.use('/items', require('./items'))=> links us here 
//itemsController the function you're now calling
router.get('/', itemsController.getItems);
router.get('/:id', itemsController.getItem);
router.post('/', itemsController.postItem);

module.exports = router;