// router.js
const express = require('express');
const router = express.Router();
const controller = require('./controller');

//Create router links
router.get('/users', controller.getUsers);
router.post('/createuser', controller.addUser);
router.post('/updateuser', controller.updateUser);
router.post('/deleteuser', controller.deleteUser);
router.get('/getmaxid', controller.getMaxId);


module.exports = router;
