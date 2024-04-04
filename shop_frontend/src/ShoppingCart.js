import React, { useEffect, useState } from 'react';
import Navi from './Navi';
import Axios from 'axios';
import './CSS_C/ProductHomeCSS_C.css';
import CartBlock_U from './CartBlock_U';
import { Link } from 'react-router-dom'; 
import './index.css';
import './CSS_C/ShoppingCart.css';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import { FaShoppingCart } from 'react-icons/fa';
import StockUpdate_C from './StockUpdate_C';
import createCart from './createCart';

const ShoppingCart = () => {
  const [carts, setCarts] = useState([]);
  const [carts2, setCarts2] = useState([]);
  const [total, setTotal] = useState(0); // Initialize total to 0
  const [imageUrls, setImageUrls] = useState([]);


  useEffect(() => {
    getCartDetails();
    getCart();
  }, []);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(carts.map(async (cart) => {
        try {
          const filteredCart = carts.find(c => c.id === cart.id);
          if (!filteredCart || !filteredCart.imgId) {
            return null; // If no matching cart or imgId is found, return null
          }

          const url = await getDownloadURL(ref(storage, `images/${filteredCart.imgId}`));
          return { id: cart.id, url };
        } catch (error) {
          console.error('Error fetching image URL:', error);
          return null;
        }
      }));
      setImageUrls(urls.filter(url => url !== null));
    };
    fetchImageUrls();
  }, [carts]);

  useEffect(() => {
    // Calculate total when carts or carts2 change
    let calculatedTotal = 0;
    carts2
      .filter(cart => cart.email === userEmail)
      .forEach(cart => {
        const filteredCart = carts.find(c => c.id === cart.id);
        if (filteredCart) {
          calculatedTotal += filteredCart.price * cart.quantity;
        }
      });
    
    setTotal(calculatedTotal);
  }, [carts, carts2]);

  const handleButtonClick = () => {
    window.location.reload();
  };

  const getCartDetails = () => {
    Axios.get('http://localhost:3001/api/users')
      .then((response) => {
        setCarts(response.data?.response || []);
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  };

  const deleteCart = (id) => {
    Axios.post('http://localhost:3002/api_U/deletecart', { id: id })
      .then((response) => {
        // Remove the deleted item from the carts state
        setCarts(prevCarts => prevCarts.filter(cart => cart.id !== id));
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  };

  const getCart = () => {
    Axios.get(`http://localhost:3002/api_U/getcart`)
      .then((response) => {
        setCarts2(response.data?.response || []);
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
        {carts2
  .filter(cart => cart.email === userEmail)
  .map((cart) => {
    const imageUrlObj = imageUrls.find(urlObj => urlObj.id === cart.id);
    const imageUrl = imageUrlObj ? imageUrlObj.url : null;
    const filteredCart = carts.find(c => c.id === cart.id);

    return (
      <div className="cart-item" key={cart.id}>
        <div className="item-photo">
          {imageUrl ? (
            <img src={imageUrl} alt={`Photo-${cart.id}`} />
          ) : (
            <img src="https://t4.ftcdn.net/jpg/05/07/58/41/360_F_507584110_KNIfe7d3hUAEpraq10J7MCPmtny8EH7A.jpg" alt="Placeholder" />
          )}
        </div>
        <div className="item-details">
          <h3 className="item-name">ID: {cart.id}</h3>
          <h3 className="item-name">Name: {filteredCart ? filteredCart.name : 'Name not available'}</h3>
          <p className="item-price">LKR. {filteredCart ? filteredCart.price * cart.quantity : 'Price not available'}/=</p>
        </div>
        <div className="item-actions">
          <button className="action-button">-</button>
          <span className="item-quantity">{cart.quantity}</span>
          <button className="action-button">+</button>
          <button className="action-button delete-button" onClick={() => {deleteCart(cart.id); handleButtonClick();}}>Delete</button>
        </div>
      </div>   
    );
})}

      </div>
      Total: {total}
    </div>
  );
};

export default ShoppingCart;
