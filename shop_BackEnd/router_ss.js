const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Customer = require('./model_ss');
const Employee = require('./modelEm_ss');
const EmployeeSal = require('./modelSal');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const KEY = "jwttokenkey"; // Define KEY globally

router.post('/registor', async (req, res) => {
  const { username, email, number, address, password } = req.body;
  const cus = await Customer.findOne({ email })
  if (cus) {
    return res.json({ message: "user already existed" })
  }

  const hashpassword = await bcrypt.hash(password, 10)
  const newCustomer = new Customer({
    username,
    email,
    number,
    address,
    password: hashpassword,
  });

  await newCustomer.save()
  return res.json({ status: true, message: "record registed" })
})

router.post('/eregistor', async (req, res) => {
  const { username,fullname, email, nic, eroll, number, address, password } = req.body;
  const em = await Employee.findOne({ username })
  if (em) {
    return res.json({ message: "user already existed" })
  }

  const hashpassword = await bcrypt.hash(password, 10)
  const newEmployee = new Employee({
    username,
    fullname,
    email,
    nic,
    eroll,
    number,
    address,
    password: hashpassword,
  });

  await newEmployee.save()
  return res.json({ status: true, message: "record registed" })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await Customer.findOne({ email })
  if (!user) {
    return res.json({ message: "User is not registered" })
  }

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    return res.json({ message: "Password is incorrect" })
  }

  const token = jwt.sign({ username: user.username }, KEY, { expiresIn: '1h' })
  res.cookie('token', token, { httpOnly: true, maxAge: 360000 })
  return res.json({ status: true, message: "login successfully" })
})




router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Customer.findOne({ email })
    if (!user) {
      return res.json({ message: "user not registered" })
    }
    const token = jwt.sign({ username: user.username }, KEY, { expiresIn: '5m' })

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sathushan622@gmail.com',
        pass: 'jmal gzwg lksm mgpe'
      },
    });

    const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E")

    var mailOptions = {
      from: 'sathushan622@gmail.com',
      to: email,
      subject: 'Rest Password',
      text: `http://localhost:3000/resetPassword/${encodedToken}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "error sending email" })
      } else {
        return res.json({ status: true, message: "email sent" })
      }
    });

  } catch (err) {
    console.log(err)
  }
})

router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body

  try {
    const decoded = jwt.verify(token, KEY);
    const id = decoded.id;

    const hashpassword = await bcrypt.hash(password, 10)
    await Customer.findByIdAndUpdate(id , { password: hashpassword })
    return res.json({ status: true, message: "updated password" })
  } catch (err) {
    return res.json("invalid token")
  }
})

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" })
    }

    const decoded = await jwt.verify(token, KEY)
    next()
  
  } catch (err) {
    return res.json(err)
  }
}

router.get("/verify",verifyUser, (req, res) => {
    return res.json({status:true, message: "authorized"})
})

router.get('/logout', (req, res) =>{
  res.clearCookie('token')
  return res.json({status:true})
})



router.post('/elogin', async (req, res) => {
  const { email, password } = req.body;
  const user = await Employee.findOne({ email })
  if (!user) {
    return res.json({ message: "User is not registered" })
  }

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    return res.json({ message: "Password is incorrect" })
  }

  const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' })
  res.cookie('token', token, { httpOnly: true, maxAge: 360000 })
  return res.json({ status: true, message: "login successfully", eroll: user.eroll})
})



//customer profile
router.get('/getCustomerDetails', async (req, res) => {
  try {
    const { userEmail } = req.query;

    const customer = await Customer.findOne({ email: userEmail });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ response: customer });
  } catch (error) {
    console.error("Error fetching customer details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put('/updateCustomerDetails', async (req, res) => {
  try {
      const { username, email, number, address } = req.body;

      const updatedCustomer = await Customer.findOneAndUpdate(
          { email: email },
          { username: username, email: email, number: number, address: address },
          { new: true }
      );

      if (!updatedCustomer) {
          return res.status(404).json({ message: "Customer not found" });
      }

      return res.status(200).json({ message: "Customer details updated successfully", updatedCustomer });
  } catch (error) {
      console.error("Error updating customer details:", error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete('/deleteCustomerDetails', async (req, res) => {
  try {
      const { userEmail } = req.body;

      // Delete customer details using userEmail
      await Customer.deleteOne({ email: userEmail });

      return res.status(200).json({ message: "Customer details deleted successfully" });
  } catch (error) {
      console.error("Error deleting customer details:", error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
});




// employee profile

router.get('/getEmployeeDetails', async (req, res) => {
  try {
    const { userEmail } = req.query;

    const employee = await Employee.findOne({ email: userEmail });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({ response: employee });
  } catch (error) {
    console.error("Error fetching employee details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get('/getpaysheet', async (req, res) => {
  try {
    const { userEmail } = req.query;

    const employee = await EmployeeSal.findOne({ employeeEmail: userEmail });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({ response: employee });
  } catch (error) {
    console.error("Error fetching employee salary details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


router.put('/updateEmployeeDetails', async (req, res) => {
  try {
      const { username, fullname, email, eroll, nic, number, address } = req.body;

      const updatedEmployee = await Employee.findOneAndUpdate(
          { email: email },
          { username: username, fullname:fullname, email: email, eroll:eroll, nic:nic, number: number, address: address },
          { new: true }
      );

      if (!updatedEmployee) {
          return res.status(404).json({ message: "Customer not found" });
      }

      return res.status(200).json({ message: "Customer details updated successfully", updatedEmployee });
  } catch (error) {
      console.error("Error updating customer details:", error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
});






router.delete('/deleteEmployeeDetails', async (req, res) => {
  try {
      const { employeeId } = req.body;

      // Delete employee details using employeeId
      await Employee.deleteOne({ _id: employeeId });

      return res.status(200).json({ message: "Employee details deleted successfully" });
  } catch (error) {
      console.error("Error deleting employee details:", error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get('/readEmployeeDetails', async (req, res) => {
  try {
    const employee = await Employee.find();

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({ response: employee });
    
  } catch (error) {
    console.error("Error fetching employee details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get('/readCustomerDetails', async (req, res) => {
  try {
    const cus = await Customer.find();

    if (!cus) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ response: cus });
    
  } catch (error) {
    console.error("Error fetching Customer details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});




router.get('/getEmployeeSalary', async (req, res) => {
  try {
    const { userEmail } = req.query;

    const employee = await EmployeeSal.findOne({ employeeEmail: userEmail });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const perDaySalary = [employee.perDaySalary];

    return res.status(200).json({ response: perDaySalary });
  } catch (error) {
    console.error("Error fetching employee details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;






module.exports = router;


