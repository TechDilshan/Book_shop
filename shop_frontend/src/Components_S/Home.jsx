import React from "react";
import {Link, Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Home(){
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;

const handleLogout =()=>{
  axios.get('http://localhost:5000/auth/logout')
  .then(res => {
    if(res.data.status){
      sessionStorage.removeItem('userEmail');
      navigate('/login')
    }
  }).catch(err => {
    console.log(err)
  })
}
 
const userEmail = sessionStorage.getItem('userEmail');

  return (
    <div>
      <p>Email: {userEmail}</p>
    <button><Link to="/verify">Dashboard</Link></button>
    <br/>
    <button onClick={handleLogout}>logout</button>

    </div>
  )
}

export default Home