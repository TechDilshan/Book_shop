import React, { useState } from "react";
import Axios from 'axios'
import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form, Input,Select,message } from "antd";
import '../css_ss/Register.css';



const { Option } = Select;

const EmpRegister = () => {

  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [nic, setNIC] = useState('');
  const [eroll, setEroll] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (values) => {

    Axios.post("http://localhost:5000/auth/eregistor", { 
        username: values.username ,
        fullname: values.fullname ,
        email: values.email ,
        nic: values.nic ,
        eroll: values.eroll ,
        number: values.number ,
        address: values.address ,
        password: values.password ,
    }).then(response => {
      if (response.data.status){
        navigate('/eprofile')
      }
      else{   message.error("Employee email is already exists");}

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
  
  const Header = () => {
    return (
      <div className="header">
        <div className="Pro-header-component"><Link to = '/eregistor'>Employee Register </Link></div>
        <div className="Pro-header-component"><Link to = '/emdetails'>Employee Details </Link></div>
        <div className="Pro-header-component"><Link to = '/cusdetails'>Customer Details </Link></div>
        <div className="Pro-header-component"><Link to = '/eprofile'>Profile </Link></div>
      </div>
    );
  }
  
  return (

    <div> <Header/>{Header}
    <br/>
    <div className="Registercontainer">

      <div className="register-main-box">
        <h2>Employee Sign Up!</h2>

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
            label="Full Name"
            name="fullname"
            rules={[
              { required: true, message: "Please enter your Full Name!" },
            ]}
          >
            <Input
              name="fullname"
              size="large"
              placeholder={"Full Name"}
              className="fullname"
              onChange={(e) => setFullname(e.target.value)}
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
            label="Employee Roll"
            name="eroll"
            rules={[
              { required: true, message: "Please select your Employee Roll!" },
            ]}
          >
            <Select
              placeholder="Select Employee Roll"
              onChange={(value) => setEroll(value)}
            >
              <Option value="Profile Manager">Profile Manager</Option>
              <Option value="Product Manager">Product Manager</Option>
              <Option value="Order Manager">Order Manager</Option>
              <Option value="Financial Manager">Financial Manager</Option>
              <Option value="Promotion Manager">Promotion Manager</Option>
              <Option value="Feedback Manager">Feedback Manager</Option>
              <Option value="PrintingOrder Manager">PrintingOrder Manager</Option>
            </Select>
          </Form.Item>


          
          <Form.Item
            label="NIC"
            name="nic"
            className="nic"
            rules={[
              { required: true, message: "Please enter your NIC number!" },

            ]}
          >
            <Input
              name="nic"
              className="nic"
              placeholder="NIC"
              onChange={(e) => setNIC(e.target.value)}
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

          <Button type="primary" htmlType="submit" className="submit">
            Register
          </Button>

          <div className="login-register">
          </div>
        </Form>
      </div>
    </div>
    </div>
  );}

export default EmpRegister

// import React, { useState } from "react";
// import Axios from 'axios'
// import {useNavigate} from "react-router-dom"
// import { Link } from 'react-router-dom';
// // import './Register.css';

// const Register = () => {

//   const [username, setUsername] = useState('');
//   const [fullname, setFullname] = useState('');
//   const [email, setEmail] = useState('');
//   const [nic, setNIC] = useState('');
//   const [eroll, setEroll] = useState('');
//   const [number, setNumber] = useState('');
//   const [address, setAddress] = useState('');
//   const [password, setPassword] = useState('');

//   const navigate = useNavigate()

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     Axios.post("http://localhost:5000/auth/eregistor", { 
//         username,
//         fullname,
//         email,
//         nic,
//         eroll,
//         number,
//         address,
//         password,
//     }).then(response => {
//       if (response.data.status){
//         navigate('/login')
//       }
//     }).catch(err =>{
//       console.log(err)
//     })
//   }


  
//   return(
//     <div className="logincontainer">
//     <div className="login-main-box">
//       <h1>Register</h1>


//       <form onSubmit={handleSubmit}>

//         <div className="login-input-box">
//           <span className="input-icon"><i className="bx bxs-envelope"></i></span>
//           <input name="username" type="text"  
//           onChange={(e) => setUsername(e.target.value)}
//           />
//           <label>User Name</label>
//         </div>


//         <div className="login-input-box">
//           <span className="input-icon"><i className="bx bxs-envelope"></i></span>
//           <input name="fullname" type="text"  
//           onChange={(e) => setFullname(e.target.value)}
//           />
//           <label>Full Name</label>
//         </div>


//         <div className="login-input-box">
//           <span className="input-icon"><i className="bx bxs-envelope"></i></span>
//           <input name="email" type="text"  
//                   onChange={(e) => setEmail(e.target.value)}
//                       />
//           <label>Email</label>
//         </div>


//         <div className="login-input-box">
//           <span className="input-icon"><i className="bx bxs-envelope"></i></span>
//           <input name="nic" type="text"  
//                   onChange={(e) => setNIC(e.target.value)}
//                       />
//           <label>NIC Number</label>
//         </div>

        
//         <div className="login-input-box">
//           <span className="input-icon"><i className="bx bxs-envelope"></i></span>
//           <input name="eroll" type="text"  
//                   onChange={(e) => setEroll(e.target.value)}
//                       />
//           <label>Employee Roll</label>
//         </div>

//         <div className="login-input-box">
//           <span className="input-icon"><i className="bx bxs-envelope"></i></span>
//           <input name="number" type="text" 
//           onChange={(e) => setNumber(e.target.value)}
   
//                     />
//           <label>Phone Number</label>
//         </div>

//         <div className="login-input-box">
//           <span className="input-icon"><i className="bx bxs-envelope"></i></span>
//           <input name="address" type="text"
//           onChange={(e) => setAddress(e.target.value)}
//           />
//           <label>Address</label>
//         </div>

//         <div className="login-input-box">
//           <span className="input-icon"><i className="bx bxs-lock-alt"></i></span>
//           <input name="password" type="password" 
//           onChange={(e) => setPassword(e.target.value)}
//           />
//           <label>Password</label>
//         </div>

        
//         <button type="submit" className="login-btn">Register</button>

//         <div className="login-register">
//           <p>Already have an Account?<Link to="/login" className="log-link">Log In</Link></p>
//         </div>
//       </form>
//     </div>
//   </div>

// )
  
// }

// export default Register