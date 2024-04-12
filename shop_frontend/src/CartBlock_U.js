import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './index.css';
import './CSS_C/ProductItemCSS_C.css';
import './CSS_C/ShoppingCart.css';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import { FaShoppingCart } from 'react-icons/fa';
import StockUpdate_C from './StockUpdate_C';
import createCart from './createCart';
import Axios from 'axios';

const CartBlock_U = ({ rows }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    getCartDetails();
  }, []);

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

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(rows.map(async (row) => {
        try {
          const filteredCart = carts.find(cart => cart.id === row.id);
          if (!filteredCart || !filteredCart.imgId) {
            return null; // If no matching cart or imgId is found, return null
          }

          const url = await getDownloadURL(ref(storage, `images/${filteredCart.imgId}`));
          return { id: row.id, url };
        } catch (error) {
          console.error('Error fetching image URL:', error);
          return null;
        }
      }));
      setImageUrls(urls.filter(url => url !== null));
    };
    fetchImageUrls();
  }, [rows, carts]);

  return (
    <div>
      {rows.map((row) => {
        const imageUrlObj = imageUrls.find(urlObj => urlObj.id === row.id);
        const imageUrl = imageUrlObj ? imageUrlObj.url : null;

        const filteredCart = carts.find(cart => cart.id === row.id);

        return (
          <div className="cart-item" key={row.id}>
            <div className="item-photo">
              {imageUrl ? (
                <img src={imageUrl} alt={`Photo-${row.id}`} />
              ) : (
                <img src="https://t4.ftcdn.net/jpg/05/07/58/41/360_F_507584110_KNIfe7d3hUAEpraq10J7MCPmtny8EH7A.jpg" alt="Placeholder" />
              )}
            </div>
            <div className="item-details">
              <h3 className="item-name">ID: {row.id}</h3>
              <h3 className="item-name">Name: {filteredCart ? filteredCart.name : 'Name not available'}</h3>
              <p className="item-price">LKR. {filteredCart ? filteredCart.price * row.quantity : 'Price not available'}/=</p>
            </div>
            <div className="item-actions">
              <button className="action-button">-</button>
              <span className="item-quantity">{row.quantity}</span>
              <button className="action-button">+</button>
              <button className="action-button delete-button" onClick={() => {deleteCart(row.id); handleButtonClick();}}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartBlock_U;
