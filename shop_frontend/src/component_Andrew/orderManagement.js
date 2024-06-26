import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components_D/PrintDocStyles_D.css';
import '../components_D/AdminStyle_D.css';
import Foot from '../footer';
import NaviPrintManager_D from '../components_D/NaviPrintManager_D';
import { jsPDF } from 'jspdf';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

export default function OrderDisplayAdmin() {
    const [allshippingorders, setAllShippingOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [fileUrls, setFileUrls] = useState([]);
    const [notificationsSent, setNotificationsSent] = useState([]);

    useEffect(() => {
        const fetchFileUrls = async () => {
            const urls = await Promise.all(allshippingorders.map(async (order) => {
                try {
                    const url = await getDownloadURL(ref(storage, files/${order.documentID}));
                    return { id: order.documentID, url };
                } catch (error) {
                    console.error('Error fetching file URL:', error);
                    return null;
                }
            }));
            setFileUrls(urls.filter(url => url !== null));
        };
        fetchFileUrls();
    }, [allprintingorders]);

    // Getting the data from the DB
    const getAllShippingOrders = () => {
        axios.get("http://localhost:3004/shipping/")
            .then((res) => {
                setAllhippingOrders(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    // Get data from the database
    useEffect(() => {
        getAllShippingOrders();
    }, []);

    // Function to format doubleSided field
    const formatDoubleSided = (doubleSided) => {
        return doubleSided ? "Double-Sided" : "Single-Sided";
    };

    // Function to generate PDF report
    const generatePDFReport = () => {
        const doc = new jsPDF();

        // y position for content
        let yPos = 10;
        let currentPage = 1;

        allprintingorders.forEach((paper, index) => {
            // Calculate space needed for one order
            let orderContent = Order ${index + 1}:\n;
            orderContent += User Email: ${paper.uEmail}\n;
            orderContent += Colour: ${paper.colour}\n;
            orderContent += No of copies: ${paper.copies}\n;
            orderContent += No of slides: ${paper.slides}\n;
            orderContent += Orientation: ${paper.orientation}\n;
            orderContent += Double/Single-Sided: ${formatDoubleSided(paper.doubleSided)}\n;
            orderContent += Paper Size: ${paper.paperSize}\n;
            orderContent += Other Requirements: ${paper.otherOptions}\n;
            orderContent += DocumentID: ${paper.documentID}\n;

            // Check if there is enough space to print the order on the current page
            const spaceNeeded = yPos + 85; // Height of one order + spacing
            const spaceAvailable = doc.internal.pageSize.height - 10; // Height of the page - padding
            if (spaceNeeded > spaceAvailable) {
                doc.addPage();
                currentPage++;
                yPos = 10; // Reset yPos for the new page
            }

            doc.rect(5, yPos - 5, 200, 80); // Add a frame around the content of each order

            doc.text(10, yPos, orderContent);   // Add the content to the PDF document

            yPos += 85; // Increase yPos for next content
        });

        doc.save(printing_orders_report.pdf); // Save PDF
    };

    // Function to handle search input change
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter printing orders based on search query
    const filteredPrintingOrders = searchQuery ? allprintingorders.filter(paper =>
        paper.uEmail.toLowerCase().includes(searchQuery.toLowerCase())
    ) : allprintingorders;

    const handleDownloadPDF = (url) => {
        window.open(url, '_blank');
    };

    // Function to handle sending notification to user
    const sendNotification = (index) => {
        const orderDetails = filteredPrintingOrders[index]; // Get the order details
        const userEmail = orderDetails.uEmail; // Extract the user email from orderDetails
        if (!notificationsSent.includes(userEmail)) {
            axios.post('http://localhost:3003/notifications/sendNotification', { orderDetails })
                .then(response => {
                    if (response && response.data && response.data.message) {
                        // Success case
                        alert(response.data.message);
                        setNotificationsSent([...notificationsSent, userEmail]);
                    } else {
                        // If response data is not as expected
                        throw new Error('Unexpected response format');
                    }
                })
                .catch(error => {
                    console.error('Error sending notification:', error);
                    // Error case
                    alert('Failed to send notification. Please try again.');
                });

            // Inform admin that notification has been sent
            alert(Notification sent to ${userEmail});

        } else {
            alert(Notification already sent to ${userEmail});
        }
    };


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
                            <th>PDF Download</th>
                            <th>Status</th> {/* New column for Status */}
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
                                <td>
                                    {fileUrls.map((file) => (
                                        file.id === paper.documentID ?
                                            <FontAwesomeIcon
                                                key={file.id}
                                                icon={faFilePdf}
                                                size="2x"
                                                color="red"
                                                onClick={() => handleDownloadPDF(file.url)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                            : null
                                    ))}
                                </td>
                                <td>
                                    <button className='btnAction' onClick={() => sendNotification(index)}>Completed</button>
                                </td>
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