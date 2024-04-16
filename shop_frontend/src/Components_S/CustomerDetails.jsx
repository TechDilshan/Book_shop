import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css_ss/details.css';
import { Link } from "react-router-dom";

function CustomerDetails() {

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const readCustomerDetails = () => {
      axios
          .get('http://localhost:5000/auth/readCustomerDetails')
          .then((response) => {
              setData(response.data.response);
              setFilteredData(response.data.response);
          })
          .catch((error) => {
              console.error("Axios Error: ", error);
          });
  };

  useEffect(() => {
    readCustomerDetails();
  }, []);

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

 
  useEffect(() => {
    setFilteredData(
      data.filter((cus) =>
        cus.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cus.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cus.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cus.number.includes(searchQuery)
      )
    );
  }, [searchQuery, data]);

  return (
    <div>
      <Header/>
      <center><br/><h2>Customer Details</h2> </center>
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
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Address</th>
                    <th>Phone No</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((cus, index) => (
                    <tr key={index}>
                      <td>{cus.username}</td>
                      <td>{cus.email}</td>
                      <td>{cus.address}</td>
                      <td>{cus.number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No matching records found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;
