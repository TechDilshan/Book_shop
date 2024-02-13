import React, { useState } from 'react';
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Throwback Hip Bag',
      description: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
      price: 90.00,
      quantity: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
      imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
      id: 2,
      name: 'Medium Stuff Satchel',
      description: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
      price: 32.00,
      quantity: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
      imageAlt: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    {
      id: 5,
      name: 'Medi',
      description: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
      price: 3.00,
      quantity: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
      imageAlt: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    {
      id: 3,
      name: ' Satchel',
      description: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
      price: 2.00,
      quantity: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
      imageAlt: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    {
      id: 4,
      name: 'uff ',
      description: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
      price: 42.00,
      quantity: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
      imageAlt: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const increaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const removeProduct = (productId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  const filteredCartItems = cartItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // PDF Document
  const CartPDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
            <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
            <Text style={styles.subtotal}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );

  return (
    <center>
    <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
      </div>
      <input
        type="text"
        placeholder="Search in Cart"
        className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredCartItems.map((product) => (
        <div key={product.id} className="flex items-center mb-4">
          <img src={product.imageSrc} alt={product.imageAlt} className="w-16 h-16 rounded-md mr-4" />
          <div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{product.description}</p>
            <p className="text-gray-600 font-semibold">${(product.price * product.quantity).toFixed(2)}</p>
          </div>
          <div className="ml-auto flex items-center">
            <button className="text-gray-400 focus:outline-none focus:text-gray-600" onClick={() => decreaseQuantity(product.id)}>-</button>
            <span className="mx-2">{product.quantity}</span>
            <button className="text-gray-400 focus:outline-none focus:text-gray-600" onClick={() => increaseQuantity(product.id)}>+</button>
            <button className="ml-4 text-red-500 focus:outline-none focus:text-red-600" onClick={() => removeProduct(product.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="mt-6">
        <p className="text-gray-700 font-semibold">Subtotal: ${cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0).toFixed(2)}</p>
        <PDFDownloadLink document={<CartPDF />} fileName="cart.pdf">
          {({ loading }) => (
            loading ? 'Loading...' :
            <button className="mt-2 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md focus:outline-none focus:bg-blue-600 hover:bg-blue-600">
              Print Cart
            </button>
          )}
        </PDFDownloadLink>
        <button className="mt-2 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md focus:outline-none focus:bg-indigo-700 hover:bg-indigo-700">Checkout</button>
        <button className="mt-2 w-full py-2 px-4 border border-gray-300 font-semibold rounded-md text-gray-700 focus:outline-none focus:border-gray-500 hover:border-gray-500">Continue Shopping</button>
      </div>
    </div>
    </center>
  );
};

const styles = StyleSheet.create({
    page: {
      backgroundColor: '#f9f9f9', // Light gray background
      padding: 20, // Slightly reduced padding for a cleaner look
      borderRadius: 10, // Rounded corners
      shadowColor: '#000', // Shadow for depth
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    item: {
      marginBottom: 8, // Tailwind equivalent: mb-2
      borderBottomWidth: 1,
      borderBottomColor: '#ddd', // Lighter border color
      paddingBottom: 8, // Reduced padding for items
    },
    name: {
      fontSize: 18, // Larger font size for name
      fontWeight: 'bold',
      color: '#333', // Darker text color
    },
    description: {
      fontSize: 14,
      marginBottom: 6, // Increased margin bottom for description
      color: '#777', // Slightly lighter text color
    },
    price: {
      fontSize: 16, // Larger font size for price
      color: '#007bff', // Blue color for price
      marginTop: 2, // Increased margin top for price
    },
    quantity: {
      fontSize: 16, // Larger font size for quantity
      color: '#555', // Slightly darker text color for quantity
    },
    subtotal: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#28a745', // Green color for subtotal
      marginTop: 6, // Increased margin top for subtotal
    },
  });
  
  
export default Cart;
