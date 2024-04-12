const router = require("express").Router();
let coupon = require("../models/coupon");

router.route("/addcoupon").post((req,res)=>{
    const couponId = req.body.couponId;
    const discountType = req.body.discountType;
    const discountPercentage = req.body.discountPercentage;
    const fixedAmount = req.body.fixedAmount;
    const minCount = req.body.minCount;
    const ExpDate = req.body.ExpDate;
    const couponVisibility = req.body.couponVisibility;
    const cusId = req.body.cusId;
    const description = req.body.description;

    const newCoupon = new coupon({
        couponId,
        discountType,
        discountPercentage,
        fixedAmount,
        minCount,
        ExpDate,
        couponVisibility,
        cusId,
        description
    })


    newCoupon.save().then(()=>{
        res.json("Coupon Added")
    }).catch((err)=>{
        console.log(err);
    })


})


router.route("/getcoupon").get((req,res)=>{
    coupon.find().then((coupons)=>{
        res.json(coupons);
      }).catch((err)=>{
        console.log(err);
      })
})



router.route("/updatecoupon/:id").put(async(req,res)=>{
    let cpnId = req.params.id;
    const {couponId,discountType,discountPercentage,fixedAmount,minCount,ExpDate,couponVisibility,cusId,description} = req.body;

    var updateCoupon ={
        couponId,
        discountType,
        discountPercentage,
        fixedAmount,
        minCount,
        ExpDate,
        couponVisibility,
        cusId,
        description
    }



    const update = await coupon.findByIdAndUpdate(cpnId , updateCoupon).then(()=>{
            res.status(200).send({
            status:"Coupon Updated"
        })
        }).catch((err)=>{
            console.log(err);
            res.status(500).send({
                status:" Error with upadating data",
                error: err.message
            })
    })


})


router.route("/deletecoupon/:id").delete(async(req,res)=>{
    const cpnId = req.params.id;

    const deleteUser = await coupon.findByIdAndDelete(cpnId).then(()=>{
        res.status(200).send({
            status:"Coupon Deleted",
        })
            }).catch((err)=>{
                console.log(err.message),
                res.status(500).send({
                    status:"Error with deleteing data",
                    error:err.message
        })
    })
})


router.route("/getcoupon/:id").get(async(req,res)=>{
    const userId = req.params.id;

    const user = await coupon.findById(userId).then((coupons)=>{
        res.status(200).send({
            status:"data Fetched",
            user:coupons
        })
            
        }).catch((err)=>{
            console.log(err.message);
            res.status(500).send({
                status:"Error with get data",
                error:err.message
            })
    })
})



module.exports = router;