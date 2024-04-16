const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const purchaseOrder = new Schema({
    name :  String,
    email: String,
    phone :  Number,
    address : String,
    zipcode : Number,
    state : String,
    order : String,
    items: [{ item: String, description: String, quantity: Number, price: Number, amount: Number,discount: Number }],
    discount: Number,
    startDate: Date,
    endDate: Date,
    status: Number,
});

const User = mongoose.model('purchaseOrder', purchaseOrder)

module.exports = User;