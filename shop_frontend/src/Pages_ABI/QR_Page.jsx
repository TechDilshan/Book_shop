import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "antd";
import Dashboard from "../Components_ABI/Dashboard";
import QR_Gen from "../Components_ABI/QR_Gen";

const QR_Page = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const employeeData = () => {
    axios
      .get(`http://localhost:6001/api/getAllEmployeeDetails`)
      .then((response) => {
        setData(response.data?.response || []);
      })
      .catch((error) => {
        console.error("Axios Error: ", error);
      });
  };

  useEffect(() => {
    employeeData();
  }, []);

  const filteredData = data.filter((item) =>
    item.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="QR_Page">
      <Dashboard />
      <div
        className="QR_Page_Name"
        style={{
          color: "black",
          fontSize: "30px",
          fontWeight: "bold",
          marginTop: "70px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Employee Details
      </div>
      <Input
        type="text"
        placeholder="Search by username"
        value={searchQuery}
        onChange={handleSearch}
        style={{
          marginBottom: "20px",
          marginLeft: "50px",
          padding: "8px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          width: "300px",
        }}
      />

      <table
      className="QR_Page_Table"
        style={{ width: "90%", borderCollapse: "collapse", marginLeft: "50px" }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px",color: "black" }}>
              User Name
            </th>
            <th style={{ border: "1px solid black", padding: "8px",color: "black" }}>
              Full Name
            </th>
            <th style={{ border: "1px solid black", padding: "8px",color: "black" }}>Email</th>
            <th style={{ border: "1px solid black", padding: "8px",color: "black" }}>Role</th>
            <th style={{ border: "1px solid black", padding: "8px",color: "black" }}>
              Address
            </th>
            <th style={{ border: "1px solid black", padding: "8px",color: "black" }}>NIC</th>
            <th style={{ border: "1px solid black", padding: "8px",color: "black" }}>
              Phone No
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.username}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.fullname}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.email}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.eroll}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.address}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.nic}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.number}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <QR_Gen />
      <br />
      <br />

    </div>
  );
};

export default QR_Page;
