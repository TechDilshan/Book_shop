import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PrintDocStyles_D.css';
import NaviPrintManager_D from './NaviPrintManager_D';
import Foot from './footer';

function PriceTable() {
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
    console.log(groupedData);
    return groupedData;
};

  return (
    <div>
      <div>
        <NaviPrintManager_D/>
      </div>
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
        </div>
      <div>
        <Foot/>
      </div>
      </div>
  );
}

export default PriceTable;
