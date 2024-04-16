import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';
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
    <div className="bg-gray-100 min-h-screen">
      <Navi />
      <CheckoutSteps step1/>
      <Container className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
        <h1 className="text-3xl font-semibold text-center py-6">Shipping Details</h1>
        <Form onSubmit={submitHandler} className="px-6 py-4">
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group controlId='fullName'>
                <Form.Label className="block mb-1">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='Enter your full name'
                  value={fullName}
                  required
                  onChange={(e) => setFullName(e.target.value)}
                  className="shadow appearance-none border rounded w-full"
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId='address'>
                <Form.Label className="block mb-1">Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='Enter your Address'
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  className="shadow appearance-none border rounded w-full"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group controlId='city'>
                <Form.Label className="block mb-1">City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='Enter your City'
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                  className="shadow appearance-none border rounded w-full"
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId='postalCode'>
                <Form.Label className="block mb-1">Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='Enter Postal Code'
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="shadow appearance-none border rounded w-full"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group controlId='phone'>
                <Form.Label className="block mb-1">Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='Enter your Phone Number'
                  value={phone}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                  className="shadow appearance-none border rounded w-full"
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId='email'>
                <Form.Label className="block mb-1">Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='Enter your Email'
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full"
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type='submit' variant='primary' className='mt-3 w-full bg-blue-600'>
            Continue
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Shippingscreen_Drew;
