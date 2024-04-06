import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import '../index.css';
import '../CSS_C/ProductItemCSS_C.css';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { FaShoppingCart } from 'react-icons/fa';
import StockUpdate_C from './StockUpdate_C';
import createCart from '../createCart';

const ProductItem_C = ({ rows }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };



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
          <div className="flex" key={row.id}>
            <div className="product-container">
                <Link to={`/ProductDetails_C`} state={{ row }}>
                <div className="image-container">
                  {imageUrl ? (
                    <img src={imageUrl} alt={`Photo-${row.id}`} />
                  ) : (
                    <img src="https://t4.ftcdn.net/jpg/05/07/58/41/360_F_507584110_KNIfe7d3hUAEpraq10J7MCPmtny8EH7A.jpg" alt="Placeholder" />
                  )}
                </div>
              </Link>
              <div className="product-details">
                <div className="product-name">
                  <div className="name-tag">{row.name}</div>
                </div>
                <div className="description">
                  <div className="description-text">{row.sdes}</div>
                </div>
                <div className="price">
                  <p className="price-text">LKR. {row.price}</p>
                </div>
                <div className="quantity">
                <div className="quantity-controls">
                    <button className="decrement" onClick={handleDecrement}>-</button>
                    <input type="number" className="quantity-input" value={quantity} min="1" style={{ width: '40px' }} />

                    <button className="increment" onClick={handleIncrement}>+</button>
                </div>
                <button 
                    className={`add-to-cart ${row.stock === 0 ? '' : 'disabled'}`}
                    onClick={() => {
                      if (row.stock === 0) {
                        alert("Stock is zero. Cannot add to cart.");
                      } else {
                        StockUpdate_C({ productId: row.id, qty: quantity, stk: row.stock, type: "add", name: row.name, sdes: row.sdes, price: row.price });
                        createCart({ productId: row.id, qty: quantity });
                      }
                    }}
                  >
                    <span className="add-text">+Add</span>
                  </button>
                </div>
                <div className="stock-info">
                  <div className="stock-indicator"></div>
                  <div className={`stock-text ${row.stock === 0 ? 'text-red-500' : ''}`}  style={{ fontSize: '13px' }}>
                    {row.stock === 0 ? 'Out of stock' : `${row.stock} pcs. in stock`}
                  </div>

                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductItem_C;
