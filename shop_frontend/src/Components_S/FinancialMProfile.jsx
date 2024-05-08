import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Upload, message, Button, Modal, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import '../css_ss/Profile.css';
import { Link } from "react-router-dom";

const FinancialMProfile = () => {

    const [data, setData] = useState(null);
    const [salData, setSalData] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);
    const userEmail = sessionStorage.getItem('userEmail');


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('');
    const [nic, setNIC] = useState('');
    const [eroll, setEroll] = useState('');
    const [fullname, setFullname] = useState('');
    const [sum, setSum] = useState('');



    const navigate = useNavigate()

    const getEmployeeDetails = () => {
        axios
            .get('http://localhost:5000/auth/getEmployeeDetails', {
                params: {
                    userEmail: userEmail
                }
            })
            .then((response) => {
                setData(response.data.response);
            })
            .catch((error) => {
                console.error("Axios Error: ", error);
            });
    };

    const getEmployeeSalary = () => {
        console.log(userEmail);


        axios
            .get('http://localhost:5000/auth/getEmployeeSalary', {
                params: {
                    userEmail: userEmail
                }
            })
            .then((response) => {
                setSalData(response.data.response);
                console.log(response.data.response);

                const sum = response.data.response.reduce((acc, currentValue) => acc + currentValue, 0);
                setSum(sum)
                console.log("Total sum:", sum);

            })
            .catch((error) => {
                console.error("Axios Error: ", error);
            });
    }

    useEffect(() => {
        getEmployeeDetails();
        getEmployeeSalary();
    }, []);

    const uploadButton = (
        <div>
            <div className="upload-icon"></div>
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        return isJpgOrPng;
    };

    const handleChange = (info) => {
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (imageUrl) => setImageUrl(imageUrl));
        }
    };

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const handleUpdate = () => {
        axios
            .put('http://localhost:5000/auth/updateEmployeeDetails', {
                username: username || data.username,
                email: email || data.email,
                number: number || data.number,
                address: address || data.address,
                eroll: eroll || data.eroll,
                fullname: fullname || data.fullname,
                nic: nic || data.nic

            })
            .then((response) => {
                console.log("Updated successfully:", response.data);
                getEmployeeDetails();
                setIsModalOpen(false);
                message.success("Successfully updated customer details"); // Add success message
            })
            .catch((error) => {
                console.error("Update failed:", error);
                message.error("Failed to update customer details"); // Add error message
            });
    };



    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (confirmDelete) {
            axios
                .delete('http://localhost:5000/auth/deleteEmployeeDetails', {
                    data: {
                        userEmail: userEmail
                    }
                })
                .then((response) => {
                    console.log("Deleted successfully:", response.data);
                    sessionStorage.removeItem('email');
                    navigate('/login');
                })
                .catch((error) => {
                    console.error("Deletion failed:", error);
                    // You may want to display an error message to the user if the deletion fails
                });
        }
    };


    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <div className='customerProfile_Top'>
            <div className='customerProfile'>
            <h3>Financial Manager</h3>
                <div className="avatar-container">

                </div>
                {data ? (
                    <div className="user-details-table">
                        <table>
                            <tbody>
                                <tr>
                                    <td>User Name</td>
                                    <td>{data?.username}</td>
                                </tr>
                                <tr>
                                    <td>Full Name</td>
                                    <td>{data?.fullname}</td>
                                </tr>
                                <tr>
                                    <td>E-mail</td>
                                    <td>{data?.email}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>{data?.address}</td>
                                </tr>
                                <tr>
                                    <td>Phone No</td>
                                    <td>{data?.number}</td>
                                </tr>
                                <tr>
                                    <td>NIC</td>
                                    <td>{data?.nic}</td>
                                </tr>
                                <tr>
                                    <td>Employee Roll</td>
                                    <td>{data?.eroll}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                ) : (
                    <p>Loading...</p>
                )}
                <div className="button-container">
                    <Button type="primary" onClick={showModal}>
                        Update
                    </Button>
                    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Form
                            onFinish={handleUpdate}
                        >
                            <Form.Item
                                label="User Name"
                                rules={[
                                    { required: true, message: "Please enter your User name!" },
                                ]}
                            >
                                <Input
                                    name="username"
                                    size="large"
                                    placeholder="User Name"
                                    className="username"
                                    value={username || data?.username} // Set value to either the state value or the data value
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Item>


                            <Form.Item
                                label="Full Name"
                                rules={[
                                    { required: true, message: "Please enter your User name!" },
                                ]}
                            >
                                <Input
                                    name="fulname"
                                    size="large"
                                    placeholder="Full Name"
                                    className="fullname"
                                    value={fullname || data?.fullname} // Set value to either the state value or the data value
                                    onChange={(e) => setFullname(e.target.value)}
                                />
                            </Form.Item>



                            <Form.Item
                                label="Email"
                                rules={[
                                    { required: true, message: "Please enter your Email!" },
                                    {
                                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Please enter a valid email address!",
                                    },
                                ]}
                            >
                                <Input
                                    className="email"
                                    placeholder="Email"
                                    value={email || data?.email} // Set value to either the state value or the data value
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled
                                />
                            </Form.Item>


                            <Form.Item
                                label="Employee Roll"

                            >
                                <Input
                                    className="eroll"
                                    placeholder="Employee Roll"
                                    value={eroll || data?.eroll} // Set value to either the state value or the data value
                                    onChange={(e) => setEroll(e.target.value)}
                                    disabled
                                />
                            </Form.Item>



                            <Form.Item
                                label="NIC Number"
                                className="nic"
                                rules={[
                                    { required: true, message: "Please enter your NIC number!" },

                                ]}
                            >
                                <Input
                                    name="nic"
                                    className="nic"
                                    placeholder="NIC Number"
                                    value={nic || data?.nic} // Set value to either the state value or the data value
                                    onChange={(e) => setNIC(e.target.value)}
                                />
                            </Form.Item>


                            <Form.Item
                                label="Phone Number"
                                className="number"
                                rules={[
                                    { required: true, message: "Please enter your phone number!" },
                                    {
                                        pattern: /^(0)[0-9]{9}$/,
                                        message: "Please enter a valid phone number!",
                                    },
                                ]}
                            >
                                <Input
                                    name="number"
                                    className="number"
                                    placeholder="Phone Number"
                                    value={number || data?.number} // Set value to either the state value or the data value
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Address"
                                className={address ? "input-item input-item-active" : "input-item"}
                                rules={[{ required: true, message: "Please enter your Address!" }]}
                            >
                                <Input
                                    name="address"
                                    size="large"
                                    placeholder="Address"
                                    className="Address"
                                    value={address || data?.address} // Set value to either the state value or the data value
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Form.Item>


                            <Button type="primary" htmlType="submit" className="submit">
                                Update
                            </Button>
                        </Form>
                    </Modal>

                    {/* <Button type="danger" onClick={handleDelete}>Delete</Button> */}
                </div>
            </div>
            <p>Total Salary : Rs. {sum}.00 <Link to='/empaysheet'><button type="primary" htmlType="submit" className="sub1515">summary</button></Link></p>

        </div>
    );
};

export default FinancialMProfile;
