import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navi from '../Navi';

export default function PlaceOrder() {
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const navigate = useNavigate();

  function sendData(e) {
    e.preventDefault();

    const newPayment = {
        cardHolderName,
        cardNumber,
        expiryDate,
        cvv
    };

    axios
      .post("http://localhost:3004/payment/add", newPayment)
      .then(() => {
        alert("Payment Details were recorded.");
        navigate('/UserHome_C');
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <Navi/>
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
  <div className="container max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
    <h1 className="text-3xl font-semibold text-center py-6">Payment Details</h1>
    <Form onSubmit={sendData} className="form-box px-6 py-4">
      <Form.Group controlId="name">
        <Form.Label>Card Holder Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          name="cardHolderName"
          onChange={(e) => {
            setCardHolderName(e.target.value);
          }}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </Form.Group>

      <Form.Group controlId="storeName">
        <Form.Label>Card Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Card Number"
          name="cardNumber"
          onChange={(e) => {
            setCardNumber(e.target.value);
          }}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </Form.Group>

      <Form.Group controlId="discountPercentage">
        <Form.Label>Expiry Date</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Expiry Date"
          name="expiryDate"
          onChange={(e) => {
            setExpiryDate(e.target.value);
          }}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </Form.Group>

      <Form.Group controlId="contactNumber">
        <Form.Label>CVV</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter CVV"
          name="cvv"
          onChange={(e) => {
            setCvv(e.target.value);
          }}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </Form.Group>

      <div className="mb-4"></div>

      <Button
        variant="primary"
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Pay
      </Button>
    </Form>
  </div>
</div>
</div>

  );
}
