import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from 'axios';

export default function ViewShipping() {
    const [values, setValues] = useState([]);
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [shippings, setShippings] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        function getShippings() {
            axios.get("http://localhost:3004/shipping/").then((res) => {
                setShippings(res.data);
            }).catch((err) => {
                alert(err.message);
            });
        }
        getShippings();
    }, []);

    const deleteShippings = (id) => {
        axios.delete(`http://localhost:3004/shipping/delete/${id}`);
        alert("Shipping Details deleted.");
        window.location.reload();
    };

    const updateShippingDetails = (val) => {
        setValues(val);
        handleShow();
    };

    function sendData(e) {
        e.preventDefault();

        const updatedValues = {
            id: values._id,
            fullName: fullName || values.fullName,
            address: address || values.address,
            city: city || values.city,
            postalCode: postalCode || values.postalCode,
            phone: phone || values.phone,
            email: email || values.email
        };

        axios.put(`http://localhost:3004/shipping/update/${updatedValues.id}`, updatedValues)
            .then(() => {
                alert("Shipping Details Updated");
                handleClose();
                window.location.reload();
            }).catch((err) => {
                console.log(err);
                alert(err);
            });
    }

    return (
        <div>
            <h1>All Shipping Details</h1>
            <Table striped bordered hover className="offers-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Postal Code</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {shippings.map((val, key) => (
                        <tr key={key}>
                            <td>{val._id}</td>
                            <td>{val.fullName}</td>
                            <td>{val.address}</td>
                            <td>{val.city}</td>
                            <td>{val.postalCode}</td>
                            <td>{val.phone}</td>
                            <td>{val.email}</td>
                            <td>
                                <Button variant="primary" onClick={() => updateShippingDetails(val)}>Update</Button>
                                <Button variant="danger" onClick={() => deleteShippings(val._id)}>Delete</Button>
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
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" defaultValue={values.fullName} onChange={(e) => setFullName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="StoreName">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" defaultValue={values.address} onChange={(e) => setAddress(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="DiscountPercentage">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" defaultValue={values.city} onChange={(e) => setCity(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="contactNumber">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control type="text" defaultValue={values.postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="Description">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" defaultValue={values.phone} onChange={(e) => setPhone(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="Period">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" defaultValue={values.email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">Update</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}