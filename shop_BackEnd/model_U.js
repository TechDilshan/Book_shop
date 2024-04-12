const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Number,
    email: String,
    quantity: Number,
});

const createCart = mongoose.model('createCart',userSchema);

module.exports = createCart;