const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const app = express();

// Load environment variables
require('dotenv').config();

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection setup
const uri = 'mongodb+srv://ITP_book:bookshop_itp@bookitp.pjtndp0.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('MongoDB connection error:', error));

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

// Routes
const router = require('./router');
const router_U = require('./router_U');
const feedbackRouter = require('./routes/reviews.js');
const couponRouter = require("./routes/coupons.js");

// Mount routers
app.use('/api', router, couponRouter, feedbackRouter);
app.use('/api_U', router_U);

// Controller
const controller = require('./controller');

// Route to fetch users' data
app.get('/api/users', async (req, res) => {
    try {
        const users = await controller.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to create a new user
app.post('/createuser', (req, res) => {
    controller.addUser(req.body, (callback) => {
        res.send(callback);
    });
});

// Route to update an existing user
app.post('/updateuser', (req, res) => {
    controller.updateUser(req.body, (callback) => {
        res.send(callback);
    });
});

// Route to delete an existing user
app.post('/deleteuser', (req, res) => {
    controller.deleteUser(req.body, (callback) => {
        res.send(callback);
    });
});

// Route to create a new shopping cart
app.post('/createcart', (req, res) => {
    controller.createCart(req.body, (callback) => {
        res.send(callback);
    });
});

module.exports = app;
