import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PrintDocStyles_D.css';
import Navi from './Navi';
import Foot from './footer';

function PriceTable() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    uEmail: '',
    document: null,
    colour: 'blackWhite',
    copies: 1,
    slides: 1,
    orientation: 'portrait',
    doubleSided: false,
    singleSide: false,
    paperSize: 'A4',
    otherOptions: '',
  });

  //Deleting a paper size
  const handleDelete = (printOrderID) => {
    const confirmation = window.confirm("Are you sure you want to delete your printing order?");
    if (confirmation) {
        axios.delete(`http://localhost:3003/printorders/delete/${printOrderID}`)
            .then(() => {
                alert("Print Order Deleted Successfully");
            })
            .catch((err) => {
                alert(err.message);
            });
    } else {
        // User clicked cancel, do nothing
    }
};

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      doubleSided: name === 'doubleSided' ? checked : false,
      singleSide: name === 'singleSide' ? checked : false,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

     // Add userEmail to formData
     const formDataWithUserEmail = {
      ...formData,
      uEmail: userEmail  // Add userEmail here
    };

    console.log(formData);
    axios.post('http://localhost:3003/printorders/add', formDataWithUserEmail)
      .then((response) => {
        console.log(response.data);
        alert("Printing Order Placed Successfully");
        // Reset form data
        setFormData({
          document: null,
          colour: 'blackWhite',
          copies: 1,
          slides: 1,
          orientation: 'portrait',
          doubleSided: false,
          singleSide: false,
          paperSize: 'A4',
          otherOptions: '',
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Error in placing print order");
      });
  };

  const [allPaperSizes, setAllPaperSizes] = useState([]);

  // Get data from the database
  useEffect(() => {
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
      // Update the corresponding price based on colour and side
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

  const handleFormToggle = () => {
    setShowForm(!showForm);
  };

  const userEmail = sessionStorage.getItem('userEmail');
  console.log(userEmail);


  //fetching the most recent entry of a users order
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail) {
      axios.get(`http://localhost:3003/printorders/latest/${userEmail}`)
        .then((response) => {
          setOrderDetails(response.data.printOrder);
        })
        .catch((error) => {
          console.error('Error fetching order details:', error);
        });
    }
  }, []);

  return (
    <div>
      <div>
        <Navi/>
      </div>
      {showForm ? (
        <div id="form1">
          <h2 className='topicMain'>Print Request Form</h2>
          <button onClick={handleFormToggle} className='btnViewChart' >View Price Chart</button>
          <form onSubmit={handleSubmit}>
            <label htmlFor="document" className='topicSubs'>Upload Document (PDF/JPG): </label>
                    <input
                      type="file"
                      id="document"
                      name="document"
                      accept=".pdf, .jpg"
                      onChange={handleInputChange}
                      
                    />
                    <br/>

                    <label htmlFor="colour" className='topicSubs'>Type: </label>
                    <select
                      id="colour"
                      name="colour"
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
                      value={formData.orientation}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Orientation</option>
                      <option value="Portrait">Portrait</option>
                      <option value="Landscape">Landscape</option>
                    </select>
                    <br/>

                    <label>
                    Double-Sided
                      <input
                        type="checkbox"
                        className='doubleS'
                        id="doubleSided"
                        name="doubleSided"
                        checked={formData.doubleSided}
                        onChange={handleInputChange}
                      />
                    </label>

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
                    <br/>

                    <label htmlFor="paperSize" className='topicSubs'>Paper Size: </label>
                    <select
                      id="paperSize"
                      name="paperSize"
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
                        value={formData.otherOptions}
                        onChange={handleInputChange}
                    />
                    <br/>
              <button type="submit" className='btnSub'>Submit Print Request</button>
          </form>
        </div>
      ) : (
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
          <button onClick={handleFormToggle} className= 'btnPlace' >Place Order</button>
        </div>
      )}
      <div>
        <Foot/>
      </div>
    </div>
  );
}

export default PriceTable;
