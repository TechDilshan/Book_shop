const express = require('express');
const router_U = express.Router();
const controller_U = require('./controller_U');

router_U.post('/createcart', controller_U.createCart);
router_U.get('/getcart', controller_U.getCart);

module.exports = router_U;