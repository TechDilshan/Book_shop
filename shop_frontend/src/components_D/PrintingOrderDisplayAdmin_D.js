import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components_D/PrintDocStyles_D.css';
import '../components_D/AdminStyle_D.css';
import Foot from '../footer';
import NaviPrintManager_D from '../components_D/NaviPrintManager_D';
import { jsPDF } from 'jspdf';

export default function OrderDisplayAdmin() {
    const [allprintingorders, setAllPrintingOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Getting the data from the DB
    const getAllPrintingOrders = () => {
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

    // Function to generate PDF report
    const generatePDFReport = () => {
        const doc = new jsPDF();

        // Initialize y position for content
        let yPos = 10;
        let currentPage = 1;

        allprintingorders.forEach((paper, index) => {
            // Calculate space needed for the current order
            let orderContent = `Order ${index + 1}:\n`;
            orderContent += `User Email: ${paper.uEmail}\n`;
            orderContent += `Colour: ${paper.colour}\n`;
            orderContent += `No of copies: ${paper.copies}\n`;
            orderContent += `No of slides: ${paper.slides}\n`;
            orderContent += `Orientation: ${paper.orientation}\n`;
            orderContent += `Double/Single-Sided: ${formatDoubleSided(paper.doubleSided)}\n`;
            orderContent += `Paper Size: ${paper.paperSize}\n`;
            orderContent += `Other Requirements: ${paper.otherOptions}\n`;
            orderContent += `DocumentID: ${paper.documentID}\n\n`;

            // Calculate height needed for the order
            const orderHeight = doc.getTextDimensions(orderContent).h;

            // Check if order fits on current page, if not, add a new page
            if (yPos + orderHeight >= doc.internal.pageSize.height - 20) {
                doc.addPage();
                currentPage++;
                yPos = 10; // Reset yPos for the new page
            }

            // Add the content to the PDF document
            doc.text(10, yPos, orderContent);

            // Increase yPos for next content
            yPos += orderHeight + 70; // Add padding
        });

        // Save PDF
        doc.save(`printing_orders_report.pdf`);
    };

    // Function to handle search input change
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter printing orders based on search query
    const filteredPrintingOrders = searchQuery ? allprintingorders.filter(paper =>
        paper.uEmail.toLowerCase().includes(searchQuery.toLowerCase())
    ) : allprintingorders;

    return (
        <div>
            <div>
                <NaviPrintManager_D />
            </div>
            <div>
                <h1 className='AllprintTop'>All Printing Orders</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Search by User Email"
                        className='boxoutlines_D'
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    <button className='btngeneraterep_D' onClick={generatePDFReport}>Generate Report</button>
                </div>
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
                        {filteredPrintingOrders.map((paper, index) => (
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
                <Foot />
            </div>
        </div>
    );
}
