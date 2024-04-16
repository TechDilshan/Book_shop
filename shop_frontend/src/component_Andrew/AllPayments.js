import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Table, Button, Modal, Form} from 'react-bootstrap';

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
            <h1 className="text-3xl font-semibold mb-4">All Payment</h1>
            <table className="table-auto border-collapse w-full">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Card Holder Name</th>
                        <th className="border px-4 py-2">Card Number</th>
                        <th className="border px-4 py-2">Expiry Date</th>
                        <th className="border px-4 py-2">CVV</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((val, key) => (
                        <tr key={key} className="bg-gray-100">
                            <td className="border px-4 py-2">{val._id}</td>
                            <td className="border px-4 py-2">{val.cardHolderName}</td>
                            <td className="border px-4 py-2">{val.cardNumber}</td>
                            <td className="border px-4 py-2">{val.expiryDate}</td>
                            <td className="border px-4 py-2">{val.cvv}</td>
                            <td className="border px-4 py-2">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => updatePaymentDetails(val)}>Update</button>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deletePayments(val._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
