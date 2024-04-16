import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navi from '../Navi';
import axios from 'axios';

const Shippingscreen_Drew = () => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  // const submitHandler = async (e) => {
  //   e.preventDefault();
    
  //   // Construct the shipping address object
  //   const shippingAddress = {
  //     fullName,
  //     address,
  //     city,
  //     postalCode,
  //     phone,
  //     email
  //   };
  
  //   try {
  //     // Make an HTTP POST request to your backend server
  //     const response = await fetch('http://localhost:3004/shipping/add', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(shippingAddress)
  //     });
  
  //     if (!response.ok) {
  //       throw new Error('Failed to save shipping address');
  //     }
  
  //     // If successfully saved, navigate to the payment screen
  //     navigate('/payment');
  //   } catch (error) {
  //     console.error('Error saving shipping address:', error);
  //     // Handle error as needed
  //   }
  // };

  function submitHandler(e) {
    e.preventDefault();

    const shippingAddress = {
      fullName,
      address,
      city,
      postalCode,
      phone,
      email
    };

    axios
      .post("http://localhost:3004/shipping/add", shippingAddress)
      .then(() => {
        alert("Shipping Details were recorded.");
        navigate('/payment');
      })
      .catch((err) => {
        alert(err);
      });
  }

  

  return (
    <Container>
      <Navi />
      <h1 className="mt-4 mb-3" >Shippingscreen</h1>
      <Form onSubmit={submitHandler}>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId='fullName'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder='Enter your full name'
                value={fullName}
                required
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder='Enter your Address'
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder='Enter your City'
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId='postalCode'>
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder='Enter Postal Code'
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId='phone'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder='Enter your Phone Number'
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder='Enter your Email'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type='submit' variant='primary' className='mt-3'>
          Continue
        </Button>
      </Form>
    </Container>
  );
};

export default Shippingscreen_Drew;
