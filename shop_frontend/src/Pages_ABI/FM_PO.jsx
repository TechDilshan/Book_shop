import React, { useState, useEffect } from "react";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, message, Alert, Input, Modal } from "antd";
import Dashboard from "../Components_ABI/Dashboard";
import FM_PO_Report from "../Components_ABI/FM_PO_Report";
import axios from "axios";
import "./FM_PO.css";

const FM_PO = () => {
  const [data, setData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertOrder, setAlertOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const getPurchaseorder = () => {
    axios
      .get(`http://localhost:6001/api/getPurchaseorder`)
      .then((response) => {
        const filteredData =
          response.data?.response.filter((item) => item.status === 0) || [];
        setData(filteredData);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
      });
  };

  useEffect(() => {
    getPurchaseorder();
  }, []);

  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (orderId) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(orderId)
        ? prevExpandedRows.filter((id) => id !== orderId)
        : [...prevExpandedRows, orderId]
    );
  };

  const handleDelete = (order) => {
    setAlertOrder(order);
    setShowAlert(true);
  };

  const confirmDelete = () => {
    axios
      .post(`http://localhost:6001/api/deletePurchaseOrder`, {
        order: alertOrder,
      })
      .then(() => {
        message.success("Record deleted successfully");
        setData((prevData) =>
          prevData.filter((item) => item.order !== alertOrder)
        );
        setShowAlert(false);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
        message.error("Failed to delete record");
        setShowAlert(false);
      });
  };

  const cancelDelete = () => {
    setShowAlert(false);
  };

  const handleAccept = (order) => {
    axios
      .post(`http://localhost:6001/api/acceptPurchaseOrder`, {
        order: order,
      })
      .then(() => {
        message.success("Purchase order accepted successfully");
        getPurchaseorder();
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
        message.error("Failed to accept purchase order");
      });
  };

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    item.order.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div className="gap">
      <Dashboard />
      {showAlert && (
        <div className="overlay">
          <div className="alert-container">
            <Alert
              message="Are you sure you want to delete this record?"
              type="warning"
              showIcon
              closable
              onClose={cancelDelete}
              action={
                <>
                  <Button size="small" danger onClick={confirmDelete}>
                    Yes
                  </Button>
                  <Button size="small" onClick={cancelDelete}>
                    No
                  </Button>
                </>
              }
            />
          </div>
        </div>
      )}

      <div className="PurchaseOrder-details">
        <div className="purchaseDetails">
          <div>Purchase Order Details</div>
        </div>
      </div>
      <div className="POID_Serach">
        <input
          placeholder="Search by Purchase Order ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchOutlined className="searchPO-icon" />

        <div className="GenaratePOReport">
          <Button type="primary" onClick={showModal}>
            Generate Report
          </Button>
          <Modal
            className="FM_Po_R_M"
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1000} // Set the width here
          >
            <FM_PO_Report />
          </Modal>
        </div>
      </div>

      <table className="FM_PO_table">
        <thead>
          <tr>
            <th></th>
            <th>Purchase Order-ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Created Date</th>
            <th>Wanted Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((rowData) => (
            <React.Fragment key={rowData.order}>
              <tr>
                <td>
                  <Button
                    className="arrow"
                    icon={<DownOutlined />}
                    onClick={() => toggleRow(rowData.order)}
                  />
                </td>
                <td>{rowData.order}</td>
                <td>{rowData.name}</td>
                <td>{rowData.email}</td>
                <td>{rowData.phone}</td>
                <td>{new Date(rowData.startDate).toLocaleDateString()}</td>
                <td>{new Date(rowData.endDate).toLocaleDateString()}</td>
                <td className="action-buttons">
                  <Button
                    className="delete"
                    type="Delete"
                    onClick={() => {
                      handleDelete(rowData.order);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    className="accept"
                    type="accept"
                    onClick={() => {
                      handleAccept(rowData.order);
                    }}
                  >
                    Accept
                  </Button>
                </td>
              </tr>
              {expandedRows.includes(rowData.order) && (
                <tr>
                  <td colSpan="8">
                    <SubTable items={rowData.items} order={rowData.order} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SubTable = ({ items: initialItems, order }) => {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const handleDiscountChange = (event, index) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      discount: event.target.value,
      amount:
        updatedItems[index].quantity *
        updatedItems[index].price *
        (1 - event.target.value / 100),
    };
    setItems(updatedItems);
  };

  const handleUpdate = (index, updatedItem) => {
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    setItems(updatedItems);

    axios
      .post(`http://localhost:6001/api/updatePurchaseOrder`, {
        order: order,
        items: {
          _id: updatedItems[index]._id,
          discount: updatedItems[index].discount,
          amount: updatedItems[index].amount,
        },
      })
      .then(() => {
        message.success("Record updated successfully");
        window.location.reload();
        console.log(updatedItems[index]._id);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
        message.error("Failed to update record");
      });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Discount</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{item.item}</td>
            <td>{item.description}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
            <td>
              <input
                type="number"
                value={item.discount}
                onChange={(event) => handleDiscountChange(event, index)}
              />
            </td>
            <td>{item.amount.toFixed(2)}</td>
            <td>
              <Button
                className="update_PO"
                type="update"
                onClick={() => handleUpdate(index, item)}
              >
                Update
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FM_PO;
