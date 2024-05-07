import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Modal, message } from "antd";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input } from "antd";
import { FileOutlined, DownOutlined, DeleteOutlined } from "@ant-design/icons";
import "./PO_Profile.css";
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");

const PO_Profile = () => {
  const email = sessionStorage.getItem("userEmail");

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
        window.location.reload();
      } else {
        console.error("Failed to delete order");
        window.location.reload();
        message.success("Order deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleDownloadPDF = async (order) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Add header
    const currentDate = new Date().toLocaleDateString();
    const companyName = "Rathy Intech";
    const phoneNumber = "0112 367 500";
    const email = "your@email.com";

    const headerY = 750;
    const infoY = 720;

    // const headerFont = await pdfDoc.embedFont(PDFDocument.Font.Helvetica);
    // const textFont = await pdfDoc.embedFont(PDFDocument.Font.Helvetica);

    page.drawText("Purchase Order", { x: 50, y: headerY, size: 24 });
    page.drawText(`Company Name: ${companyName}`, { x: 50, y: infoY });
    page.drawText(`Phone Number: ${phoneNumber}`, { x: 50, y: infoY - 20 });
    page.drawText(`Email: ${email}`, { x: 50, y: infoY - 40 });
    page.drawText(`Date: ${currentDate}`, { x: 50, y: infoY - 60 });
    // Initial y position for order details
    let yPos = infoY - 100;

    page.drawText(`Purchase Order ID: ${order.order}`, { x: 50, y: yPos });
    page.drawText(`Full Name: ${order.name}`, { x: 50, y: yPos - 20 });
    page.drawText(`Address: ${order.address}`, { x: 50, y: yPos - 40 });
    page.drawText(`State: ${order.state}`, { x: 50, y: yPos - 60 });
    page.drawText(`Zip Code: ${order.zipCode}`, { x: 50, y: yPos - 80 });
    page.drawText(
      `Created Date: ${new Date(order.startDate).toLocaleDateString()}`,
      { x: 50, y: yPos - 100 }
    );
    page.drawText(
      `Wanted Date: ${new Date(order.endDate).toLocaleDateString()}`,
      { x: 50, y: yPos - 120 }
    );

    yPos -= 160; // Adjust y position for the items
    order.items.forEach((item, index) => {
      page.drawText(`Item ${index + 1}: ${item.item}`, { x: 50, y: yPos });
      page.drawText(`Description: ${item.description}`, {
        x: 70,
        y: yPos - 20,
      });
      page.drawText(`Quantity: ${item.quantity}`, { x: 70, y: yPos - 40 });
      page.drawText(`Price: Rs. ${item.price}`, { x: 70, y: yPos - 60 });
      page.drawText(`Amount: Rs. ${item.amount}`, { x: 70, y: yPos - 80 });
      yPos -= 100; // Adjust y position for the next item
    });

    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, "purchase_order.pdf", "application/pdf");
  };

  function download(data, filename, type) {
    const file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob)
      // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else {
      // Others
      const a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

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
              disabled={order.status === 1}
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

                  <Form.Item
                    label="Full Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your full name!",
                      },
                    ]}
                  >
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Address"
                    rules={[
                      {
                        required: true,
                        message: "Please input your address!",
                      },
                    ]}
                  >
                    <Input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Mobile Number"
                    rules={[
                      {
                        required: true,
                        message: "Please input your mobile number!",
                      },
                    ]}
                  >
                    <Input
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    label="State"
                    rules={[
                      {
                        required: true,
                        message: "Please input your state!",
                      },
                    ]}
                  >
                    <Input
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Zip Code"
                    rules={[
                      {
                        required: true,
                        message: "Please input your zip code!",
                      },
                    ]}
                  >
                    <Input
                      value={zipcode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </Form.Item>

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
                    required
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
                          required
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
                          required
                        />

                        <p>Quantity: </p>
                        <input
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(index, "quantity", e.target.value)
                          }
                          required
                        />

                        <p>Price: Rs.</p>
                        <input
                          value={item.price}
                          onChange={(e) =>
                            handleItemChange(index, "price", e.target.value)
                          }
                          required
                        />

                        <p>Amount: Rs.</p>
                        <input
                          value={item.amount}
                          onChange={(e) =>
                            handleItemChange(index, "amount", e.target.value)
                          }
                          required
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
              disabled={order.status == 1}
              onClick={() => handleDeleteIconClick(order)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PO_Profile;
