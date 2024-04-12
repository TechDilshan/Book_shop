const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const feedbackSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    productId: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
});



const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;