const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({ // Define the user schema
    id: Number,
    email: String,
    quantity: Number,
});

const createCart = mongoose.model('createCart',userSchema); // Create a mongoose model based on the user schema

module.exports = createCart; // Export the createCart model