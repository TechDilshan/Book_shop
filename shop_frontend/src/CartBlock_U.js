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

const CartBlock_U = ({ rows }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [quantity, setQuantity] = useState(1);



  useEffect(() => {
    
    const fetchImageUrls = async () => {
      const urls = await Promise.all(rows.map(async (row) => {
        try {
          const url = await getDownloadURL(ref(storage, `images/${row.imgId}`));
          return { id: row.id, url };
        } catch (error) {
          console.error('Error fetching image URL:', error);
          return null;
        }
      }));
      setImageUrls(urls.filter(url => url !== null));
    };
    fetchImageUrls();
  }, [rows]);

    
  return (
    <div>
      {rows.map((row) => {
        const imageUrlObj = imageUrls.find(urlObj => urlObj.id === row.id);
        const imageUrl = imageUrlObj ? imageUrlObj.url : null;
        
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
                  <h3 className="item-name"> id {row.id}</h3>
                  <p className="item-price">quantity {row.quantity}</p>
              </div>

              <div className="item-actions">
                    <button className="action-button" >-</button>
                    <span className="item-quantity">3</span>
                    <button className="action-button" >+</button>
                    <button className="action-button delete-button" >Delete</button>
                    </div>
            </div>
        );
      })}
    </div>
  );
};

export default CartBlock_U;
