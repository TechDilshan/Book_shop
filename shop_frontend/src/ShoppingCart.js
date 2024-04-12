import React, { useEffect, useState } from 'react';
import Navi from './Navi';
import Axios from 'axios';
import './CSS_C/ProductHomeCSS_C.css';
import { Link } from 'react-router-dom'; 
import './index.css';
import './CSS_C/ShoppingCart.css';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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
  const [carts, setCarts] = useState([]);
  const [carts2, setCarts2] = useState([]);
  const [total, setTotal] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [billVisible, setBillVisible] = useState(false);

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
            return null;
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
  const filteredCartItems = carts2.filter(cart => cart.email === userEmail && 
    (carts.find(c => c.id === cart.id)?.name.toLowerCase().includes(searchQuery.toLowerCase())));

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
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="search-input"
          />
        </div>

        {filteredCartItems.map((cart) => {
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
                
                <h3 className="item-name">Name : {filteredCart ? filteredCart.name : 'Name not available'}</h3>
                <h3 className="item-price">Quantity : {cart.quantity}</h3>
                <p className="item-price">Price : LKR. {filteredCart ? filteredCart.price * cart.quantity : 'Price not available'}/=</p>
              </div>
              <div className="item-actions">
                <button className="action-button">-</button>
                <span className="item-quantity">{cart.quantity}</span>
                <button className="action-button">+</button>
                <button class="update">UPDATE</button>
                <button className="action-button delete-button" onClick={() => {deleteCart(cart.id); handleButtonClick();}}>Delete</button>
              </div>
            </div>   
          );
        })}
        <div>
           
           </div>
        
        <div className="pdf-download-button">
          <PDFDownloadLink document={<BillGenerator items={filteredCartItems} total={total} carts={carts} />} fileName="bill.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Bill')}
          </PDFDownloadLink>
        </div>
       
       
        <div className="total-amount">Total : LKR.{total}</div>

        <div class="pay-now-button-container">
          <button class="pay-now-button">Pay Now</button>
        </div>
        <button class="coupon">Looking for DISCOUNT?</button>
      </div>
      
    </div>
  );
};


export default ShoppingCart;

