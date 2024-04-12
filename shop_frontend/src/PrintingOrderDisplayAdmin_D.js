import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PrintDocStyles_D.css';
import './AdminStyle_D.css';
import Foot from './footer';
import NaviPrintManager_D from './NaviPrintManager_D';

// Rename the function to start with an uppercase letter
export default function OrderDisplayAdmin(){
    const [allprintingorders, setAllPrintingOrders] = useState([]);

    // Getting the data from the DB
    const getAllPrintingOrders = () =>{
        axios.get("http://localhost:3003/printorders/")
            .then((res) => {
                setAllPrintingOrders(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    };
    
    // Get data from the database
    useEffect(() => {
        getAllPrintingOrders();
    }, []);

    // Function to format doubleSided field
    const formatDoubleSided = (doubleSided) => {
        return doubleSided ? "Double-Sided" : "Single-Sided";
    };

    return(
        <div>
            <div>
                <NaviPrintManager_D/>
            </div>
            <div>
                <h1 className='AllprintTop'>All Printing Orders</h1>
                <button className='btngeneraterep_D'>Generate Report</button>
                <table className="allPrintingOrders">
                    <thead>
                        <tr>
                            <th>User Email</th>
                            <th>Colour</th>
                            <th>No of copies</th>
                            <th>No of slides</th>
                            <th>Orientation</th>
                            <th>Double/Single-Sided</th>
                            <th>Paper Size</th>
                            <th>Other Requirements</th>
                            <th>DocumentID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allprintingorders.map((paper, index) => (
                            <tr key={index}>
                                <td>{paper.uEmail}</td>
                                <td>{paper.colour}</td>
                                <td>{paper.copies}</td>
                                <td>{paper.slides}</td>
                                <td>{paper.orientation}</td>
                                <td>{formatDoubleSided(paper.doubleSided)}</td>
                                <td>{paper.paperSize}</td>
                                <td>{paper.otherOptions}</td>
                                <td>{paper.documentID}</td>
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
