import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css_ss/details.css';
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';

function EmployeePaySheet() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paySheetData, setPaySheetData] = useState(null);

    useEffect(() => {
        const userEmail = sessionStorage.getItem('userEmail');
        if (!userEmail) {
            setError("User email not found in session");
            setLoading(false);
            return;
        }

        axios.get(`http://localhost:5000/auth/getpaysheet?`, {
            email: userEmail
        })
            .then((response) => {
                setPaySheetData(response.data.response);
                setLoading(false);
                console.log(response)
            })
            .catch((error) => {
                console.error("Axios Error: ", error);
                setError("Failed to fetch pay sheet data");
                setLoading(false);
            });
    }, []);

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        if (paySheetData && paySheetData.length > 0) {
            let yPos = 10;
            paySheetData.forEach((entry, index) => {
                doc.text(`Entry ${index + 1}:`, 10, yPos);
                doc.text(`Date: ${entry.presentDate}`, 20, yPos += 10);
                doc.text(`Per Hour Salary: ${entry.perHourSalary}`, 20, yPos += 10);
                doc.text(`Per Day Salary: ${entry.perDaySalary}`, 20, yPos += 10);
                yPos += 10; // Increase vertical position for next entry
            });
        }

        doc.save("paySheet.pdf");
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : paySheetData && paySheetData.length > 0 ? (
                <div>
                    {paySheetData.map((entry, index) => (
                        <div key={index} className="user-details-table">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Date:</td>
                                        <td>{entry.presentDate}</td>
                                    </tr>
                                    <tr>
                                        <td>Per Hour Salary:</td>
                                        <td>{entry.perHourSalary}</td>
                                    </tr>
                                    <tr>
                                        <td>Per Day Salary:</td>
                                        <td>{entry.perDaySalary}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No data available</p>
            )}

            <button
                className="Po_PDf"
                onClick={handleDownloadPDF}
            >
                Download PDF
            </button>
        </div>
    );

}

export default EmployeePaySheet;
