import React, { useEffect, useState } from 'react';
import Navi from './Navi';
import Axios from 'axios';
import './CSS_C/ProductHomeCSS_C.css';
import { Link } from 'react-router-dom'; 
import './index.css';
import './CSS_C/ShoppingCart.css';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import StockUpdate_C from './component_Dila/StockUpdate_C';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import Foot from './footer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#def0f0',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    border: '1px solid #ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textDecoration: 'underline',
  },
  item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDetail: {
    fontSize: 14,
    marginBottom: 3,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});




const BillGenerator = ({ items, total, carts }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>RATHI INTEC SHOPPING CART BILL</Text>
        {items.map(item => {
          const filteredCart = carts.find(c => c.id === item.id);
          return (
            <View key={item.id} style={styles.item}>
              <Text>Name                     : {filteredCart ? filteredCart.name : 'Name not available'}</Text>
              <Text>Quantity                 : {item.quantity} qty.</Text>
              <Text>Price per one item : {filteredCart ? filteredCart.price  : 'Price not available'} /=</Text>
              <Text>sub total                 : {filteredCart ? filteredCart.price * item.quantity : 'Price not available'} /=</Text>
            </View>
          );
        })}
        <Text style={styles.total}>Total Amount :  LKR. {total} /=</Text>
      </View>
    </Page>
  </Document>
);

