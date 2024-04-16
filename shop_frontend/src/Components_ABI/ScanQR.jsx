import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import { Button, Modal } from "antd";
import "./ScanQR.css";

const ScanQR = () => {
  const [scanResult, setScanResult] = useState("");
  const [scanning, setScanning] = useState(false);
  const [employeeSalData, setEmployeeSalData] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [employeeEmails, setEmployeeEmails] = useState(selectedRow ? selectedRow.employeeEmail : "");
  const [presentDates, setPresentDates] = useState(selectedRow ? selectedRow.presentDate : "");
  const [perHourSalary, setPerHourSalary] = useState(0);
  const [perDaySalary, setPerDaySalary] = useState(0);

  useEffect(() => {
    if (scanning) {
      const scanner = new Html5QrcodeScanner("reader", {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      });

      const success = (result) => {
        scanner.clear();
        setScanResult(result);

        const currentDate = new Date().toISOString();
        const perHourSalary = 0;
        const perDaySalary = 0;

        console.log(result);

        const employeeSal = {
          employeeEmail: result,
          presentDate: currentDate,
          perHourSalary: perHourSalary,
          perDaySalary: perDaySalary,
        };

        axios
          .post("http://localhost:6001/api/saveEmployeeSalData", employeeSal)
          .then((response) => {
            console.log("Scan data saved successfully:", response.data);
          })
          .catch((error) => {
            console.error("Error saving scan data:", error);
          });

        setScanning(false);
      };

      const error = (err) => {
        console.warn(err);
      };

      scanner.render(success, error);

      return () => {
        scanner.clear();
      };
    }
  }, [scanning]);

  const handleStartScanning = () => {
    setScanning(true);
  };

  const showModal = (data) => {
    setSelectedRow(data);
    setEmployeeEmails(data.employeeEmail);
    setPresentDates(data.presentDate);
    setPerHourSalary(data.perHourSalary);
    setPerDaySalary(data.perDaySalary);
    setIsModalOpen(true);
  };

  const handleOk = () => {

  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchEmployeeSalData = () => {
    axios
      .get("http://localhost:6001/api/getEmployeeSalaryDetails")
      .then((response) => {
        setEmployeeSalData(response.data.response);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee salary details:", error);
      });
  };
  useEffect(() => {
    fetchEmployeeSalData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    const EmpSalUp = {
      employeeEmails,
      presentDates,
      perHourSalary,
      perDaySalary,
    };
  
    console.log(EmpSalUp)
    axios
      .put("http://localhost:6001/api/updateEmployeeSalData", EmpSalUp)
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const handleDelete = (data) => {
    const employeeEmail = data.employeeEmail; // Using the employee email as the identifier
  
    axios
    .delete(`http://localhost:6001/api/deleteEmployeeSalData`, {
      data: { employeeEmail: employeeEmail } // Sending employeeEmail in request body
    })
    .then((response) => {
      console.log("Data deleted successfully:", response.data);
      fetchEmployeeSalData();
    })
    .catch((error) => {
      console.error("Error deleting data:", error);
    });
  
  };
  
  
  
  return (
    <div className="ScanQR_Full">
      <div className="employee-sal-details">
        <div className="EmpSalDetails">
        Employee Salary Details
        </div>
        <table>
          <thead>
            <tr>
              <th>Employee Email</th>
              <th>Present Date</th>
              <th>Per Hour Salary</th>
              <th>Per Day Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employeeSalData.map((data, index) => (
              <tr key={index}>
                <td>{data.employeeEmail}</td>
                <td>{data.presentDate}</td>
                <td>{data.perHourSalary}</td>
                <td>{data.perDaySalary}</td>
                <td>
                  <button
                    className="EmpSalView"
                    onClick={() => showModal(data)}
                  >
                    View
                  </button>
                  <button className="EmpSalDelete" onClick={() => handleDelete(data)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ScanQR">
        <h1>QR Code Scanner</h1>
        <button onClick={handleStartScanning}>Start Scanning</button>
        {scanResult ? <div>Success:{scanResult}</div> : <div id="reader"></div>}
      </div>

      <div className="employeeSalModel">
        <Modal
          title="Edit Employee Salary"
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <form className="EmpSalForm" onSubmit={handleSubmit}>
            <div className="EmpSalEmail">
              <label>Employee Email:</label>
              <input
                className="EmpSalEmailIn"
                type="text"
                name="employeeEmail"
                value={employeeEmails}

                disabled
              />
            </div>
            <div className="EmpSalPD">
              <label>Present Date:</label>
              <input
                className="EmpSalPDIn"
                type="text"
                name="presentDate"
                value={presentDates}
                disabled
              />
            </div>
            <div className="EmpSalPH">
              <label>Per Hour Salary:</label>
              <input
                className="EmpSalPHIn"
                type="text"
                name="perHourSalary"
                value={perHourSalary}
                onChange={(e) => setPerHourSalary(e.target.value)}
              />
            </div>
            <div className="EmpSalPD">
              <label>Per Day Salary:</label>
              <input
                className="EmpSalPDIn"
                type="text"
                name="perDaySalary"
                value={perDaySalary}
                onChange={(e) => setPerDaySalary(e.target.value)}
              />
            </div>
            <button className="EmpSalUpB" type="submit">Submit</button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default ScanQR;
