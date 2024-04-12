import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../components_D/PrintDocStyles_D.css';
import Navi from '../Navi';
import Foot from '../footer';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import PrintOrderForm from '../components_D/PrintOrderRead_D';
import UpdateForm from '../components_D/PrintOrderUpdate_D';

function PriceTable() {
  const [userEmail, setUserEmail] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    uEmail: '', // fetch user email from the storage
    document: null,
    colour: 'blackWhite',
    copies: 1,
    slides: 1,
    orientation: 'portrait',
    doubleSided: false,
    singleSide: false,
    paperSize: 'A4',
    otherOptions: '',
    documentID: '',
  });
  const [allPaperSizes, setAllPaperSizes] = useState([]);
  const [allPrintOrders, setAllPrintOrders] = useState([]);
  const [latestPrintOrder, setLatestPrintOrder] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [updatePrintOrder, setUpdatePrintOrder] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    // If checkbox is clicked
    if (type === 'checkbox') {
      // If the clicked checkbox is singleS, uncheck doubleS and other way arround
      if (name === 'singleSide' && checked) {
        setFormData((prevData) => ({
          ...prevData,
          singleSide: true,
          doubleSided: false,
        }));
      } else if (name === 'doubleSided' && checked) {
        setFormData((prevData) => ({
          ...prevData,
          singleSide: false,
          doubleSided: true,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: checked,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true); // Set loading to true when submission starts

    // Upload document to Firebase
    const documentID = await uploadFile(formData.document);
    if (!documentID) {
      setLoading(false); // Reset loading state
      alert("Error in uploading document");
      return;
    }
  
    // Add userEmail to formData
    const formDataWithUserEmail = {
      ...formData,
      documentID: documentID,
    };
  
    axios.post('http://localhost:3003/printorders/add', formDataWithUserEmail)
      .then((response) => {
        console.log(response.data);
        setLoading(false); // Reset loading state
        alert("Printing Order Placed Successfully");
        // Reset form data
        setFormData({
          uEmail: '', // fetch email from storage
          document: null,
          colour: 'blackWhite',
          copies: 1,
          slides: 1,
          orientation: 'portrait',
          doubleSided: false,
          singleSide: false,
          paperSize: 'A4',
          otherOptions: '',
          documentID: '',
        });
        // Fetch latest printing order data after successful submission
        fetchLatestPrintOrder();
      })
      .catch((error) => {
        setLoading(false); // Reset loading state
        console.error('Error:', error);
        alert("Error in placing print order");
      });
  };
  
  const uploadFile = async (file) => {
    if (!file) return null;
    const fileID = v4();
    const fileRef = ref(storage, `files/${fileID}`);

    try {
      await uploadBytes(fileRef, file);
      return fileID;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleInputChangeFile = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      document: file,
    }));
  };

  useEffect(() => {
    const userEmail = sessionStorage.getItem('userEmail');
    setUserEmail(userEmail);
    setFormData((prevData) => ({
      ...prevData,
      uEmail: userEmail,
  }));

    // Fetch paper sizes data
    axios.get("http://localhost:3003/printprice/")
      .then((response) => {
        // Group data by paper size
        const groupedData = groupData(response.data);
        setAllPaperSizes(groupedData);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const handleFormToggle = () => {
    if (userEmail) {
      setShowForm(!showForm);
    } else {
      alert("You need to log in to place an order.");
    }
  };

  // Function to group data by paper size
  const groupData = (data) => {
    const groupedData = {};
    data.forEach((item) => {
      if (!groupedData[item.paperSize]) {
        groupedData[item.paperSize] = {
          blackAndWhite_single: '-',
          blackAndWhite_double: '-',
          coloured_single: '-',
          coloured_double: '-',
        };
      }
      const { colour, side, price } = item;
      // Update the relavent price based on colour and side
      if (colour === 'Black and White' && side === 'Single-Sided') {
        groupedData[item.paperSize].blackAndWhite_single = `Rs.${price}`;
      } else if (colour === 'Black and White' && side === 'Double-Sided') {
        groupedData[item.paperSize].blackAndWhite_double = `Rs.${price}`;
      } else if (colour === 'Coloured' && side === 'Single-Sided') {
        groupedData[item.paperSize].coloured_single = `Rs.${price}`;
      } else if (colour === 'Coloured' && side === 'Double-Sided') {
        groupedData[item.paperSize].coloured_double = `Rs.${price}`;
      }
    });
    return groupedData;
  };

  const fetchLatestPrintOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:3003/printorders/latest/${sessionStorage.getItem('userEmail')}`);
      setLatestPrintOrder(response.data.printOrder);
      setDataFetched(true);
    } catch (error) {
      console.error('Error fetching latest print order:', error);
    }
  };

  const handleViewOrderClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3003/printorders/latest/${sessionStorage.getItem('userEmail')}`
      );
      const latestPrintOrderData = response.data.printOrder;
      setLatestPrintOrder(latestPrintOrderData);
      setDataFetched(true);
    } catch (error) {
      console.error('Error fetching latest print order:', error);
    }
  };

  useEffect(() => {
    // Fetch all print orders
    axios.get("http://localhost:3003/printorders")
      .then(response => {
        setAllPrintOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching print orders:', error);
      });
  }, []);
  
    // Function to handle update button click
    const handleUpdateClick = (printOrder) => {
        setShowForm(true);
        setUpdatePrintOrder(printOrder);
    };

    // Function to handle update form submission
    const handleUpdateSubmit = (updatedData) => {
        axios.put(`http://localhost:3003/printorders/update/${updatePrintOrder._id}`, updatedData)
            .then(response => {
                console.log(response.data);
                alert("Print Order Updated Successfully");
                setShowForm(false);// Hide the update form after successful one
                fetchLatestPrintOrder();// Fetch latest one after successful update
            })
            .catch(error => {
                console.error('Error updating order:', error);
                alert("Error updating order");
            });
    };

    // show the update form if showForm is true
    if (showForm && updatePrintOrder) {
        return (
            <UpdateForm printOrder={updatePrintOrder} onUpdate={handleUpdateSubmit} />
        );
    }

  return (
    <div>
      <div>
        <Navi/>
      </div>
      {!showForm ? (
        <div id="pricetble">
          <h1 className='priceChartTopic'>Printing Price Chart</h1>
          <table className="userchart">
            <thead>
              <tr>
                <th>Paper Size</th>
                <th>Black & White - Single-Sided</th>
                <th>Black & White - Double-Sided</th>
                <th>Coloured - Single-Sided</th>
                <th>Coloured - Double-Sided</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(allPaperSizes).map(([paperSize, prices], index) => (
                <tr key={index}>
                  <td>{paperSize}</td>
                  <td>{prices.blackAndWhite_single}</td>
                  <td>{prices.blackAndWhite_double}</td>
                  <td>{prices.coloured_single}</td>
                  <td>{prices.coloured_double}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {userEmail && <button onClick={handleFormToggle} className= 'btnPlace' >Place Order</button>}
          {!userEmail && (
            <center>
            <p>You need to <Link to="/login" className='btnUpdate_D'>Sign Up</Link> to place an order.</p>
            </center>
          )}
        </div>
      ) : (
        <div id="formPorder">
          <h2 className='topicMain'>Print Request Form</h2>
          <button onClick={handleFormToggle} className='btnViewChart' >View Price Chart</button>
          <form onSubmit={handleSubmit}>
            <label htmlFor="document" className='topicSubs'>Upload Document (PDF/JPG): </label>
                    <input
                      type="file"
                      id="document"
                      name="document"
                      className='style4filechoosing'
                      accept=".pdf, .jpg"
                      onChange={handleInputChangeFile}
                      required
                    />
                    <br/>

                    <label htmlFor="colour" className='topicSubs'>Type: </label>
                    <select
                      id="colour"
                      name="colour"
                      className='boxesforInSe_D'
                      value={formData.colour}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Colour</option>
                      <option value="Black and White">Black & White</option>
                      <option value="Coloured">Coloured</option>
                    </select>
                    <br/>

                    <label htmlFor="copies" className='topicSubs'>Number of Copies: </label>
                    <input
                      type="number"
                      id="copies"
                      name="copies"
                      className='boxesforInSe_D'
                      value={formData.copies}
                      onChange={handleInputChange}
                      min="1"
                      required
                    />
                    <br/>

                    <label htmlFor="slides" className='topicSubs'>Number of Slides: </label>
                    <input
                      type="number"
                      id="slides"
                      name="slides"
                      className='boxesforInSe_D'
                      value={formData.slides}
                      onChange={handleInputChange}
                      min="1"
                      required
                    />
                    <br/>

                    <label htmlFor="orientation" className='topicSubs'>Orientation: </label>
                    <select
                      id="orientation"
                      name="orientation"
                      className='boxesforInSe_D'
                      value={formData.orientation}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Orientation</option>
                      <option value="Portrait">Portrait</option>
                      <option value="Landscape">Landscape</option>
                    </select>
                    <br/>
                    <table>
                      <td>
                        <label>
                          Double-Sided
                          <input
                            type="checkbox"
                            className='dSide'
                            id="doubleSided"
                            name="doubleSided"
                            checked={formData.doubleSided}
                            onChange={handleInputChange}
                          />
                      </label>
                      </td>
                      <td>
                        <label>
                          Single-Sided
                            <input
                              type="checkbox"
                              className='singleS'
                              id="singleSide"
                              name="singleSide"
                              checked={formData.singleSide}
                              onChange={handleInputChange}
                            />
                      </label>
                      </td>
                    </table>
                    <br/> 

                    <label htmlFor="paperSize" className='topicSubs'>Paper Size: </label>
                    <select
                      id="paperSize"
                      name="paperSize"
                      className='boxesforInSe_D'
                      value={formData.paperSize}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="A1">A1</option>
                      <option value="A2">A2</option>
                      <option value="A3">A3</option>
                      <option value="A4">A4</option>
                      <option value="A6">A6</option>
                      <option value="A7">A7</option>
                      <option value="A8">A8</option>
                    </select>
                    <br/>

                    <label htmlFor="otherOptions" className='topicSubs'>Other Options: </label>
                      < textarea rows="10" cols="12"
                        id="otherOptions"
                        name="otherOptions"
                        className='boxesforInSe_D'
                        value={formData.otherOptions}
                        onChange={handleInputChange}
                    />
                    <br/>
                    <button type="submit" className='btnSub'>
                      {loading ? <div className="spinner"></div> : "Submit Print Request"}
                    </button>
          </form>
        </div>
      )}
      {latestPrintOrder && (
        <div>
          <PrintOrderForm printOrder={latestPrintOrder} onUpdate={handleUpdateSubmit} allPaperSizes={allPaperSizes} />
          {/* Render the update button only for the latest print order */}
          <button className='btnPlace2' onClick={() => handleUpdateClick(latestPrintOrder)}>Update</button>
        </div>
      )}
      <br/><br/>
      <div>
        <Foot/>
      </div>
    </div>
  );
}

export default PriceTable;
