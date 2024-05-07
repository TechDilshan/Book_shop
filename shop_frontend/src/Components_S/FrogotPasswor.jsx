import React, { useState } from "react";
import Axios from 'axios'
import {Link, useNavigate} from "react-router-dom"


function FrogotPasswor(){

  const [email, setEmail] = useState('');

  const navigate = useNavigate()

  const handleSubmit = (values) => {
    values.preventDefault()
    Axios.post('http://localhost:5000/auth/forgot-password', { 
      email: values.email, 
      email,
    }).then(response => {
      if (response.data.status){
        alert("check you email for reset password link")
        navigate('/login')
      }

    }).catch(err =>{
      console.log(err)
    })
  }


  
  return (
    <div className="logincontainer">
      <h2>forgotPassword</h2>
      <form className="signupform" onSubmit={handleSubmit}>
   
        <label htmlFor="email"> Email </label>
        <input type="email" placeholder="email"
          onChange={(e) => setEmail(e.target.value)} />


        <button type='submit'> send</button>
      </form>
    </div>
  )
}

export default FrogotPasswor