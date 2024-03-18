import React from 'react';
import Axios from 'axios';

const StockUpdate_C = ({ productId, qty, stk, type }) => {
    // Display the log message
    

    if(type=="add"){
        if(stk>=qty){
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
