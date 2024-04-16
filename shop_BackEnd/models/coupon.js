const mongooes = require('mongoose');

const Schema = mongooes.Schema;

const couponSchema = new Schema({
    couponId:{
        type:String,
        required : true,
    },

    discountPercentage:{
        type:String,
        required : false,
    },

    cusId:{
        type:String,
        required : false,
    },
    description:{
        type:String,
        required:true,
    },
    discountType:{
        type:String,
        required:true,
    },
    fixedAmount:{
        type:Number,
        required:false,
    },
    minCount:{
        type:Number,
        required:false,
    },
    ExpDate:{
        type:Date,
        required:true,
    },
    couponVisibility:{
        type:String,
        required:true,
    }

})


const Coupon = mongooes.model("Coupon",couponSchema);
module.exports = Coupon;