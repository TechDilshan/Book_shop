const express = require("express");
const app = express();
const cors = require("cors");
const controller = require("./controller_ABI");

app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/users", (req, res) => {
  controller.getUsers((req, res, next) => {
    res.send();
  });
});

app.post("/createPurchaseorder", (req, res) => {
  controller.createPurchaseorder(req.body, (callack) => {
    res.send();
  });
});

app.get("/getPurchaseorder", (req, res) => {
  controller.getPurchaseorder((req, res, next) => {
    res.send();
  });
});

app.post("/deletePurchaseOrder", (req, res) => {
    controller.deletePurchaseOrder(req.body, (callack) => {
      res.send(callack);
    });
  });

app.post("/updatePurchaseOrder", (req,res) =>{
  controller.updatePurchaseOrder(req.body, (callback) =>{
    res.send(callback)
  })
})

app.post("/acceptPurchaseOrder", (req,res) =>{
  controller.acceptPurchaseOrder(req.body, (callback) =>{
    res.send(callback)
  })
})
  

module.exports = app;
