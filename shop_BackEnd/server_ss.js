// const express = require('express');
// const dotenv = require ('dotenv');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const cookieParser = require ('cookie-parser');

// dotenv.config()
// const router = require('./router_ss')



// const app = express();
// const port = 5000;
// const host = 'localhost';


// app.use(cors());
// app.use(express.json());
// app.use('/auth', router)
// app.use(cookieParser())

// const uri = 'mongodb+srv://ITP_book:bookshop_itp@bookitp.pjtndp0.mongodb.net/?retryWrites=true&w=majority';

// const connect = async () => {
//     try{
//         await mongoose.connect(uri);
//         console.log('Connect to MongoDB ');
//     }
//     catch{
//         console.log('MongoDB Error : ', error);
//     }
// };

// connect();

// const server = app.listen(port, host, () => {
//     console.log(`Node server is listening to ${server.address().port}`)
// });



const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
const router = require('./router_ss');

const app = express();
const port = 5000;
const host = 'localhost';

app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Allow cookies and authorization headers with credentials
  })
);
app.use(express.json());
app.use('/auth', router);
app.use(cookieParser());

// MongoDB connection
const uri = 'mongodb+srv://ITP_book:bookshop_itp@bookitp.pjtndp0.mongodb.net/?retryWrites=true&w=majority';

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('MongoDB Error:', error);
  }
};

connect();

// Start the server
const server = app.listen(port, host, () => {
  //console.log(`Node server is listening on ${server.address().port}`);
});

