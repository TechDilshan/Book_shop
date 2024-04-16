const router = require("express").Router();

const {addPayments,viewPayments,viewOnePayment, updatePayments,deletePayments} = require ('../controllers_A/paymentController')

//add new Hotel 
router.post("/add", addPayments);

//view all Hotels
router.get("/", viewPayments);

//update existing Hotel
 router.put("/update/:id",updatePayments);

//delete existing one
 router.delete("/delete/:id",deletePayments);

//view one Hotel
router.get("/get/:id", viewOnePayment);



module.exports = router;