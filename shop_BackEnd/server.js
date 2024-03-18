const express = require('express');
const app = express();
const app_U = express();
const cors = require('cors');
const bodyparser = require ("body-parser"); 


const port = 3001;
const port_U = 3002;
const host = 'localhost';
const mongoose = require('mongoose');
const router = require('./router');
const router_U = require('./router_U');

app.use(cors());
app.use(express.json());

app_U.use(cors());
app_U.use(express.json());

const uri = 'mongodb+srv://ITP_book:bookshop_itp@bookitp.pjtndp0.mongodb.net/?retryWrites=true&w=majority';

const connect = async () => {
    try{
        await mongoose.connect(uri);
        console.log('Connect to MongoDB ');
    }
    catch{
        console.log('MongoDB Error : ', error);
    }
};

connect();

const server = app.listen(port, host, () => {
    console.log(`Node server is listening to ${server.address().port}`)
});

const server_U = app_U.listen(port_U, host, () => {
    console.log(`Node server is listening to ${server_U.address().port}`)
});

app.use('/api', router);
app_U.use('/api_U', router_U);
//ABI