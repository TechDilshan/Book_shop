const router = require("express").Router();

const {addShipping,viewShipping,viewOneShipping, updateShipping,deleteShipping} = require ('../controllers_A/shippingController')

//add new Hotel 
router.post("/add", addShipping);

//view all Hotels
router.get("/", viewShipping);

//update existing Hotel
 router.put("/update/:id",updateShipping);

//delete existing one
 router.delete("/delete/:id",deleteShipping);

//view one Hotel
router.get("/get/:id", viewOneShipping);



module.exports = router;