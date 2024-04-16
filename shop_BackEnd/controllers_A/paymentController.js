const payments = require("../models_A/Payment");

//add new Vehicle for system
exports.addPayments= async (req, res) => {
 
    //constant variables for the attributes
    const {
        cardHolderName,
        cardNumber,
        expiryDate,
        cvv
     } = req.body;
  
          const newPaymentDetails = new payments({
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv
        })
    
        newPaymentDetails.save().then(() => {
             res.json("Payment Details Added")
    
        }).catch((err) => {
          
        })
      
    .catch((err) =>{
        
    })
    };

//delete existing one
exports.deletePayments = async (req, res) => {
    let paymentID = req.params.id;
   
    await payments.findByIdAndDelete(paymentID).then(() => {
      res.status(200).json({ status: "Deleted Successfully" });
    }).catch((error) => {
      res.status(500).json({ status: "Error with Deleting", error: error.message });
    })
  }
   
 //update 
 exports.updatePayments= async (req, res) => { 
    //fetch id from url
    let id = req.params.id;
    const {
        cardHolderName,
            cardNumber,
            expiryDate,
            cvv
           } = req.body;
  
    const updatePaymentDetails = {
        cardHolderName,
            cardNumber,
            expiryDate,
            cvv
        }
  
  
    const update = await payments.findByIdAndUpdate(id, updatePaymentDetails).then(() => {
      res.status(200).send({status: "Payment Details updated"})
    }).catch((err) => {
        res.status(500).send({status: "Error with updating Payment Details", error: err.message});
    })   
  }

//view 
exports.viewPayments= async (req, res) => { 
 
    //calling  model
    payments.find().then((paymentDetails) => {
      res.json(paymentDetails)
  
  }).catch((err) => {
     
  })
  
  }
  //view one
  exports.viewOnePayment = async (req, res) => {
    
    let paymentNumber = req.params.id;
    const payment = await payments.findById(paymentNumber).then((payment) => {
        res.status(200).send({status: "fetched", payment})
    }).catch(() => {
        
         res.status(500).send({status:"Error with get " , error: err.message})
    })
  }

exports.viewOnePaymentDetails = async (req, res) => {
    const name = req.params.cardHolderName; // Assuming the name is passed as a parameter

    try {
        const paymentname = await payments.findOne({ name: name });
        if (paymentname) {
            res.status(200).json({ status: "success", storeoffer });
        } else {
            res.status(404).json({ status: "error", message: "Offer not found" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};