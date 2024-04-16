import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormContainer from './FormContainer';
import CheckoutSteps from './CheckoutSteps';
import Navi from '../Navi';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [showDetails, setShowDetails] = useState(false); // State to control the visibility of additional details

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem('paymentMethod', paymentMethod);
    navigate('/place');
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setShowDetails(true);
  };

  const renderAdditionalInformation = () => {
    switch (paymentMethod) {
      case 'Bank Transfer':
        return (
          <div>
            <p>Bank Transfer details:</p>
            <ul>
              <li>Bank Name: XYZ Bank</li>
              <li>Account Number: 123456789</li>
              <li>Routing Number: 987654321</li>
            </ul>
          </div>
        );
      case 'Installment Pay':
        return (
          <div>
            <p>Installment payment details:</p>
            <ul>
              <li>Number of Installments: 3</li>
              <li>Installment Amount: $100</li>
              <li>First Installment Due: 30 days</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Navi/>
      <div className="bg-gray-100 min-h-screen flex-auto justify-center items-center">
        <CheckoutSteps step1 step2 />
        <div className="container max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
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
                    onChange={handlePaymentMethodChange}
                    className="mr-2"
                  />
                  <label htmlFor="PayPal">PayPal or Credit Card</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="BankTransfer"
                    name="paymentMethod"
                    value="Bank Transfer"
                    checked={paymentMethod === 'Bank Transfer'}
                    onChange={handlePaymentMethodChange}
                    className="mr-2"
                  />
                  <label htmlFor="BankTransfer">Bank Transfer</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="InstallmentPay"
                    name="paymentMethod"
                    value="Installment Pay"
                    checked={paymentMethod === 'Installment Pay'}
                    onChange={handlePaymentMethodChange}
                    className="mr-2"
                  />
                  <label htmlFor="InstallmentPay">Installment Pay</label>
                </div>
              </div>
            </Form.Group>

            {/* Additional details section */}
            {showDetails && (
              <div className="mt-4 border-t pt-4">
                {renderAdditionalInformation()}
              </div>
            )}

            <Button type='submit' variant='primary' className="mt-4 w-full bg-blue-600 hover:bg-blue-700">
              Continue
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
