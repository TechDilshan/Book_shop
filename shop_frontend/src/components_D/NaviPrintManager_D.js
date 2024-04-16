import React from 'react';
import '../CSS_C/navi.css';
import logo from '../image/logo.jpg';

const NaviBar = () => {

  return (
    <div class="menu-body">
      <nav>
      <ul class='nav-bar'>
          <li class='logo'><a href='/UserHome_C'><img src={logo}/></a></li>
          <input type='checkbox' id='check' />
          <span class="menu">
              <li><a href="/UserHome_C" class="phone-logo"><img src={logo} alt='company logo'/></a></li>
              <li><a href="/AdminMain_D">Home</a></li>
              <li><a href="/PrintingOrderDisplayAdmin_D">All Printing Orders</a></li>
              <li><a href="/PriceChartDisplay_D">Price Chart</a></li>
              <li><a href="/prmprofile">My Account <i className="fas fa-user"></i></a></li>
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
