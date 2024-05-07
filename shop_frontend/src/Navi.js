import React, { useState, useEffect } from 'react';
import './CSS_C/navi.css';
import logo from './image/logo.jpg';
import { useNavigate} from 'react-router-dom'
import axios from 'axios'

const NaviBar = () => {

  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const email = sessionStorage.getItem('userEmail');
    setUserEmail(email);
  }, []);

  const handleLogout =()=>{
    axios.get('http://localhost:5000/auth/logout')
    .then(res => {
      if(res.data.status){
        sessionStorage.removeItem('userEmail');
<<<<<<< Updated upstream
        //window.location.reload();
=======
       // window.location.reload();
>>>>>>> Stashed changes
        navigate('/')
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="menu-body">
  <nav>
    <ul className='nav-bar'>
      <li className='logo'><a href='/'><img src={logo} alt="Logo"/></a></li>
      <input type='checkbox' id='check' />
      <span className="menu">
        <li><a href="/UserHome_C" className="phone-logo"><img src={logo} alt="Logo"/></a></li>
        <li><a href="/UserHome_C">Home</a></li>
        <li><a href="">About Us</a></li>
        <li><a href="/PrintingOrderMain_D">Printing</a></li>
        <li><a href="/couponview">Coupons</a></li>

        {userEmail && (
            <li><a href="/shopping-cart"> Cart <i className="fa-solid fa-cart-shopping"></i></a></li>
          )}

{userEmail && (
            <li><a href="/PurchaseOrder"> Purchase Order</a></li>
          )}
      </span>
      <label htmlFor="check" className="open-menu"><i className="fas fa-bars"></i></label>
      <div className="user-links">
        {!userEmail && (
          <>
            <li><a href="/login">Login</a></li>
            <li><a href="/registor">Sign Up</a></li>
          </>
        )}
        {userEmail && (
          <>
            <li><a href="/profile">My Account <i className="fas fa-user"></i></a></li>
            <label htmlFor="check" className="close-menu"><i className="fas fa-times"></i></label>
            <li><a href="#" onClick={handleLogout}>Logout</a></li>
          </>
        )}
      </div>
    </ul>
  </nav>
</div>

  );
};

export default NaviBar;
