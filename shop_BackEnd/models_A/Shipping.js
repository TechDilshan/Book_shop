const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shippingSchema = new Schema({

    fullName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});



const Shipping = mongoose.model('Shipping', shippingSchema);

module.exports = Shipping;