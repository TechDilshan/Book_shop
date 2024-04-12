import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const saveSession = () => {
    // Save the email to sessionStorage
    sessionStorage.setItem('userEmail', email);
    // You can add more session data here if needed
    console.log("Session saved. Email:", email);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Test App</h1>
        
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={handleEmailChange} 
          style={{ color: 'black' }}
        />
        <button className='Admin-button' onClick={() => { navigate('/UserHome_C'); saveSession(); }}>Customers</button>
        <button className='user-button' onClick={() => { navigate('/users'); }}>Product Manager "Dilshan"</button>
        <button className='Admin-button' onClick={() => { navigate('/cmdashboard'); saveSession(); }}>Promotion Manager "Dilina"</button>
        <button className='Admin-button' onClick={() => { navigate('/AdminMain_D'); saveSession(); }}>Printing Manager "Sayumi"</button>
        <button className='Admin-button' onClick={() => { navigate('/feedbackadmin'); saveSession(); }}>Admin "Chamu"</button>
        <button className='Admin-button' onClick={() => { navigate('/'); saveSession(); }}>Order Manager "Andrew"</button>
        <button className='Admin-button' onClick={() => { navigate('/'); saveSession(); }}>Financial Manager "Abishan"</button>
        <button className='Admin-button' onClick={() => { navigate('/'); saveSession(); }}>User Profile Manager "Sathushan"</button>
        
      </header>
    </div>
  );
}

export default App;
