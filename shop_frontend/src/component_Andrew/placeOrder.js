import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

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
    <div className="form-container">
      <Form onSubmit={sendData}>
        <div className="form-box">
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
            />
          </Form.Group>

          <Form.Group controlId="discountPercentage">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Discount Percentage"
              name="expiryDate"
              onChange={(e) => {
                setExpiryDate(e.target.value);
              }}
              required
            />
          </Form.Group>

          <Form.Group controlId="contactNumber">
            <Form.Label>CVV</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Contact Number"
              name="cvv"
              onChange={(e) => {
                setCvv(e.target.value);
              }}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Pay
          </Button>
        </div>
      </Form>
    </div>
  );
}