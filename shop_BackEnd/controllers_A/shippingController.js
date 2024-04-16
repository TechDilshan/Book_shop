const Shipping = require("../models_A/Shipping");

//add new Vehicle for system
exports.addShipping= async (req, res) => {
 
    //constant variables for the attributes
    const {
        fullName,
        address,
        city,
        postalCode,
        phone,
        email
     } = req.body;
  
          const newShippingDetails = new Shipping({
            fullName,
            address,
             city,
            postalCode,
            phone,
            email
        })
    
        newShippingDetails.save().then(() => {
             res.json("Shipping Details Added")
    
        }).catch((err) => {
          
        })
      
    .catch((err) =>{
        
    })
    };

//delete existing one
exports.deleteShipping = async (req, res) => {
    let shippingID = req.params.id;
   
    await Shipping.findByIdAndDelete(shippingID).then(() => {
      res.status(200).json({ status: "Deleted Successfully" });
    }).catch((error) => {
      res.status(500).json({ status: "Error with Deleting", error: error.message });
    })
  }
   
 //update 
 exports.updateShipping= async (req, res) => { 
    //fetch id from url
    let id = req.params.id;
    const {
            fullName,
            address,
             city,
            postalCode,
            phone,
            email
           } = req.body;
  
    const updateShippingDetails = {
            fullName,
            address,
             city,
            postalCode,
            phone,
            email
        }
  
  
    const update = await Shipping.findByIdAndUpdate(id, updateShippingDetails).then(() => {
      res.status(200).send({status: "Shipping Details updated"})
    }).catch((err) => {
        res.status(500).send({status: "Error with updating Shipping Details", error: err.message});
    })   
  }

//view 
exports.viewShipping= async (req, res) => { 
 
    //calling  model
    Shipping.find().then((shippingDetails) => {
      res.json(shippingDetails)
  
  }).catch((err) => {
     
  })
  
  }
  //view one
  exports.viewOneShipping = async (req, res) => {
    
    let ShippingNumber = req.params.id;
    const shipping = await Shipping.findById(ShippingNumber).then((shipping) => {
        res.status(200).send({status: "fetched", shipping})
    }).catch(() => {
        
         res.status(500).send({status:"Error with get " , error: err.message})
    })
  }

exports.viewOneShippingDetails = async (req, res) => {
    const fname = req.params.fullName; // Assuming the name is passed as a parameter

    try {
        const shippingname = await Shipping.findOne({ name: fname });
        if (shippingname) {
            res.status(200).json({ status: "success", shippingname });
        } else {
            res.status(404).json({ status: "error", message: "Shipping not found" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};