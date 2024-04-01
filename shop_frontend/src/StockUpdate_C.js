import React from 'react';
import Axios from 'axios';

const StockUpdate_C = ({ productId, qty, stk, type, name, sdes, price }) => {
    // Display the log message
    

    if(type=="add"){
        if(stk>qty){
            const newstk = stk - qty;

            const payload = {
                id: productId,
                stock: newstk,
              };

              Axios.post('http://localhost:3001/api/updateuser', payload)
              .then((response) => {
              })
              .catch((error) => {
                console.error('Axios Error: ', error);
              });

              alert('The product was successfully added to the cart..!');
              window.location.reload();
        }
        else if(stk==qty){

          const newstk = stk - qty;

            const payload = {
                id: productId,
                stock: newstk,
              };

              Axios.post('http://localhost:3001/api/updateuser', payload)
              .then((response) => {
              })
              .catch((error) => {
                console.error('Axios Error: ', error);
              });

              //pass email

            const emailPayload = {
              email: 'chamikamaths2002@gmail.com',
              subject: `${name} is Out of stock..!`,
              body: `This Product is out of stock..!, If there is new stock, please update it.

__________Product Details__________

Product id : ${productId}
Product Name : ${name}
Product Price : ${price}
Product Description : ${sdes}

___________________________________
Thank you..!`,
            };

            Axios.post('http://localhost:3001/api/send-email', emailPayload)
                .then((response) => {
                    console.log('Email sent!');
                })
                .catch((error) => {
                    console.error('Axios Error: ', error);
                });


                alert('The product was successfully added to the cart..!');
                window.location.reload();
            }

        else{
            alert('Stock Exceeded!');
        }
        
    }
    else if(type=="remove"){
        const newstk = stk + qty;

            const payload = {
                id: productId,
                stock: newstk,
              };

              Axios.post('http://localhost:3001/api/updateuser', payload)
              .then((response) => {
              })
              .catch((error) => {
                console.error('Axios Error: ', error);
              });
    }
    return null;
};

export default StockUpdate_C;
