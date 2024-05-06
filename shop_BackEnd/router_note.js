const express = require('express');
const router_U = express.Router();  // Create a router instance
const controller_U = require('./controller_U');

router_U.post('/createmessage', controller_U.createMessage); // Route to create a new cart item
router_U.get('/getmessage', controller_U.getMessage);
router_U.post('/updatemessage', controller_U.updateMessage);
router_U.post('/deletemessage', controller_U.deleteMessage);

module.exports = router_U;