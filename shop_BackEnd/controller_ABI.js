const { response } = require("./app_ABI");
const User = require("./model_ABI");

const getUsers = (req, res, next) => {
  User.find()
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

const createPurchaseOrder = async (req, res, next) => {
  const {
    name,
    email,
    phone,
    address,
    zipcode,
    state,
    order,
    items,
    discount,
    startDate,
    endDate,
    status,
  } = req.body;

  const user = new User({
    name: name,
    email: email,
    phone: phone,
    address: address,
    zipcode: zipcode,
    state: state,
    order: order,
    items: items,
    discount,
    discount,
    startDate: startDate,
    endDate: endDate,
    status: status,
  });

  user
    .save()
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      console.error("Error adding user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const getPurchaseorder = (req, res, next) => {
  const regex = /^#/; 
  User.find({ order: regex })
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

const updatePurchaseOrder = (req, res, next) => {
    const { order, items } = req.body;
    const itemId = items._id; 
    
    User.findOneAndUpdate(
        { "order": order, "items._id": itemId },
        {
            $set: {
                "items.$[inner].discount": items.discount,
                "items.$[inner].amount": items.amount,
            },
        }, // Update the discount and amount fields
        {
            arrayFilters: [{ "inner._id": itemId }],
            new: true,
        } // Use arrayFilters to identify the specific item
    )
    .then((response) => {
        if(response) {
            res.json({ response });
        } else {
            res.status(404).json({ error: "Order not found" });
        }
    })
    .catch((error) => {
        res.status(500).json({ error });
    });
};


const deletePurchaseOrder = async (req, res) => {
  const order = req.body.order;
  User.deleteOne({ order: order })
    .then((response) => {
      console.log("success");
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

const acceptPurchaseOrder = async(req,res) => {
    const { order } = req.body;

    User.findOneAndUpdate(
      { order: order },
      { status: 1 }, // Set status to 1
      { new: true }
    )
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update status" });
    });
}

exports.getUsers = getUsers;
exports.createPurchaseOrder = createPurchaseOrder;
exports.getPurchaseorder = getPurchaseorder;
exports.updatePurchaseOrder = updatePurchaseOrder;
exports.deletePurchaseOrder = deletePurchaseOrder;
exports.acceptPurchaseOrder = acceptPurchaseOrder;
