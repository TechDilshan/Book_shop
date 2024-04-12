import axios from 'axios'
import React, {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'

export const Dashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;

  useEffect(()=> {
    axios.get('http://localhost:5000/auth/verify')
    .then(res=>{
      if(res.data.status){
        setAuthenticated(true);
      }else{
        navigate('/homes')
      }
    })
    .catch((error) => {
      console.error('Error verifying authentication:', error);
      navigate('/login');
    });
}, []);

if (!authenticated) {
  // Render loading spinner or some other indication that authentication is in progress
  return <div>Loading...</div>;
}
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard

