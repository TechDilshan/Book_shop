const express = require("express");
const cors = require("cors");
const  mongoose = require('mongoose');

const uri = 'mongodb+srv://ITP_book:bookshop_itp@bookitp.pjtndp0.mongodb.net/?retryWrites=true&w=majority';

const app = express();
// Enable all CORS requests
app.use(cors());

app.use(express.json());

//user router
const paymentRouter = require("./routes_A/paymentRoutes.js");
app.use("/payment", paymentRouter);

const shippingRouter = require("./routes_A/shippingRoutes.js");
 app.use("/shipping", shippingRouter);

const initialize = async () => {
    try {
      await mongoose.connect(uri);
      console.log("Mongodb connection success!");
    } catch (e) {
      console.log(e);
    }
  };
  
  const startServer = async () => {
    await initialize();
    app.listen(process.env.PORT || 3400);
    console.log('Server started');
  };
  
startServer();