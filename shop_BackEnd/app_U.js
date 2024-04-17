const express = require('express');
const app_U = express();  // Create an express application
const cors = require('cors');  // Import the cors module for enabling Cross-Origin Resource Sharing (CORS)
const controller_U = require('./controller_U');

app_U.use(cors()); // Enable CORS for all routes

// Parse incoming requests with urlencoded and json middleware
app_U.use( 
    express.urlencoded({
        extended: true,
    })
);
app_U.use(express.json());


app_U.post('/createcart',(req,res) => { // Route to handle creating a new cart item
    controller_U.createCart(req.body, (callack) => { // Call the createCart function from the controller module and send the response
        res.send(callack);
    });
});


app.get('/getcart',(req,res) => { // Route to handle retrieving all cart items
    controller_U.getCart((req, res, next) => { // Call the getCart function from the controller module and send the response back
        res.send();
    });
});

app.post('/updatecart',(req,res) => { // Route to handle updating a cart item
    controller_U.updateCart(req.body, (callack) => {  // Call the updateCart function from the controller module and send the response back
        res.send(callack);
    });
});

app.post('/deletecart',(req,res) => { // Route to handle deleting a cart item
    controller_U.deleteCart(req.body, (callack) => { // Call the deleteCart function from the controller module and send the response back
        res.send(callack);
    });
});
 
module.exports = app_U; // Export the express application