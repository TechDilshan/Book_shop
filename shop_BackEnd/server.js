const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const uri = 'mongodb+srv://ITP_book:bookshop_itp@bookitp.pjtndp0.mongodb.net/?retryWrites=true&w=majority';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB Error:', error);
    }
};

connectToMongoDB();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'chamikadilshan1123@gmail.com',
        pass: 'rebamsneqyhhwcsh'
    }
});

const sendEmail = (email, subject, body) => {
    const mailOptions = {
        from: 'chamikadilshan1123@gmail.com',
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

app.post('/api/send-email', (req, res) => {
    const { email, subject, body } = req.body;
    sendEmail(email, subject, body);
    res.send('Email sent successfully');
});

const feedbackRouter = require('./routes/reviews.js');
const couponRouter = require('./routes/coupons.js');

app.use('/api/feedback', feedbackRouter);
app.use('/api/coupons', couponRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
    try {
        res.json({ status: 'ok' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Example route to fetch data from another API
