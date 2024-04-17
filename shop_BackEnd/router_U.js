const express = require('express');
const router_U = express.Router();  // Create a router instance
const controller_U = require('./controller_U');

router_U.post('/createcart', controller_U.createCart); // Route to create a new cart item
router_U.get('/getcart', controller_U.getCart);
router_U.post('/updatecart', controller_U.updateCart);
router_U.post('/deletecart', controller_U.deleteCart);

module.exports = router_U;