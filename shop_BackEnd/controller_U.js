const Cart = require('./model_U');
const Message = require('./models_note');

const createCart = (req, res, next) => {  // Function to create a new cart item
    const { id, email, quantity } = req.body; // Extract data from the request body
 
    const cart = new Cart({ // Create a new cart instance
        id: id,
        email: email,
        quantity:quantity,
    });

    cart.save()  // Save the new cart item to the database
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            console.error('Error adding user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};


const getCart = (req, res, next) => { // Function to retrieve all cart items
    Cart.find()   // Find all cart items in the database
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};


const updateCart = (req, res, next) => { // Function to update a cart item
    const { id, email, quantity } = req.body;
    
    Cart.updateOne({ id: id }, { $set: { quantity: quantity} })  // Update the quantity of the specified cart item
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};


const deleteCart = (req, res, next) => { // Function to delete a cart item
    const id = req.body.id;  // Extract the ID of the cart item to be deleted from the request body
    Cart.deleteOne({id: id}) // Delete the specified cart item from the database
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};





//Message


const createMessage = (req, res, next) => {  // Function to create a new cart item
    const { email, name, phoneNumber, note } = req.body; // Extract data from the request body
 
    const cart = new Message({ // Create a new cart instance
        email: email,
        name: name,
        phoneNumber:phoneNumber,
        note: note,
    });

    cart.save()  // Save the new cart item to the database
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            console.error('Error adding user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

const getMessage = (req, res, next) => { // Function to retrieve all cart items
    Message.find()   // Find all cart items in the database
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

const updateMessage = (req, res, next) => { // Function to update a cart item
    const { email, name, phoneNumber, note } = req.body;
    
    Message.updateOne({ email: email }, { $set: { name: name, phoneNumber:phoneNumber, note:note} })  // Update the quantity of the specified cart item
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

const deleteMessage = (req, res, next) => { // Function to delete a cart item
    const email = req.body.email;  // Extract the ID of the cart item to be deleted from the request body
    Message.deleteOne({email: email}) // Delete the specified cart item from the database
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

// Export the controller functions
exports.createCart = createCart;
exports.updateCart = updateCart;
exports.deleteCart = deleteCart;
exports.getCart = getCart;

exports.createMessage = createMessage;
exports.getMessage = getMessage;
exports.updateMessage = updateMessage;
exports.deleteMessage = deleteMessage;