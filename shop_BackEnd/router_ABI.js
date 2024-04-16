const express = require('express');
const router = express.Router();
const controller = require('./controller_ABI');
const Employee  = require('./modelEm_ABI');
const EmployeeSal = require('./modelEmpSal_ABI')
const purchaseOrder = require('./model_ABI')

router.get('/users', controller.getUsers);
router.post('/createPurchaseorder', controller.createPurchaseOrder);
router.get('/getPurchaseorder', controller.getPurchaseorder)
router.post('/updatePurchaseOrder',controller.updatePurchaseOrder)
router.post("/deletePurchaseOrder", controller.deletePurchaseOrder);
router.post("/acceptPurchaseOrder", controller.acceptPurchaseOrder);

router.get('/getAllEmployeeDetails', async (req, res) => {
    try {
      const employees = await Employee.find();
      
      if (!employees || employees.length === 0) {
        return res.status(404).json({ message: "No employees found" });
      }
      
      return res.status(200).json({ response: employees });
    } catch (error) {
      console.error("Error fetching employee details:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

  router.post('/saveEmployeeSalData', async (req, res) => {
    try {
        const { employeeEmail, presentDate, perHourSalary, perDaySalary } = req.body;

        const newEmployeeSal = new EmployeeSal({
            employeeEmail,
            presentDate,
            perHourSalary,
            perDaySalary
        });

        await newEmployeeSal.save();

        res.status(201).json({ message: 'Employee salary data saved successfully.' });
    } catch (error) {
        console.error('Error saving employee salary data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.get('/getEmployeeSalaryDetails', async (req, res) => {
  try {
    const employeeSal = await EmployeeSal.find();
    
    if (!employeeSal || employeeSal.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }
    
    return res.status(200).json({ response: employeeSal });
  } catch (error) {
    console.error("Error fetching employee details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put('/updateEmployeeSalData', async (req, res) => {
  try {
      const { perHourSalary, perDaySalary, employeeEmails, presentDates } = req.body;

      const updatedEmployee = await EmployeeSal.findOneAndUpdate(
          { employeeEmail: employeeEmails, presentDate
            : { $in: presentDates } },
          { perHourSalary, perDaySalary },
          { new: true }
      );

      if (!updatedEmployee) {
          return res.status(404).json({ error: "Employee not found" });
      }

      return res.status(200).json(updatedEmployee);
  } catch (error) {
      console.error("Error updating employee salary data:", error);
      return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete('/deleteEmployeeSalData', (req, res) => {

  const employeeEmail = req.body.employeeEmail; // Accessing the email from request body

  EmployeeSal.deleteOne({ employeeEmail: employeeEmail }) // Use employeeEmail here

  .then((response) => {
    console.log("success");
    res.json({ response });
  })
  .catch((error) => {
    res.json({ error });
  });
});

router.get('/getCustomerPO', (req, res) => {
  const { email } = req.query;

  purchaseOrder.find({ email: email })
    .then(emailDetails => {
      if (emailDetails && emailDetails.length > 0) {
        res.status(200).json({ success: true, emailDetails: emailDetails });
      } else {
        res.status(404).json({ success: false, message: "Email details not found" });
      }
    })
    .catch(error => {
      console.error("Database Error: ", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    });
});


router.post('/CusUpdatePO', async (req, res) => {
  try {

    const { order, fullName, address, mobileNumber, state, zipcode, items } = req.body;

    const updatedOrder = await purchaseOrder.findOneAndUpdate(
      { order: order },
      { fullName, address, mobileNumber, state, zipcode, items },
      { new: true } 
    );

    if (updatedOrder) {
      res.json({ success: true, updatedOrder });
    } else {
      res.status(404).json({ success: false, message: 'Order not found' });
    }
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.delete('/deleteCusPO', async (req, res) => {
  try {
    const order = req.body.order; 
    console.log(order)
    await purchaseOrder.deleteOne({ order: order });

    console.log("success");
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: error.message });
  }
});






module.exports = router;