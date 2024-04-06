import React, { useState } from 'react';
import './CSS_C/navi.css';
import logo from './image/logo.jpg';

const NaviBar = () => {


  return (
    // <nav className="bg-gray-800 text-white p-4 flex justify-between items-center mb-4">
    //   <div className="flex items-center ml-10 ">
    //     <a href="/UserHome_C" className="mr-10 hover:text-gray-300">Home</a>
    //     <a href="#" className="mr-10 hover:text-gray-300">About Us</a>
    //     <a href="/PrintingOrderMain_D" className="mr-10 hover:text-gray-300">Printing</a>
    //     <a href="/couponview" className="mr-10 hover:text-gray-300">Coupons</a>
    //   </div>
     


    //   <div className="flex items-center mr-10 ">
    //     <a href="/shopping-cart" className="mr-10 hover:text-gray-300"><i className="fa-solid fa-cart-shopping"></i></a>
    //     <a href="#" className="mr-10 hover:text-gray-300">My Account <i className="fas fa-user"></i></a>
    //     <a href="/" className="hover:text-gray-300">Logout</a>
    //   </div>
    // </nav>

    <div class="menu-body">
      <nav>
      <ul class='nav-bar'>
          <li class='logo'><a href='/UserHome_C'><img src={logo}/></a></li>
          <input type='checkbox' id='check' />
          <span class="menu">
              <li><a href="/UserHome_C" class="phone-logo"><img src={logo}/></a></li>
              <li><a href="/UserHome_C">Home</a></li>
              <li><a href="">About Us</a></li>
              <li><a href="/PrintingOrderMain_D">Printing</a></li>
              <li><a href="/couponview">Coupons</a></li>
              <li><a href="/shopping-cart"> Cart <i className="fa-solid fa-cart-shopping"></i></a></li>
              <li><a href="#">My Account <i className="fas fa-user"></i></a></li>
              <label for="check" class="close-menu"><i class="fas fa-times"></i></label>
              <li><a href="/">Logout</a></li>
          </span>
          <label for="check" class="open-menu"><i class="fas fa-bars"></i></label>
      </ul>
      </nav>
    </div>

  );
};

export default NaviBar;
