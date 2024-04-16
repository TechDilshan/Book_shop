const express = require('express');
const app = express();
const cors = require('cors');

const router = require('./router_ABI')

const port = 6001;
const host = 'localhost';
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

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

app.use('/api', router)


