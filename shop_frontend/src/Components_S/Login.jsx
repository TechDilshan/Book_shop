import React, { useState } from "react";
import Axios from "axios";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import "../css_ss/Login.css";
import ForgotPassword from "./FrogotPasswor";
import { Link } from "react-router-dom";
import Navi from '../Navi';
import Foot from '../footer';

const Login = () =>{

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  Axios.defaults.withCredentials = true;
  
  const handleSubmit = (values) => {
    
    Axios.post('http://localhost:5000/auth/login', { 
    email: values.email, 
    password: values.password,

    }).then(response => {
      if (response.data.status){
        sessionStorage.setItem('userEmail', email);
        console.log(response.data.status)
        console.log(email)
        navigate('/UserHome_C');
        window.location.reload();
      }else{
        message.error("Your password or email is incorrect");
      }
    }).catch(err =>{
      console.log(err)
      message.error("Your email is incorrect");
    })
  }


  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (

       <div>
      <div>
        <Navi/>
      </div>
  
    <div className="loginForm">

      
     
      <Form

        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
      >

        <h3>Login</h3>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please enter your Email!" },
            {
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Please enter a valid email address!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <p className="forget-password" onClick={showModal}>
            Forget Password
          </p>

          <Modal visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <ForgotPassword />
          </Modal>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or{" "}
          <p>
            Don't have an Account?
            <Link to="/registor" className="register-link">
              Sign Up
            </Link>
          </p>


          <p>
            If you are an Employee?
            <Link to="/elogin" className="register-link">
              Employee Login
            </Link>
          </p>
        </Form.Item>
      </Form>
    </div>

      <div>
      <Foot/>
      </div>
    </div>
  );
};
  


export default Login;





// import React, { useState } from "react";
// import Axios from 'axios'
// import {useNavigate} from "react-router-dom"
// import './Username.css';
// import { Link } from 'react-router-dom';
// import Navi from '../Navi';
// import Foot from '../footer';

// const Login = () =>{

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const navigate = useNavigate()

//   Axios.defaults.withCredentials = true;
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     Axios.post('http://localhost:5000/auth/login', { 
//       email, 
//       password, 
//     }).then(response => {
//       if (response.data.status){
//         sessionStorage.setItem('userEmail', email);
//         navigate('/UserHome_C');
//         window.location.reload();
//       }
//     }).catch(err =>{
//       console.log(err)
//     })
//   }

  
//   return (
//     <div>
//       <div>
//         <Navi/>
//       </div>
//     <div className="logincontainer">
//     <div className="login-main-box">

//       <h1>Log In</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="login-input-box">
//           <span className="input-icon"><i className="bx bxs-envelope"></i></span>
//           <input
//              onChange={(e) => setEmail(e.target.value)}
//               type="email"
//             />
//           <label>Email</label>
//         </div>

//         <div className="login-input-box">
//           <span className="input-icon"><i className="bx bxs-lock-alt"></i></span>
//           <input
//               onChange={(e) => setPassword(e.target.value)}
//              type="password"
// />
//           <label>Password</label>
//           </div>


//           <div className="login-ckeck">
//               <label><input type="checkbox" />Remember me</label>
//               <Link to="/forgotPassword">Forget Password</Link>
//             </div>

//         <button type="submit" className="login-btn">Login</button>

//         <div className="login-register">
//           <p>Don't have an Account?<Link to="/registor" className="register-link">Sign Up</Link></p>
//         </div>
//       </form>
//     </div>
//   </div>

//   <div>
//         <Foot/>
//       </div>
//     </div>
//   )
// }

// export default Login;