import React, { useState } from "react";
import Axios from "axios";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../css_ss/Register.css";

 import Navi from '../Navi';
 import Foot from '../footer';

const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (values) => {
    
    Axios.post("http://localhost:5000/auth/registor", { 
      username: values.username,
      email: values.email,
      number:values.number,
      address:values.address,
      password:values.password, 
    }).then(response => {
      if (response.data.status){
        navigate('/login')
      }
      else{
        message.error("Email is already exists");
      }
    }).catch(err =>{
      console.log(err)
    })
  }


  const validatePassword = (_, value) => {
    if (value && value !== password) {
      return Promise.reject(new Error("Please Match your Password"));
    }
    return Promise.resolve();
  };


  return (


       <div>
       <div>
        <Navi/>
      </div>
    <div className="Registercontainer">
      <div className="register-main-box">
        <h2 className="ren">Sign Up!</h2>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="User Name"
            name="username"
            rules={[
              { required: true, message: "Please enter your User name!" },
            ]}
          >
            <Input
              name="username"
              size="large"
              placeholder={"User Name"}
              className="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Email"
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
              className="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="number"
            className="number"
            rules={[
              { required: true, message: "Please enter your phone number!" },
              {
                pattern: /^(0)[0-9]{9}$/,
                message: "Please enter a valid phone number!",
              },
            ]}
          >
            <Input
              name="number"
              className="number"
              placeholder="Phone Number"
              onChange={(e) => setNumber(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            className={address ? "input-item input-item-active" : "input-item"}
            rules={[{ required: true, message: "Please enter your Address!" }]}
          >
            <Input
              name="address"
              size="large"
              placeholder="Address"
              className="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Item>

          <div className="form-row">
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please provide a password!" },
                {
                  min: 8,
                  max: 15,
                  message: "Password must be at least 8 characters long!",
                },
              ]}
            >
              <Input.Password
                name="password"
                size="large"
                placeholder={"Password"}
                className="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                { validator: validatePassword },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Item>
          </div>

          <Button classNames = "sub123" type="primary" htmlType="submit" className="submit">
            Register
          </Button>

          <div className="login-register">
            <p>
              Already have an Account?
              <Link to="/login" className="log-link">
                Log In
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
    <br/>
         <div>
       <Foot/>
      </div>
 </div>
  );
};
  

export default Register







