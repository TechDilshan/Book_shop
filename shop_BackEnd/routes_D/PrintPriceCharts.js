const router = require("express").Router();
const { model } = require("mongoose");
const PrintPriceChart = require("../models_D/PrintPriceChart");

//create
router.route("/add").post((req,res)=>{

    const paperSize = req.body.paperSize;
    const colour = req.body.colour;
    const side = req.body.side;
    const price = Number(req.body.price);

    const newPaperSize = new PrintPriceChart({
        paperSize,
        colour,
        side,
        price
    });

    //pass the object to the DB as a doc
    newPaperSize.save().then(()=>{
        res.json("New Paper Size Added To The Chart")
    }).catch((err)=>{
        console.log(err);   //unsuccess msg
        res.status(500).json({ error: "Error with adding a new paper size", Details: err.message });
    });
});


//read all
router.route("/").get((req,res)=>{

    PrintPriceChart.find().then((printPrices)=>{
        res.json(printPrices)   //pass details to the frontend of the particual ID
    }).catch((err)=>{
        console.log(err)    //unsuccess msg
    })
})


//update
router.route("/update/:priceChartid").put(async (req,res) => {

    let PriceChartID = req.params.priceChartid; //taking the ID to update
    const {paperSize, colour, side, price} = req.body;

    //create object for update
    const updatePrice = {
        paperSize,
        colour,
        side,
        price
    }

    //check if there is any price record for that feched id
    const update = await PrintPriceChart.findByIdAndUpdate(PriceChartID, updatePrice).then(() => {
        res.status(200).send({Status: "Price of the paper size has been Updated"}) //if the updation was successful
    }).catch((err) => {
        console.log(err);
        res.status(500).send({Status: "Error with updating the price!", error: err.message}) //unsuccessful msg
    })
})

//delete
router.route("/delete/:priceChartid").delete(async(req,res) => {
    let PriceChartID = req.params.priceChartid; //taking the ID to DELETE
    await PrintPriceChart.findByIdAndDelete(PriceChartID).then(()=>{
        res.status(200).send({Status : "Paper Size is successfully deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({Status: "Error with deleting the paper size!", error: err.message}) //unsuccessful msg
    })
})

//fetch data of a one recod of PrintPriceChart
router.route("/get/:priceChartid").get(async (req,res) => {
    let PriceChartID = req.params.priceChartid;
    const Chart = await PrintPriceChart.findById(PriceChartID).then((printprice) => {
        res.status(200).send({Status : "Data of the paper is fetch", printprice})
    }).catch(()=> {
        console.log(err.message);
        res.status(500).send({Status : "Error when fetching data", error: err.message});
    })
})

module.exports = router;