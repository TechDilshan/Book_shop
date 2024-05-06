import React, { useState } from 'react';
import axios from 'axios';
import '../components_D/PrintOrderReadStyle_D.css';
import logo from '../image/logo.jpg';
import { Link } from 'react-router-dom';

function PrintOrderForm({ printOrder, onUpdate, allPaperSizes }) {
  const [showPayNow, setShowPayNow] = useState(false);

    const handleDelete = () => {
        const confirmation = window.confirm("Are you sure you want to delete this order?");
        if (confirmation) {
          axios.delete(`http://localhost:3001/printorders/delete/${printOrder._id}`)
            .then(response => {
              console.log(response.data);
              alert("Print Order Deleted Successfully");
              window.location.reload();
            })
            .catch(error => {
              console.error('Error deleting order:', error);
              alert("Error deleting order");
            });
        }
      };

  if (!printOrder) {
    return null;
  }

  const handlePayNowClick = () => {
    setShowPayNow(true);
  };

  const calculatePricePerCopy = () => {
    let pricePerCopy = 0;
    const { colour, doubleSided, paperSize, slides } = printOrder;
    const prices = allPaperSizes[paperSize];

    if (!prices) {
        console.error(`Prices not found for paper size ${paperSize}`);
        return 0;
    }

    if (isNaN(slides)) {
        console.error(`Invalid number of slides: ${slides}`);
        return 0;
    }

    let pricePerPage = 0;
    let numPages = doubleSided ? Math.ceil(slides / 2) : slides; //round up double

    if (colour === 'Black and White') {
        const priceString = doubleSided ? prices.blackAndWhite_double : prices.blackAndWhite_single;
        const match = priceString.match(/\d+/);
        if (match) {
            pricePerPage = parseInt(match[0]);
        } else {
            console.error(`Invalid price: ${priceString}`);
            return 0;
        }
    } else if (colour === 'Coloured') {
        const priceString = doubleSided ? prices.coloured_double : prices.coloured_single;
        const match = priceString.match(/\d+/);
        if (match) {
            pricePerPage = parseInt(match[0]);
        } else {
            console.error(`Invalid price: ${priceString}`);
            return 0;
        }
    }
    
    pricePerCopy = pricePerPage * numPages;

    return pricePerCopy;
};


const calculateTotalPrice = () => {
    const { copies } = printOrder;
    const pricePerCopy = calculatePricePerCopy();

    if (isNaN(pricePerCopy)) return 0;
    
    const totalPrice = pricePerCopy * copies;

    return totalPrice;
};

  return (
    <div>
        <div id="formRead">
        <img src={logo} alt="Logo" className="logoRead_D" />
            <h2 className="TopicRead">Your Submitted Printing Order</h2>
              <table className='tbleRead_D'>
                  <td className='firstdata_D'>User Email:</td>
                  <td>{printOrder.uEmail}</td><tr></tr>

                  <td className='firstdata_D'>Colour:</td>
                  <td>{printOrder.colour}</td><tr></tr>

                  <td className='firstdata_D'>Number of Copies:</td>
                  <td>{printOrder.copies}</td><tr></tr>

                  <td className='firstdata_D'>Number of Slides:</td>
                  <td>{printOrder.slides}</td><tr></tr>

                  <td className='firstdata_D'>Orientation:</td>
                  <td>{printOrder.orientation}</td><tr></tr>

                  <td className='firstdata_D'>Double/Single-Sided:</td>
                  <td>{printOrder.doubleSided ? "Double-Sided" : "Single-Sided"}</td><tr></tr>

                  <td className='firstdata_D'>Paper Size:</td>
                  <td>{printOrder.paperSize}</td><tr></tr>

                  <td className='firstdata_D'>Other Options:</td>
                  <td>{printOrder.otherOptions}</td><tr></tr>

                  <td><button className='btnDelete_D' onClick={handleDelete}>Delete</button></td>
                  <td><button className='btnPayNow_D' onClick={handlePayNowClick}>PayNow</button></td>
              </table>
        </div>
        {showPayNow && (
              <div id="formPayNow_D" >
                    <img src={logo} alt="Logo" className="logo_D" />
                    <h2 className="Topicpay_D">Summary of Your Printing Order</h2>

                  <table className='tblePay_D'>
                    <td className='firstdata_D'>Paper Size:</td>
                    <td>{printOrder.paperSize}</td><tr></tr>

                    <td className='firstdata_D'>Colour:</td>
                    <td>{printOrder.colour}</td><tr></tr>

                    <td className='firstdata_D'>Double/Single-Sided:</td>
                    <td>{printOrder.doubleSided ? "Double-Sided" : "Single-Sided"}</td><tr></tr>

                    <td className='firstdata_D'>Number of Copies:</td>
                    <td>{printOrder.copies}</td><tr></tr>

                    <td className='firstdata_D'>Number of Slides:</td>
                    <td>{printOrder.slides}</td><tr></tr>

                    <td className='firstdata_D'>Price per Copy:</td>
                    <td>Rs.{calculatePricePerCopy()}</td><tr></tr>

                    <td className='firstdata_D'>Total Price:</td>
                    <td>Rs.{calculateTotalPrice()}</td><tr></tr>

                    <td></td>
                    <td>
                      <Link to="/Shippingscreen">
                      <button className='btnPayNow_D'>PayNow</button>
                      </Link>
                      </td>
                  </table>
              </div>
        )}
    </div>
    
  );
}

export default PrintOrderForm;
