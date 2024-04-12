const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PrintPriceChartSchema = new Schema({
    
    paperSize :{
        type: String,
        required: true
    },

    colour :{
        type: String,
        required: true
    },

    side :{
        type: String,
        required: true
    },

    price :{
        type: Number,
        required: true
    },
})

const priceChart = mongoose.model("PriceChart_D",PrintPriceChartSchema);

module.exports = priceChart;