const ShoppingCart = () => {
  const [carts, setCarts] = useState([]);  // State to store items in the shopping cart
  const [carts2, setCarts2] = useState([]); // State to store additional items in the shopping cart
  const [total, setTotal] = useState(0);       // State to store the total price of items in the cart
  const [imageUrls, setImageUrls] = useState([]);   // State to store URLs of images related to items in the cart
  const [searchQuery, setSearchQuery] = useState('');    // State to store the search query for filtering items
  const [billVisible, setBillVisible] = useState(false);  // State to control visibility of the billing information

  
  useEffect(() => {      // useEffect hook to fetch cart details and initial cart data when the component mounts
    getCartDetails();    // Function to fetch detailed cart information
    getCart();            // Function to fetch initial cart data
  }, []);

  useEffect(() => {       // useEffect hook to fetch image URLs for items in the cart whenever the 'carts' state changes
    const fetchImageUrls = async () => {       // Function to fetch image URLs asynchronously
      const urls = await Promise.all(carts.map(async (cart) => {    // Use Promise.all to concurrently fetch image URLs for all items in the cart
        try {
          const filteredCart = carts.find(c => c.id === cart.id);     // Find the corresponding cart item in the state
          if (!filteredCart || !filteredCart.imgId) {                // If the cart item or its image ID is missing, return null
            return null;
          }
          const url = await getDownloadURL(ref(storage, `images/${filteredCart.imgId}`));   // Fetch the image URL from Firebase Storage
          return { id: cart.id, url };        // Return an object containing the cart item ID and its image URL
        } catch (error) {
          console.error('Error fetching image URL:', error);    // Log any errors encountered during the fetching process
          return null;
        }
      }));
      setImageUrls(urls.filter(url => url !== null));  // Filter out any null values and update the image URLs state
    };
    fetchImageUrls();   // Call the fetchImageUrls function
  }, [carts]);

  useEffect(() => {       // useEffect hook to calculate the total price of items in the cart for the logged-in user whenever 'carts' or 'carts2' state changes
    let calculatedTotal = 0;   // Variable to store the calculated total
    carts2
      .filter(cart => cart.email === userEmail)   // Filter 'carts2' to include only items associated with the logged-in user's email,
      .forEach(cart => {               // then iterate over each item to calculate the total price
        const filteredCart = carts.find(c => c.id === cart.id);    // Filtering by user's email
        if (filteredCart) {       // If the cart item exists, calculate its contribution to the total
          calculatedTotal += filteredCart.price * cart.quantity;
        }
      });
    
    setTotal(calculatedTotal);  // Set the total price in the state
  }, [carts, carts2]);

  const handleButtonClick = (id, stock, quantity, name, sdes, price) => {  // Function to handle button click event for deleting an item from the cart
    StockUpdate_C({ productId: id, qty: quantity , stk: stock, type: "remove", name: name, sdes: sdes, price: price });  // Call the StockUpdate_C function to update the stock (quantity) of the product
    window.location.reload(); // auto refresh
  };

  const getCartDetails = () => { // Function to fetch cart details from the server periodically
    const FetchDetails = () => {  // Send a GET request to the server to fetch cart details
      Axios.get('http://localhost:3001/api/users')
        .then((response) => {
          setCarts(response.data?.response || []); // Set the fetched cart details to the 'carts' state
        })
        .catch((error) => {
          console.error('Axios Error: ', error);  // Log any errors encountered during the request
        });
    };

    FetchDetails(); // Call FetchDetails function 
    const intervalId = setInterval(FetchDetails, 1000); // Set up an interval to periodically fetch cart details (every  1 second)
    return () => clearInterval(intervalId);  // Cleanup function to clear the interval when the component unmounts
  };

  const deleteCart = (id) => { // Function to delete a cart item by its ID
    Axios.post('http://localhost:3002/api_U/deletecart', { id: id }) // Send a POST request to the server to delete the cart item
      .then((response) => {
        setCarts(prevCarts => prevCarts.filter(cart => cart.id !== id));   // Update the 'carts' state by removing the deleted cart item
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  };

  const getCart = () => {  // Function to fetch cart data from the server
    Axios.get(`http://localhost:3002/api_U/getcart`)  // Send a GET request to the server to fetch cart data
      .then((response) => {
        setCarts2(response.data?.response || []); // Set the fetched cart data to the 'carts2' state
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  };

  const userEmail = sessionStorage.getItem('userEmail');  // Retrieve the user's email from sessionStorage
  const filteredCarts = carts.filter(cart => cart.email === userEmail);   // Filter the 'carts' array to include only items associated with the logged-in user
  const filteredCartItems = carts2.filter(cart => cart.email === userEmail && // Filter the 'carts2' array to include only items associated with the logged-in user and matching the search query
    (carts.find(c => c.id === cart.id)?.name.toLowerCase().includes(searchQuery.toLowerCase())));  // Additional filtering based on search query


    const updateCart = (id, quantity) => {  // Function to update the quantity of a cart item
     
      Axios.post('http://localhost:3002/api_U/updateCart', { id: id, quantity: quantity })  // Send a POST request to the server to update the cart item's quantity
        .then((response) => {
          
          // Update the 'carts2' state by mapping over the previous carts and updating the quantity of the matching cart item
          setCarts2((prevCarts) =>
            prevCarts.map((cart) => (cart.id === id ? { ...cart, quantity: quantity } : cart))
          );
        })
        .catch((error) => {
          console.error('Axios Error: ', error);
        });
    };

    
  const handleIncrement = (id, stock, name, sdes, price) => { // Function to handle incrementing the quantity of a cart item
    const cartItem = filteredCartItems.find((cart) => cart.id === id); // Find the cart item in the filtered cart items array by its ID

    if (cartItem) { // If the cart item exists
      const newQuantity = cartItem.quantity + 1;   // Calculate the new quantity by incrementing the current quantity by 1
      if(stock >= cartItem.quantity -1 ){ // Check if there is enough stock to increment the quantity
        updateCart(id, newQuantity); // Update the cart with the new quantity
        StockUpdate_C({ productId: id, qty: 1, stk: stock, type: "add", name: name, sdes: sdes, price: price }); // Update the stock with the appropriate action
      }
      else{
        alert("Stock is zero. Cannot add to cart.");  // Alert the user if there's not enough stock to add
      }
      
    }
  };

  const handleDecrement = (id, stock, name, sdes, price) => {  // Function to handle decrementing the quantity of a cart item
    const cartItem = filteredCartItems.find((cart) => cart.id === id);
    if (cartItem && cartItem.quantity > 1) {
      const newQuantity = cartItem.quantity - 1;
        updateCart(id, newQuantity);
        StockUpdate_C({ productId: id, qty: 1 , stk: stock, type: "remove", name: name, sdes: sdes, price: price });
    }
  };


  return (
    <div>
      <div>
        <Navi />
      </div>
      <div className='shopping-cart'>
        <h2 className='cart-title'>Shopping Cart</h2>
        <div>
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}   // Update the search query state when the input changes
            className="search-input"
          />
        </div>

        {filteredCartItems.map((cart) => {
          const imageUrlObj = imageUrls.find(urlObj => urlObj.id === cart.id);  // Find the corresponding image URL object for the current cart item
          const imageUrl = imageUrlObj ? imageUrlObj.url : null;  // Extract the image URL from the object, if it exists
          const filteredCart = carts.find(c => c.id === cart.id);  // Find the corresponding cart item from the 'carts' array

          return (  // Render the cart item
            <div className="cart-item" key={cart.id}>
              <div className="item-photo">
                {imageUrl ? (
                  <img src={imageUrl} alt={`Photo-${cart.id}`} />
                ) : (
                  <img src="https://t4.ftcdn.net/jpg/05/07/58/41/360_F_507584110_KNIfe7d3hUAEpraq10J7MCPmtny8EH7A.jpg" alt="Placeholder" />
                )}
              </div>
              <div className="item-details">
                
                <h3 className="item-name">Name : {filteredCart ? filteredCart.name : 'Name not available'}</h3>
                <h3 className="item-price">Quantity : {cart.quantity}</h3>
                <p className="item-price">Price : LKR. {filteredCart ? filteredCart.price * cart.quantity : 'Price not available'}/=</p>
                <div className={`stock-text ${filteredCart.stock === 0 ? 'text-red-500' : ''}`}>
                  <p className="item-price">Remaining stock : {filteredCart.stock === 0 ? 'The stock is over' : filteredCart.stock}</p>
                </div>
              </div>
              <div className="item-actions">
              <button className="action-button" onClick={() => handleDecrement(cart.id, filteredCart.stock, filteredCart.name, filteredCart.sdes, filteredCart.price)}>
                  -
                </button>
                <span className="item-quantity">{cart.quantity}</span>
                <button className="action-button" onClick={() => handleIncrement(cart.id, filteredCart.stock, filteredCart.name, filteredCart.sdes, filteredCart.price)}>
                  +
                </button>
                <button className="action-button delete-button" onClick={() => {deleteCart(cart.id); handleButtonClick(cart.id, filteredCart.stock, cart.quantity, filteredCart.name, filteredCart.sdes, filteredCart.price);}}>Delete</button>
              </div>
            </div>   
          );
        })}
       
        
        <div className="pdf-download-button">
          <PDFDownloadLink document={<BillGenerator items={filteredCartItems} total={total} carts={carts} />} fileName="bill.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Bill')}
          </PDFDownloadLink>
        </div>
       
       
        <div className="total-amount">Total : LKR.{total}</div>

        <div class="pay-now-button-container">
        <a href="/Shippingscreen">
          <button class="pay-now-button">Pay Now</button></a>
        </div>
        <Link to={`/promopage/${total}`}>
          <button className="coupon">Looking for DISCOUNT?</button>
        </Link>
      </div>
      <div>
      <Foot/>
      </div>
    
    </div>

    
  );
};


export default ShoppingCart;

