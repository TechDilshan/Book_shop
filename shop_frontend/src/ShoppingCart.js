import React, { useEffect, useState } from 'react';
import Navi from './Navi';
import Axios from 'axios';
import './CSS_C/ProductHomeCSS_C.css';
import CartBlock_U from './CartBlock_U';

const ShoppingCart = () => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = () => {
    Axios.get(`http://localhost:3002/api_U/getcart`)
      .then((response) => {
        setCarts(response.data?.response || []);
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  };
  
  const userEmail = sessionStorage.getItem('userEmail');
  const filteredCarts = carts.filter(cart => cart.email === userEmail);

  return (
    <div>
      <div>
        <Navi />
      </div>
      <div className='shopping-cart'>
        <h2 className='cart-title'>Shopping Cart</h2>
        <div className=''>
          {filteredCarts.map((cart) => (
            <div key={cart.id} className=''>
              <CartBlock_U rows={[cart]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
