 const express = require('express');
const app = express();
const app_U = express();
const app_a = express();
const cors = require('cors');
const bodyparser = require ("body-parser"); 
const mongoose = require('mongoose');
const bodyPaeser = require('body-parser');
const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
require('dotenv').config();

app.use(bodyPaeser.json()); 

const port = process.env.PORT || 3001;
const port_U = 3002;
//const host = 'https://book-shop-nine-jet.vercel.app';
const host = 'localhost';

const router = require('./router');
const router_U = require('./router_U');


app_a.use(cors());
app_a.use(express.json());

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


//________________________________________________________________________________________________________
// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'chamikadilshan1123@gmail.com', // Your email address
        pass: 'rebamsneqyhhwcsh' // Your email password
    }
});

// Function to send email
const sendEmail = (email, subject, body) => {
    const mailOptions = {
        from: 'chamikadilshan1123@gmail.com', // Sender address
        to: email,
        subject: subject,
        text: body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

// Example route to trigger email sending
app.post('/api/send-email', (req, res) => {
    const { email, subject, body } = req.body;
    sendEmail(email, subject, body);
    res.send('Email sent successfully');
});

//________________________________________________________________________________________________________

const feedbackRouter = require('./routes/reviews.js');

const couponRouter = require("./routes/coupons.js")
//app.use("/coupons",couponRouter);

const server = app.listen(port, host, () => {
    console.log(`Node server is listening to ${server.address().port}`)
});

const server_U = app_U.listen(port_U, host, () => {
    console.log(`Node server is listening to ${server_U.address().port}`)
});

app.use('/api', router,couponRouter,feedbackRouter);
app_U.use('/api_U', router_U);

//ABI




//Andrew
const paymentRouter = require("./routes_A/paymentRoutes.js");
app_a.use("/payment", paymentRouter);

 const shippingRouter = require("./routes_A/shippingRoutes.js");
 app_a.use("/shipping", shippingRouter);

const server_A = app_a.listen(3004, host, () => {
    console.log(`Node server is listening to ${server_A.address().port}`)
});