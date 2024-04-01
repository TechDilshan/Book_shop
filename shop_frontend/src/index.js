import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShoppingCart from './ShoppingCart'
import Users from './Users';
import AdminDisplay from './AdminDisplay';
import UserHome_C from './UserHome_C';
import ProductDetails_C from './ProductDetails_C';


import PromoPage from './component_DSP/PromoPage'
import CouponManage from './component_DSP/CouponManage'
import Dashboard from './component_DSP/PromoDashboard'
import UpdateCoupon from './component_DSP/UpdateCoupon'


// Add the FontAwesome CDN link dynamically
const fontAwesomeLink = document.createElement('link');
fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
fontAwesomeLink.rel = 'stylesheet';
document.head.appendChild(fontAwesomeLink);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path='/' element={<App />} />
        <Route path='/ShoppingCart' element={<ShoppingCart />} />
        <Route path='/users' element={<Users />} />
        <Route path='/AdminDisplay' element={<AdminDisplay />} />
        <Route path='/UserHome_C' element={<UserHome_C />} />
        <Route path='/ProductDetails_C' element={<ProductDetails_C />} />
        <Route path='/shopping-cart' element={<ShoppingCart />} />

        {/*  Routes Promotion Management - DILINA */}
        <Route path='/promopage' element={<PromoPage />} />
        <Route path='/couponpage' element={<CouponManage />} />
        <Route path='/cmdashboard' element={<Dashboard />} />
        <Route  path='/update/:UID' element={<UpdateCoupon />}/>




  
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
