const express = require('express');
const app_U = express();
const cors = require('cors');
const controller_U = require('./controller_U');

app_U.use(cors());

app_U.use(
    express.urlencoded({
        extended: true,
    })
);
app_U.use(express.json());


app_U.post('/createcart',(req,res) => {
    controller_U.createCart(req.body, (callack) => {
        res.send(callack);
    });
});


app.get('/getcart',(req,res) => {
    controller_U.getCart((req, res, next) => {
        res.send();
    });
});

app.post('/updatecart',(req,res) => {
    controller_U.updateCart(req.body, (callack) => {
        res.send(callack);
    });
});

app.post('/deletecart',(req,res) => {
    controller_U.deleteCart(req.body, (callack) => {
        res.send(callack);
    });
});
 
module.exports = app_U;