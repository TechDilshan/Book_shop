import React, { useState } from "react";
import Axios from 'axios'
import {useNavigate} from "react-router-dom"
import { Link, useParams } from 'react-router-dom';

function RestPassword(){

 
  const [password, setPassword] = useState('');
  const {token} = useParams()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    Axios.post('http://localhost:5000/auth/reset-password'+token, { 
    password,
    }).then(response => {
      if (response.data.status){
        navigate('/login')
      }
      console.log(response.data)
    }).catch(err =>{
      console.log(err)
    })
  }


  
  return (
    <div className="logincontainer">
      <h2>reset password</h2>

      <form className="signupform" onSubmit={handleSubmit}>

        <label htmlFor="password"> New Password </label>
        <input type="password" placeholder="*********"
          onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'> Reset</button>

    <p>have a account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  )
}

export default RestPassword