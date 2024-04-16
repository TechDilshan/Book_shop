import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Modal, message } from "antd";
import jsPDF from 'jspdf';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FileOutlined, DownOutlined, DeleteOutlined } from "@ant-design/icons";
import "./PO_Profile.css";

const PO_Profile = () => {
  // const location = useLocation();
  // const email = location.state?.email;

  const email = sessionStorage.getItem('userEmail');
  
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); 

  const getCustomerPO = () => {
    axios
      .get(`http://localhost:6001/api/getCustomerPO`, {
        params: {
          email: email,
        },
      })
      .then((response) => {
        setData(response.data?.emailDetails || []);
        console.log(response);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
      });
  };

  useEffect(() => {
    if (email) {
      getCustomerPO();
    }
  }, [email]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFileIconClick = (order) => {
    setSelectedOrder(order);
    showModal(); // Show modal when icon is clicked
  };

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleUpdateIconClick = (order) => {
    setSelectedOrder(order);
    setIsUpdateModalOpen(true);

    setFullName(order.name);
    setAddress(order.address);
    setMobileNumber(order.phone);
    setState(order.state);
    setDiscount(order.discount);
    setZipCode(order.zipcode);
    setCreatedDate(new Date(order.startDate).toLocaleDateString());
    setWantedDate(new Date(order.endDate).toLocaleDateString());
    setItems(order.items);
  };

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [wantedDate, setWantedDate] = useState("");
  const [discount, setDiscount] = useState("");
  const [items, setItems] = useState([
    {
      id: 0,
      item: "",
      description: "",
      quantity: "",
      price: "",
      amount: "",
    },
  ]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...selectedOrder.items];
    updatedItems[index][field] = value;
    setSelectedOrder({
      ...selectedOrder,
      items: updatedItems,
    });
  };

  const handleCusUpdate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:6001/api/CusUpdatePO",
        {
          order: selectedOrder.order,
          fullName,
          address,
          mobileNumber,
          state,
          zipcode,
          discount,
          items: selectedOrder.items.map((item) => ({
            id: item.id,
            item: item.item,
            description: item.description,
            quantity: item.quantity,
            price: item.price,
            amount: item.amount,
          })),
        }
      );

      if (response.data.success) {
        console.log("Order updated successfully");
        message.success("Order updated successfully");
        getCustomerPO();
      } else {
        console.error("Failed to update order");
        message.error("Failed to update order. Please try again.");
      }
    } catch (error) {
      console.error("Error updating order:", error);
    } finally {
      setIsUpdateModalOpen(false);
    }
  };

  const handleDeleteIconClick = async (order) => {
    try {
      const response = await axios.delete(
        `http://localhost:6001/api/deleteCusPO`,
        {
          data: { order: order.order },
        }
      );

      if (response.data.response) {
        console.log("Order deleted successfully");
        message.success("Order deleted successfully");
        getCustomerPO();
      } else {
        console.error("Failed to delete order");
        message.success("Order deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  const handleDownloadPDF = (order) => {
    const doc = new jsPDF();

    doc.text(`Purchase Order ID: ${order.order}`, 10, 10);
    doc.text(`Full Name: ${order.name}`, 10, 20);
    doc.text(`Address: ${order.address}`, 10, 30);
    doc.text(`State: ${order.state}`, 10, 40);
    doc.text(`Zip Code: ${order.zipCode}`, 10, 50);
    doc.text(`Created Date: ${new Date(order.startDate).toLocaleDateString()}`, 10, 60);
    doc.text(`Wanted Date: ${new Date(order.endDate).toLocaleDateString()}`, 10, 70);
  
    let yPos = 80; 
    order.items.forEach((item, index) => {
      yPos += 10;
      doc.text(`Item ${index + 1}: ${item.item}`, 10, yPos);
      doc.text(`Description: ${item.description}`, 20, yPos + 10);
      doc.text(`Quantity: ${item.quantity}`, 20, yPos + 20);
      doc.text(`Price: Rs. ${item.price}`, 20, yPos + 30);
      doc.text(`Amount: Rs. ${item.amount}`, 20, yPos + 40);
    });
  
    doc.save('purchase_order.pdf');
  };
  

  return (
    <div className="PO_Profile_Container">
      <div className="PurchaseOrder_Title"> Purchase Order IDs: </div>
      <ul>
        {data.map((order) => (
          <li key={order._id}>
            <p>ID: {order.order}</p>

            <button
              className="Po_PDf"
              disabled={order.status === 0}
              onClick={() => handleDownloadPDF(order)}
            >
              Download PDF
            </button>

            <FileOutlined
              className="viewPO"
              onClick={() => handleFileIconClick(order)}
            />
            <Modal
              title="Order Details"
              visible={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              {selectedOrder && (
                <div className="viewModel">
                  <p>Purchase Order ID: {selectedOrder.order}</p>
                  <p>Full Name: {selectedOrder.name}</p>
                  <p>Address: {selectedOrder.address}</p>
                  <p>Mobile Number: {selectedOrder.phone}</p>
                  <p>State: {selectedOrder.state}</p>
                  <p>Zip Code: {selectedOrder.zipcode}</p>
                  <p>
                    Created Date:{" "}
                    {new Date(selectedOrder.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    Wanted Date:{" "}
                    {new Date(selectedOrder.endDate).toLocaleDateString()}
                  </p>
                  <p>Items:</p>
                  <ul>
                    {selectedOrder.items.map((item, index) => (
                      <li key={index}>
                        <p>Item: {item.item}</p>
                        <p>Description: {item.description}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: Rs.{item.price}</p>
                        <p>Discount : {item.discount}%</p>
                        <p>Amount: Rs.{item.amount}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Modal>
            <DownOutlined
              className="updatePO"
              onClick={() => handleUpdateIconClick(order)}
            />
            <Modal
              title="Update Order"
              visible={isUpdateModalOpen}
              onOk={handleOk}
              onCancel={() => setIsUpdateModalOpen(false)}
            >
              {selectedOrder && (
                <div className="viewModel">
                  <p>Purchase Order ID: </p>
                  <input value={selectedOrder.order} disabled />

                  <p>Full Name:</p>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />

                  <p>Address:</p>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />

                  <p>Mobile Number:</p>
                  <input
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />

                  <p>State:</p>
                  <input
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />

                  <p>Zip Code:</p>
                  <input
                    value={zipcode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />

                  <p>Created Date:</p>
                  <input
                    value={new Date(createdDate).toLocaleDateString()}
                    onChange={(e) => setCreatedDate(e.target.value)}
                    disabled
                  />

                  <p>Wanted Date :</p>
                  <input
                    value={new Date(wantedDate).toLocaleDateString()}
                    onChange={(e) => setWantedDate(e.target.value)}
                  />

                  <p>Discount :</p>
                  <input value={discount} disabled />

                  <p>Items:</p>
                  <ul>
                    {selectedOrder.items.map((item, index) => (
                      <li key={index}>
                        <p>Item: </p>
                        <input
                          value={item.item}
                          onChange={(e) =>
                            handleItemChange(index, "item", e.target.value)
                          }
                        />

                        <p>Description: </p>
                        <input
                          value={item.description}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                        />

                        <p>Quantity: </p>
                        <input
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(index, "quantity", e.target.value)
                          }
                        />

                        <p>Price: Rs.</p>
                        <input
                          value={item.price}
                          onChange={(e) =>
                            handleItemChange(index, "price", e.target.value)
                          }
                        />

                        <p>Amount: Rs.</p>
                        <input
                          value={item.amount}
                          onChange={(e) =>
                            handleItemChange(index, "amount", e.target.value)
                          }
                        />
                      </li>
                    ))}
                  </ul>

                  <Button onClick={handleCusUpdate}>Update</Button>
                </div>
              )}
            </Modal>
            <DeleteOutlined
              className="deletePO"
              onClick={() => handleDeleteIconClick(order)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PO_Profile;
