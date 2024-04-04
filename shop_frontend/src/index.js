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

import PrintDocCreate_D from './PrintDocCreate_D';
import PrintingOrderMain_D from './PrintingOrderMain_D';
import AdminPriceChartCreate_D from './AdminPriceChartCreate_D';
import AdminMain_D from './AdminMain_D';
import PriceChartDisplay_D from './PriceChartDisplay_D';
import PrintOrderMain_D from './PrintOrderMain_D';
import CouponView from './component_DSP/CouponView';

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

        <Route path='/PrintDocCreate_D' element={<PrintDocCreate_D />} />
        <Route path='/PrintingOrderMain_D' element={<PrintingOrderMain_D />} />
        <Route path='/AdminPriceChartCreate_D' element={<AdminPriceChartCreate_D />} />
        <Route path='/AdminMain_D' element={<AdminMain_D />} />
        <Route path='/PriceChartDisplay_D' element={<PriceChartDisplay_D />} />
        <Route path='/PrintOrderMain_D' element={<PrintOrderMain_D />} />
        <Route  path='/couponview' element={<CouponView />}/>
        CouponView



  
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
