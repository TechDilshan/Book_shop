const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PrintOrderSchema = new Schema({
    uEmail: {
        type: String,
    },
    document: {
        data: Buffer, // Store the doc as binary data
        contentType: String // Store the content type (eg - application/pdf, image/jpeg)
    },
    colour: {
        type: String,
        required: true
    },
    copies: {
        type: Number,
        required: true
    },
    slides: {
        type: Number,
        required: true
    },
    orientation: {
        type: String,
        required: true
    },
    doubleSided: {
        type: Boolean,
        required: true
    },
    paperSize: {
        type: String,
        required: true
    },
    otherOptions: {
        type: String,
    },
    documentID: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the current timestamp when a document is created
    }
});

const PrintOrderModel = mongoose.model("PrintOrder_D", PrintOrderSchema);

module.exports = PrintOrderModel;
