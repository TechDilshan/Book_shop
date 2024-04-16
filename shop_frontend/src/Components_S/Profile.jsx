import React, { useEffect, useState } from "react";
import axios from "axios";
import { Upload, message, Button, Modal, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import PO_Profile from "../Components_ABI/PO_Profile";
import "../css_ss/Profile.css";

import Navi from "../Navi";
import Foot from "../footer";

const Profile = () => {
  const [data, setData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // const userEmail = sessionStorage.getItem('email');
  const userEmail = sessionStorage.getItem("userEmail");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const getCustomerDetails = () => {
    axios
      .get("http://localhost:5000/auth/getCustomerDetails", {
        params: {
          userEmail: userEmail,
        },
      })
      .then((response) => {
        setData(response.data.response);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
      });
  };

  useEffect(() => {
    getCustomerDetails();
  }, []);

  const uploadButton = (
    <div>
      <div className="upload-icon"></div>
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    return isJpgOrPng;
  };

  const handleChange = (info) => {
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => setImageUrl(imageUrl));
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleUpdate = () => {
    axios
      .put("http://localhost:5000/auth/updateCustomerDetails", {
        username: username || data.username,
        email: email || data.email,
        number: number || data.number,
        address: address || data.address,
      })
      .then((response) => {
        console.log("Updated successfully:", response.data);
        getCustomerDetails();
        setIsModalOpen(false);
        message.success("Successfully updated customer details"); // Add success message
      })
      .catch((error) => {
        console.error("Update failed:", error);
        message.error("Failed to update customer details"); // Add error message
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      axios
        .delete("http://localhost:5000/auth/deleteCustomerDetails", {
          data: {
            userEmail: userEmail,
          },
        })
        .then((response) => {
          console.log("Deleted successfully:", response.data);
          sessionStorage.removeItem("email");
          navigate("/login");
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
    <div>
      <div>
        <Navi />
      </div>
      <div className="customerProfile_Top">
        <div className="customerProfile">
          <h1>My Account</h1>
          <div className="avatar-container">
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" className="avatar-image" />
              ) : (
                uploadButton
              )}
            </Upload>
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
                </tbody>
              </table>
            </div>
          ) : (
            // <div className="user-details">
            //     <p>User Name: {data?.username}</p>
            //     <p>E-mail: {data?.email}</p>
            //     <p>Address: {data?.address}</p>
            //     <p>Phone No: {data?.number}</p>
            // </div>
            <p>Loading...</p>
          )}

          <div className="button-container">
            <Button type="primary" onClick={showModal}>
              Update
            </Button>
            <Modal
              title="USER PROFILE"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form onFinish={handleUpdate}>
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
                  label="Phone Number"
                  className="number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number!",
                    },
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
                  className={
                    address ? "input-item input-item-active" : "input-item"
                  }
                  rules={[
                    { required: true, message: "Please enter your Address!" },
                  ]}
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

            <Button type="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </div>

      <div
        style={{
            marginTop :"30px",
            marginBottom :"30px",
            marginLeft:"500px",
          paddingTop: "30px",
          paddingBottom: "30px",
          textAlign: "center",
        }}
      >
        <PO_Profile />
      </div>

      <div>
        <Foot />
      </div>
    </div>
  );
};

export default Profile;
