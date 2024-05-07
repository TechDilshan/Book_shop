import React, { useState } from "react";
import Axios from "axios";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import "../css_ss/Login.css";
import { Link } from "react-router-dom";

import Navi from '../Navi';
import Foot from '../footer';


const EmpLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  Axios.defaults.withCredentials = true;

  const handleSubmit = (values) => {

    Axios.post('http://localhost:5000/auth/elogin', {
      email: values.email,
      password: values.password,

    }).then(response => {
      if (response.data.status) {
     //   sessionStorage.setItem('email', email);

        sessionStorage.setItem('userEmail', email);
        console.log(response.data.status)
        console.log(email)
        console.log(response.data)
        const eroll = response.data.eroll
        console.log(eroll)

        if (eroll === 'Profile Manager') {
          navigate('/eprofile');
        }

        else if (eroll === 'Product Manager') {
          navigate('/users');
          window.location.reload();
        }
        else if (eroll === 'Order Manager') {
          navigate('/omprofile');
        }
        else if (eroll === 'Financial Manager') {
          navigate('/FM_PO');
          window.location.reload();
        }
        else if (eroll === 'Promotion Manager') {
          navigate('/cmdashboard');
        }
        else if (eroll === 'Feedback Manager') {
          navigate('/framechamu');
        }
        else if (eroll === 'PrintingOrder Manager') {
  
          navigate('/AdminMain_D');
          window.location.reload();
        }
        else {
          navigate('/elogin')
        }
      }

      else {
        message.error("Your password is incorrect");
      }
    }).catch(err => {
      console.log(err)
    })
  }



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

        <h3 className="namel">Employee Login</h3>
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>

      </Form>
    </div>
    <br/>
    <div>
      <Foot/>
      </div>
    </div>
  );
};



export default EmpLogin;