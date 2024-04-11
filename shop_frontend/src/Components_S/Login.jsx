import React, { useState } from "react";
import Axios from 'axios'
import {useNavigate} from "react-router-dom"
import './Username.css';
import { Link } from 'react-router-dom';
import Navi from '../Navi';
import Foot from '../footer';

const Login = () =>{

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  Axios.defaults.withCredentials = true;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:5000/auth/login', { 
      email, 
      password, 
    }).then(response => {
      if (response.data.status){
        sessionStorage.setItem('userEmail', email);
        console.log(response.data.status)
        console.log(email)
        navigate('/UserHome_C');
      }
    }).catch(err =>{
      console.log(err)
    })
  }

  
  return (
    <div>
      <div>
        <Navi/>
      </div>
    <div className="logincontainer">
    <div className="login-main-box">

      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="login-input-box">
          <span className="input-icon"><i className="bx bxs-envelope"></i></span>
          <input
             onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          <label>Email</label>
        </div>

        <div className="login-input-box">
          <span className="input-icon"><i className="bx bxs-lock-alt"></i></span>
          <input
              onChange={(e) => setPassword(e.target.value)}
             type="password"
/>
          <label>Password</label>
          </div>


          <div className="login-ckeck">
              <label><input type="checkbox" />Remember me</label>
              <Link to="/forgotPassword">Forget Password</Link>
            </div>

        <button type="submit" className="login-btn">Login</button>

        <div className="login-register">
          <p>Don't have an Account?<Link to="/registor" className="register-link">Sign Up</Link></p>
        </div>
      </form>
    </div>
  </div>

  <div>
        <Foot/>
      </div>
    </div>
  )
}

export default Login;