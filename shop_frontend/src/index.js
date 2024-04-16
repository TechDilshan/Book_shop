import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShoppingCart from './ShoppingCart'
import Users from './component_Dila/Users';
import AdminDisplay from './component_Dila/AdminDisplay';
import UserHome from './component_Dila/UserHome_C';
import ProductDetails from './component_Dila/ProductDetails_C';


import PromoPage from './component_DSP/PromoPage'
import PromoPageTest from './component_DSP/PromoPageTest'
import CouponManage from './component_DSP/CouponManage'
import Dashboard from './component_DSP/PromoDashboard'
import UpdateCoupon from './component_DSP/UpdateCoupon'

import FeedbackDisplay from './components_chamu/FeedbackDisplay'
import AdminFeedbackPage from './components_chamu/AdminFeedbackPage'
import FeedbackUpdate from './components_chamu/FeedbackUpdate';

import PrintingOrderDisplayAdmin from './components_D/PrintingOrderDisplayAdmin_D';
import PrintDocCreate from './components_D/PrintDocCreate_D';
import PrintingOrderMain from './components_D/PrintingOrderMain_D';
import AdminPriceChartCreate from './components_D/AdminPriceChartCreate_D';
import AdminMain from './components_D/AdminMain_D';
import PriceChartDisplay from './components_D/PriceChartDisplay_D';
import PrintOrderMain from './components_D/PrintOrderMain_D';

import CouponView from './component_DSP/CouponView';
import ViewReport from './component_DSP/ViewReport';



import Register from './Components_S/Register';
import Login from './Components_S/Login';
import Home from './Components_S/Home';
import FrogotPasswor from './Components_S/FrogotPasswor';
import ResetPassword from './Components_S/ResetPassword';
import Dashboard_S from './Components_S/Dashboard';
import EmpRegister from './Components_S/EmpRegister';
import EmpLogin from './Components_S/EmpLogin'
import Profile from './Components_S/Profile'

import EmpProfile from './Components_S/EmpProfile'

import ProductMProfile from './Components_S/ProductMProfile'
import FinancialMProfile from './Components_S/FinancialMProfile'
import PrintingOMProfile from './Components_S/PrintingOMProfile'
import OrderMProfile from './Components_S/OrderMProfile'
import PromotionMProfile from './Components_S/PromotionMProfile'
import FeedbackMProfile from './Components_S/FeedbackMProfile'

import EmDetails from './Components_S/EmDetails'
import CustomerDetails from './Components_S/CustomerDetails'
import EmployeePaySheet from './Components_S/EmployeePaySheet'


import Shippingscreen_Drew from './component_Andrew/Shippingscreen';
import PaymentScreen from './component_Andrew/paymentScreen';
import PlaceOrder from './component_Andrew/placeOrder';
import ViewPayments from './component_Andrew/AllPayments';
import ViewShipping from './component_Andrew/AllShipping';


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
        <Route path='/UserHome_C' element={<UserHome />} />
        <Route path='/ProductDetails_C' element={<ProductDetails />} />
        <Route path='/shopping-cart' element={<ShoppingCart />} />

        {/*  Routes Promotion Management - DILINA */}
       <Route path='/promopagetest' element={<PromoPageTest />} />
        <Route path='/promopage/:tot' element={<PromoPage />} />
        <Route path='/couponpage' element={<CouponManage />} />
        <Route path='/cmdashboard' element={<Dashboard />} />
        <Route path='/viwerepo' element={<ViewReport />} />
        <Route  path='/update/:UID' element={<UpdateCoupon />}/>
        

        {/*  Routes Reviews Management - Chamu */}
        <Route path='/feedbackpage' element={<FeedbackDisplay />} />
        <Route path='/feedbackadmin' element={<AdminFeedbackPage />} />
        <Route path='/feedbackupdate/:UID' element={<FeedbackUpdate />} />


        
        <Route path='/PrintDocCreate_D' element={<PrintDocCreate />} />
        <Route path='/PrintingOrderMain_D' element={<PrintingOrderMain />} />
        <Route path='/AdminPriceChartCreate_D' element={<AdminPriceChartCreate />} />
        <Route path='/AdminMain_D' element={<AdminMain />} />
        <Route path='/PriceChartDisplay_D' element={<PriceChartDisplay />} />
        <Route path='/PrintingOrderDisplayAdmin_D' element={<PrintingOrderDisplayAdmin />} />
        <Route path='/PrintOrderMain_D' element={<PrintOrderMain />} />
        <Route  path='/couponview' element={<CouponView />}/>



       {/*  Routes User Profile Management - Sathu */}

        <Route path="/registor" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/homes" element={<Home/>} />
        <Route path="/forgotPassword" element={<FrogotPasswor/>} />
        <Route path="/resetPassword/:token" element={<ResetPassword/>} />
        <Route path="/eregistor" element={<EmpRegister/>} />
        <Route path="/dashboard" element={<Dashboard_S/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/elogin" element={<EmpLogin/>} />
        <Route path="/eprofile" element={<EmpProfile/>} />
                <Route path="/pmprofile" element={<ProductMProfile/>} />
                <Route path="/fmprofile" element={<FinancialMProfile/>} />
                <Route path="/prmprofile" element={<PrintingOMProfile/>} />
                <Route path="/omprofile" element={<OrderMProfile/>} />
                <Route path="/promomprofile" element={<PromotionMProfile/>} />
                <Route path="/feedprofile" element={<FeedbackMProfile/>} />
                <Route path="/emdetails" element={<EmDetails/>} />
                <Route path="/cusdetails" element={<CustomerDetails/>} />
                <Route path="/empaysheet" element={<EmployeePaySheet/>} />
                

{/* Andrew */}
        <Route path='/Shippingscreen'  element={<Shippingscreen_Drew /> } />
        <Route path='/payment'  element={<PaymentScreen/> } />
        <Route path='/place'  element={<PlaceOrder/> } />
        <Route path='/viewpayment'  element={<ViewPayments/> } />
        <Route path='/viewshipping'  element={<ViewShipping/> } />





    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
