import React, { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button } from "antd";
import jsPDF from "jspdf";
import axios from "axios";
import "./FM_PO_Report.css";

const FM_PO_Report = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPurchaseorder();
  }, []);

  const getPurchaseorder = () => {
    axios
      .get(`http://localhost:6001/api/getPurchaseorder`)
      .then((response) => {
        const filteredData = response.data?.response.filter(
          (item) => item.status === 1
        ) || [];
        setData(filteredData);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
      });
  };

  const [expandedRows, setExpandedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleRow = (orderId) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(orderId)
        ? prevExpandedRows.filter((id) => id !== orderId)
        : [...prevExpandedRows, orderId]
    );
  };

  const filteredData = data.filter((item) =>
    item.order.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generatePDF = () => {
    const doc = new jsPDF('landscape'); // Create new instance with landscape orientation
  
    // Set title
    doc.setFontSize(10);
    doc.text("Purchase Order Report", 15, 15);

    const currentDate = new Date().toLocaleDateString();
    doc.text(`Date: ${currentDate}`, 15, 20);
  
    // Set table headers
    const headers = ["Purchase Order-ID", "Name", "Email", "Phone", "Created Date", "Wanted Date"];
    const headerHeight = 10;
    const cellWidth = 40;
    const paddingLeftPhone = 15; // Padding to the left of the "Phone" column
    const startY = 25;
    let currentY = startY;
  
    headers.forEach((header, index) => {
      if (header === "Phone") {
        doc.text(header, 15 + index * cellWidth + paddingLeftPhone, currentY); // Add padding to the left of the "Phone" column
      } else {
        doc.text(header, 15 + index * cellWidth, currentY);
      }
    });
    currentY += headerHeight;
  
    // Set table rows
    const rows = [];
    filteredData.forEach((rowData) => {
      const row = [
        rowData.order,
        rowData.name,
        rowData.email,
        rowData.phone,
        new Date(rowData.startDate).toLocaleDateString(),
        new Date(rowData.endDate).toLocaleDateString(),
      ];
      rows.push(row);
    });
  
    rows.forEach((row) => {
      row.forEach((cell, index) => {
        if (headers[index] === "Phone") {
          doc.text(cell.toString(), 15 + index * cellWidth + paddingLeftPhone, currentY); // Add padding to the left of the "Phone" column
        } else {
          doc.text(cell.toString(), 15 + index * cellWidth, currentY);
        }
      });
      currentY += headerHeight;
    });
  
    // Save PDF
    doc.save("purchase_order_report.pdf");
  };
  
  

  
  return (
    <div className="gap">
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
      <div className="GenarateRButton">
        <Button onClick={generatePDF}>Generate Report</Button>
      </div>
    </div>
  );
};

const SubTable = ({ items: initialItems }) => {
  const [items] = useState(initialItems);

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{item.item}</td>
            <td>{item.description}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
            <td>{item.amount.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FM_PO_Report;
