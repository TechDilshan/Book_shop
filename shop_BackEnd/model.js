const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const userSchema = new Schema({
    id: Number,
    name: String,
    imgId: String,
    price: Number,
    sdes: String,
    des: String,
    item: String,
    stock: Number,
    email: String,
    quantity: Number,
});

const User = mongoose.model('User',userSchema);

module.exports = User;