import React, { useState } from "react";
import Axios from 'axios'
import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {

  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [nic, setNIC] = useState('');
  const [eroll, setEroll] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/auth/eregistor", { 
        username,
        fullname,
        email,
        nic,
        eroll,
        number,
        address,
        password,
    }).then(response => {
      if (response.data.status){
        navigate('/login')
      }
    }).catch(err =>{
      console.log(err)
    })
  }


  
  return(
    <div className="logincontainer">
    <div className="login-main-box">
      <h1>Register</h1>


      <form onSubmit={handleSubmit}>

        <div className="login-input-box">
          <span className="input-icon"><i className="bx bxs-envelope"></i></span>
          <input name="username" type="text"  
          onChange={(e) => setUsername(e.target.value)}
          />
          <label>User Name</label>
        </div>


        <div className="login-input-box">
          <span className="input-icon"><i className="bx bxs-envelope"></i></span>
          <input name="fullname" type="text"  
          onChange={(e) => setFullname(e.target.value)}
          />
          <label>Full Name</label>
        </div>


        <div className="login-input-box">
          <span className="input-icon"><i className="bx bxs-envelope"></i></span>
          <input name="email" type="text"  
                  onChange={(e) => setEmail(e.target.value)}
                      />
          <label>Email</label>
        </div>


        <div className="login-input-box">
          <span className="input-icon"><i className="bx bxs-envelope"></i></span>
          <input name="nic" type="text"  
                  onChange={(e) => setNIC(e.target.value)}
                      />
          <label>NIC Number</label>
        </div>

        
        <div className="login-input-box">
          <span className="input-icon"><i className="bx bxs-envelope"></i></span>
          <input name="eroll" type="text"  
                  onChange={(e) => setEroll(e.target.value)}
                      />
          <label>Employee Roll</label>
        </div>

        <div className="login-input-box">
          <span className="input-icon"><i className="bx bxs-envelope"></i></span>
          <input name="number" type="text" 
          onChange={(e) => setNumber(e.target.value)}
   
                    />
          <label>Phone Number</label>
        </div>

        <div className="login-input-box">
          <span className="input-icon"><i className="bx bxs-envelope"></i></span>
          <input name="address" type="text"
          onChange={(e) => setAddress(e.target.value)}
          />
          <label>Address</label>
        </div>

        <div className="login-input-box">
          <span className="input-icon"><i className="bx bxs-lock-alt"></i></span>
          <input name="password" type="password" 
          onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>

        
        <button type="submit" className="login-btn">Register</button>

        <div className="login-register">
          <p>Already have an Account?<Link to="/login" className="log-link">Log In</Link></p>
        </div>
      </form>
    </div>
  </div>

)
  
}

export default Register