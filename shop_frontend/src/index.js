import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShoppingCart from './ShoppingCart'
import Users from './component_Dila/Users';
import AdminDisplay from './component_Dila/AdminDisplay';
import UserHome_C from './component_Dila/UserHome_C';
import ProductDetails_C from './component_Dila/ProductDetails_C';


import PromoPage from './component_DSP/PromoPage'
import CouponManage from './component_DSP/CouponManage'
import Dashboard from './component_DSP/PromoDashboard'
import UpdateCoupon from './component_DSP/UpdateCoupon'

import FeedbackDisplay from './components_chamu/FeedbackDisplay'
import AdminFeedbackPage from './components_chamu/AdminFeedbackPage'
import FeedbackUpdate from './components_chamu/FeedbackUpdate';

import PrintingOrderDisplayAdmin_D from './components_D/PrintingOrderDisplayAdmin_D';
import PrintDocCreate_D from './components_D/PrintDocCreate_D';
import PrintingOrderMain_D from './components_D/PrintingOrderMain_D';
import AdminPriceChartCreate_D from './components_D/AdminPriceChartCreate_D';
import AdminMain_D from './components_D/AdminMain_D';
import PriceChartDisplay_D from './components_D/PriceChartDisplay_D';
import PrintOrderMain_D from './components_D/PrintOrderMain_D';

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

        {/*  Routes Reviews Management - Chamu */}
        <Route path='/feedbackpage' element={<FeedbackDisplay />} />
        <Route path='/feedbackadmin' element={<AdminFeedbackPage />} />
        <Route path='/feedbackupdate/:UID' element={<FeedbackUpdate />} />

        
        <Route path='/PrintDocCreate_D' element={<PrintDocCreate_D />} />
        <Route path='/PrintingOrderMain_D' element={<PrintingOrderMain_D />} />
        <Route path='/AdminPriceChartCreate_D' element={<AdminPriceChartCreate_D />} />
        <Route path='/AdminMain_D' element={<AdminMain_D />} />
        <Route path='/PriceChartDisplay_D' element={<PriceChartDisplay_D />} />
        <Route path='/PrintingOrderDisplayAdmin_D' element={<PrintingOrderDisplayAdmin_D />} />
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
