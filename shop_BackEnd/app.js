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

app.get('/api/users', async (req, res) => {
    try {
        const users = await controller.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/createuser',(req,res) => {
    controller.addUser(req.body, (callack) => {
        res.send();
    });
});

app.post('/updateuser',(req,res) => {
    controller.updateUser(req.body, (callack) => {
        res.send(callack);
    });
});

app.post('/deleteuser',(req,res) => {
    controller.deleteUser(req.body, (callack) => {
        res.send(callack);
    });
});

app.post('/createcart',(req,res) => {
    controller.deleteUser(req.body, (callack) => {
        res.send(callack);
    });
});
 
module.exports = app;


