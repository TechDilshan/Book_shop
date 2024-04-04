import { useEffect, useState } from 'react';
import Axios from 'axios';

const createCart = ({ productId, qty, stk}) => {
    // Retrieve the email session from sessionStorage
    const userEmail = sessionStorage.getItem('userEmail');

    if(stk>=qty){
        const payload = {
            id: productId,
            quantity: qty,
            email: userEmail, // Include the userEmail in the payload
        };
    
        console.log('p ID', productId);
        console.log('q', qty);
        console.log('e', userEmail);
    
        Axios.post('http://localhost:3002/api_U/createcart', payload)
            .then((response) => {
                // Handle response if needed
            })
            .catch((error) => {
                console.error('Axios Error: ', error);
            });
    }
    else{
        alert("Stock Exceeded. Cannot add to cart!..");
    }
    
};

export default createCart;
