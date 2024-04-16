const express = require('express');
const app = express();
const cors = require('cors');
const controller = require('./controller');

app.use(cors());

app.use(
    express.urlencoded({
        extended: true,
    })

);

app.use(express.json());

//Get all product items Details
app.get('/api/users', async (req, res) => {
    try {
        const users = await controller.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Create new Product item
app.post('/createuser',(req,res) => {
    controller.addUser(req.body, (callack) => {
        res.send();
    });
});

//Update existing Product item
app.post('/updateuser',(req,res) => {
    controller.updateUser(req.body, (callack) => {
        res.send(callack);
    });
});

//Delete existing Product item
app.post('/deleteuser',(req,res) => {
    controller.deleteUser(req.body, (callack) => {
        res.send(callack);
    });
});

//Create cart 
app.post('/createcart',(req,res) => {
    controller.deleteUser(req.body, (callack) => {
        res.send(callack);
    });
});
 
module.exports = app;