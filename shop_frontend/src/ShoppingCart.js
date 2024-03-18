import React, { useState } from 'react';
import './ShoppingCart.css'; // Import CSS file for styling
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';

const ShoppingCartItem = ({ item, increaseQuantity, decreaseQuantity, deleteItem }) => {
  const { photo, name, price, quantity } = item;

  return (
    <div className="cart-item">
      <img className="item-photo" src={photo} alt={name} />
      <div className="item-details">
        <h3 className="item-name">{name}</h3>
        <p className="item-price">Price: ${price * quantity}</p>
      </div>
      <div className="item-actions">
        <button className="action-button" onClick={() => decreaseQuantity(item)}>-</button>
        <span className="item-quantity">{quantity}</span>
        <button className="action-button" onClick={() => increaseQuantity(item)}>+</button>
        <button className="action-button delete-button" onClick={() => deleteItem(item)}>Delete</button>
      </div>
    </div>
  );
};

const ShoppingCart = () => {


  const [users, setUsers] = useState([]);
  
  const [cartItems, setCartItems] = useState([
    { id: 1, photo: 'https://cms.sarasavi.lk/storage/product/1788704878.jpg', name: 'Item 1', price: 10, quantity: 1 },
    { id: 2, photo: 'https://cms.sarasavi.lk/storage/product/1035007150.jpg', name: 'Item 2', price: 15, quantity: 1 },
    { id: 3, photo: 'https://cms.sarasavi.lk/storage/product/9814867128.jpg', name: 'Item 3', price: 20, quantity: 1 },
  ]);

  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice(cartItems));
  const [searchTerm, setSearchTerm] = useState('');

  function calculateTotalPrice(items) {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  const increaseQuantity = (item) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
    setTotalPrice(calculateTotalPrice(updatedCartItems));
  };

  const decreaseQuantity = (item) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id && cartItem.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
    setTotalPrice(calculateTotalPrice(updatedCartItems));
  };

  const deleteItem = (item) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCartItems);
    setTotalPrice(calculateTotalPrice(updatedCartItems));
  };

  const deleteCart = () => {
    setCartItems([]);
    setTotalPrice(0);
  };

  const filteredItems = cartItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="shopping-cart">
      <h2 className="cart-title">Shopping Cart</h2>
      <input
        type="text"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      {filteredItems.map((item) => (
        <ShoppingCartItem
          key={item.id}
          item={item}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          deleteItem={deleteItem}
        />
      ))}
      <p className="total-price">Total Price: ${totalPrice}</p>
      <div class="pay-now-button">
         <button class="pay-now">Pay Now</button>
            </div>

      <div className="cart-actions">
        <div className="pdf-download-container">
          <PDFDownloadLink document={<CartPDF cartItems={cartItems} totalPrice={totalPrice} />} fileName="shopping_cart.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Print Cart')}
          </PDFDownloadLink>
        </div>
      </div>
      <div><button className="delete-cart-button" onClick={deleteCart}>Delete Cart</button></div>
    </div>
  );
};

const CartPDF = ({ cartItems, totalPrice }) => (
  <Document>
    <Page>
      <Text>Shopping Cart</Text>
      {cartItems.map((item) => (
        <Text key={item.id}>{`${item.name} - ${item.quantity} x $${item.price} = $${item.price * item.quantity}`}</Text>
      ))}
      <Text>Total Price: ${totalPrice}</Text>
    </Page>
  </Document>
);

export default ShoppingCart;
