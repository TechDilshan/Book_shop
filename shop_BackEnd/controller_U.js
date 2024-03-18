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

exports.createCart = createCart;
exports.getCart = getCart;