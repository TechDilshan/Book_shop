const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'sanujidevasurendra@gmail.com',
        pass: 'paho fwzr hmff mhpi'
    }
});

// Function to send email
const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: 'sanujidevasurendra@gmail.com',
            to,
            subject,
            text
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendEmail };
