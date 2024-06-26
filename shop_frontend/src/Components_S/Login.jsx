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

        <h3 className="namel">LOGIN</h3>
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


          <p>
          <br />
            Don't have an Account? &nbsp; &nbsp; &nbsp; &nbsp;  
            <Link to="/registor" className="register-link">
              Sign Up
            </Link>
          </p>
<br />

          <p>
            If you are an Employee? &nbsp; &nbsp; &nbsp; &nbsp; 
            <Link to="/elogin" className="register-link">
              Employee Login
            </Link>
          </p>
        </Form.Item>
      </Form>
    </div>

      <div>
        <br/>
      <Foot/>
      </div>
    </div>
  );
};
  


export default Login;


