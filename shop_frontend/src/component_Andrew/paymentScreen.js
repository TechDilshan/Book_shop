import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormContainer from './FormContainer';
//import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({});

  /*useEffect(() => {
    // Assuming you have a way to fetch the shipping address
    const fetchedShippingAddress = fetchShippingAddress(); // Implement this method
    if (!fetchedShippingAddress) {
      navigate('/shipping');
    } else {
      setShippingAddress(fetchedShippingAddress);
    }
  }, [navigate]);*/

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    // You can save payment method to localStorage or a state management solution like Context API
    // For simplicity, I'll save it to localStorage
    localStorage.setItem('paymentMethod', paymentMethod);
    navigate('/place');
  };

  return (
    <FormContainer>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              className='my-2'
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked={paymentMethod === 'PayPal'}
              onChange={() => setPaymentMethod('PayPal')}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
