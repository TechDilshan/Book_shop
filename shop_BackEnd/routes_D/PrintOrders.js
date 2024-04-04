const router = require("express").Router();
const { model } = require("mongoose");
const PrintOrder = require("../models_D/PrintOrder");

// create
router.route("/add").post((req, res) => {
    const uEmail = req.body.uEmail;
    const document = req.body.document;
    const colour = req.body.colour;
    const copies = Number(req.body.copies);
    const slides = Number(req.body.slides);
    const orientation = req.body.orientation;
    const doubleSided = req.body.doubleSided;
    const paperSize = req.body.paperSize;
    const otherOptions = req.body.otherOptions;

    const newPrintOrder = new PrintOrder({
        uEmail,
        document,
        colour,
        copies,
        slides,
        orientation,
        doubleSided,
        paperSize,
        otherOptions
    });

    //pass the object to the DB as a doc
    newPrintOrder.save()
        .then(() => {
            res.json("Printing Order Placed Successfully"); // Success message
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error in placing print order", Details: err.message }); // Error message
        });
});

// Read all print orders
router.route("/").get((req, res) => {

    PrintOrder.find().then(pOrder => {
        res.json(pOrder);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: "Error fetching all the printing orders", Details: err.message });
    });
});

// Update
router.route("/update/:orderId").put(async (req, res) => {
    let orderId = req.params.orderId; //taking the ID to update
    const { document, colour, copies, slides, orientation, doubleSided, paperSize, otherOptions } = req.body;

    //create object for update
    const updateOrder = {
        document,
        colour,
        copies,
        slides,
        orientation,
        doubleSided,
        paperSize,
        otherOptions
    };

    //check if there is any order record for that feched id
    const update = await PrintOrder.findByIdAndUpdate(orderId, updateOrder).then(() => {
        res.status(200).send({Status: "Printing order updated successfully"}) //if the updation was successful
    }).catch((err) => {
        console.log(err);
        res.status(500).send({Status: "Error updating print order!", Details: err.message}) //unsuccessful msg
    })
});

//Delete
router.route("/delete/:orderId").delete(async(req,res) => {
    let orderId = req.params.orderId; //taking the ID to DELETE
    await PrintOrder.findByIdAndDelete(orderId).then(()=>{
        res.status(200).send({Status : "Print order deleted successfully"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({Status: "Error deleting print order!", Details: err.message}) //unsuccessful msg
    })
})

// Fetch data of a single print order
router.route("/get/:orderId").get((req, res) => {
    const orderId = req.params.orderId;

    // Fetch the order and handle the response
    PrintOrder.findById(orderId)
        .then(printOrder => {
            if (!printOrder) {
                res.status(404).json({ error: "Printing order not found" });
            } else {
                res.status(200).json({ Status: "Printing order data fetched", printOrder });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error fetching print order data", Details: err.message });
        });

})

router.route("/latest/:userEmail").get((req, res) => {
    const userEmail = req.params.userEmail;

    // Fetch the latest order for the specified user
    PrintOrder.findOne({ uEmail: userEmail }).sort({ createdAt: -1 })
        .then(printOrder => {
            if (!printOrder) {
                res.status(404).json({ error: "No order found for this user" });
            } else {
                res.status(200).json({ Status: "Latest printing order data fetched", printOrder });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error fetching latest print order data", Details: err.message });
        });
});


module.exports = router;
