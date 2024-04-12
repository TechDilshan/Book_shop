const Cart = require('./model_U');

const createCart = (req, res, next) => {
    const { id, email, quantity } = req.body;

    const cart = new Cart({
        id: id,
        email: email,
        quantity:quantity,
    });

    cart.save()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            console.error('Error adding user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};


const getCart = (req, res, next) => {
    Cart.find()
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};


const updateCart = (req, res, next) => {
    const { id, email, quantity } = req.body;
    
    Cart.updateOne({ id: id }, { $set: { quantity: quantity} })
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};


const deleteCart = (req, res, next) => {
    const id = req.body.id;
    Cart.deleteOne({id: id})
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

exports.createCart = createCart;
exports.updateCart = updateCart;
exports.deleteCart = deleteCart;
exports.getCart = getCart;