const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const paymentSchema = new Schema({

    cardHolderName: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Number,
        required: true
    },
    cvv: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});



const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;