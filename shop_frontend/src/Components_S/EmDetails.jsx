import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css_ss/details.css';
import { Link } from "react-router-dom";

function EmDetails() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const readEmployeeDetails = () => {
        axios
            .get('http://localhost:5000/auth/readEmployeeDetails')
            .then((response) => {
                setData(response.data.response);
            })
            .catch((error) => {
                console.error("Axios Error: ", error);
            });
    };

    useEffect(() => {
        readEmployeeDetails();
    }, []);

    const handleDelete = (employeeId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if  (confirmDelete) {
        axios
            .delete('http://localhost:5000/auth/deleteEmployeeDetails', {
                data: { employeeId }
            })
            .then((response) => {
                console.log(response.data.message); // Log success message
                // After deletion, refresh the employee list
                readEmployeeDetails();
            })
            .catch((error) => {
                console.error("Axios Error: ", error);
            });
    }};


  useEffect(() => {
    setFilteredData(
      data.filter((employee) =>
      employee.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.eroll.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.nic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.number.includes(searchQuery)
      )
    );
  }, [searchQuery, data]);


    const Header = () => {
        return (
          <div className="header">
            <div className="Pro-header-component"><Link to = '/eregistor'>Employee Register </Link></div>
            <div className="Pro-header-component"><Link to = '/emdetails'>Employee Details </Link></div>
            <div className="Pro-header-component"><Link to = '/cusdetails'>Customer Details </Link></div>
            <div className="Pro-header-component"><Link to = '/eprofile'>Profile </Link></div>
          </div>
        );
      }


    return (

        <div> <Header/>{Header}

        <center><br/><h2>Employee Details</h2> </center>

        <div className='search-container'>
  <input
    type="text"
    className='search-input'
    placeholder="Search"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  <i className='fa fa-search search-icon'></i>
</div>
        <div className='dex'>
            <div className='dexa'>
                {filteredData.length ? (
                    <div className="tbx">
                        <table>
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Full Name</th>
                                    <th>E-mail</th>
                                    <th>Address</th>
                                    <th>Phone No</th>
                                    <th>NIC</th>
                                    <th>Employee Roll</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((employee, index) => (
                                    <tr key={index}>
                                        <td>{employee.username}</td>
                                        <td>{employee.fullname}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.address}</td>
                                        <td>{employee.number}</td>
                                        <td>{employee.nic}</td>
                                        <td>{employee.eroll}</td>
                                        <td>
                                            <button onClick={() => handleDelete(employee._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No matching records found...</p>
                )}
            </div>
        </div>
        </div>
    );
}

export default EmDetails;
