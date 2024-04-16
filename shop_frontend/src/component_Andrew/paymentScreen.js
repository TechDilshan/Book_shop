import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormContainer from './FormContainer';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem('paymentMethod', paymentMethod);
    navigate('/place');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label className="block mb-2" as='legend'>Select Method</Form.Label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === 'PayPal'}
                  onChange={() => setPaymentMethod('PayPal')}
                  className="mr-2"
                />
                <label htmlFor="PayPal">PayPal or Credit Card</label>
              </div>
            </div>
          </Form.Group>

          <Button type='submit' variant='primary' className="mt-4 w-full bg-blue-600 hover:bg-blue-700">
            Continue
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default PaymentScreen;
