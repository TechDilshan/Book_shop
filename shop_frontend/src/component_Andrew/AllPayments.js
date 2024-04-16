import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from 'axios';

export default function ViewPayments() {
    const [values, setValues] = useState([]);
    const [cardHolderName, setCardHolderName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [payments, setPayments] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        function getPayments() {
            axios.get("http://localhost:3004/payment/").then((res) => {
                setPayments(res.data);
            }).catch((err) => {
                alert(err.message);
            });
        }
        getPayments();
    }, []);

    const deletePayments = (id) => {
        axios.delete(`http://localhost:3004/payment/delete/${id}`);
        alert("Payment Details deleted.");
        window.location.reload();
    };

    const updatePaymentDetails = (val) => {
        setValues(val);
        handleShow();
    };

    function sendData(e) {
        e.preventDefault();

        const updatedValues = {
            id: values._id,
            cardHolderName: cardHolderName || values.cardHolderName,
            cardNumber: cardNumber || values.cardNumber,
            expiryDate: expiryDate || values.expiryDate,
            cvv: cvv || values.cvv,
        };

        axios.put(`http://localhost:3004/payment/update/${updatedValues.id}`, updatedValues)
            .then(() => {
                alert("Payment Details Updated");
                handleClose();
                window.location.reload();
            }).catch((err) => {
                console.log(err);
                alert(err);
            });
    }

    return (
        <div>
            <h1>All Payment</h1>
            <Table striped bordered hover className="offers-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Card Holder Name</th>
                        <th>Card Number</th>
                        <th>Expiry Date</th>
                        <th>CVV</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((val, key) => (
                        <tr key={key}>
                            <td>{val._id}</td>
                            <td>{val.cardHolderName}</td>
                            <td>{val.cardNumber}</td>
                            <td>{val.expiryDate}</td>
                            <td>{val.cvv}</td>
                            <td>
                                <Button variant="primary" onClick={() => updatePaymentDetails(val)}>Update</Button>
                                <Button variant="danger" onClick={() => deletePayments(val._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={sendData}>
                        <Form.Group controlId="OfferName">
                            <Form.Label>Card Holder Name</Form.Label>
                            <Form.Control type="text" defaultValue={values.cardHolderName} onChange={(e) => setCardHolderName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="StoreName">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control type="text" defaultValue={values.cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="DiscountPercentage">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control type="text" defaultValue={values.expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="contactNumber">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control type="text" defaultValue={values.cvv} onChange={(e) => setCvv(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">Update</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}