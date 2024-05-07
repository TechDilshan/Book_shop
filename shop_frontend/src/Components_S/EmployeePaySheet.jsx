import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css_ss/paysheet.css';
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';

function EmployeePaySheet() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paySheetData, setPaySheetData] = useState(null);
    
    const [data, setData] = useState(null);
    const [salData, setSalData] = useState([]);
    const [sum, setSum] = useState('');


    useEffect(() => {
        const userEmail = sessionStorage.getItem('userEmail');
        if (!userEmail) {
            setError("User email not found in session");
            setLoading(false);
            return;
        }

        axios.get('http://localhost:5000/auth/getpaysheet', {
            params: {
                userEmail: userEmail
            }
        })
        .then((response) => {
            // Filter the response data based on userEmail
            const filteredData = response.data.response.filter(item => item.employeeEmail === userEmail);
            // Set the filtered pay sheet data to state
            setPaySheetData(filteredData);
            // Stop loading, as data fetching is complete
            setLoading(false);
            // Log the response for debugging
            console.log(response);
        })
            .catch((error) => {
                console.error("Axios Error: ", error);
                setError("Failed to fetch pay sheet data");
                setLoading(false);
            });


            axios
            .get('http://localhost:5000/auth/getEmployeeDetails', {
                params: {
                    userEmail: userEmail
                }
            })
            .then((response) => {
                setData(response.data.response);
                console.log(response)
            })
            .catch((error) => {
                console.error("Axios Error: ", error);
            });



            console.log(userEmail);


            axios
                .get('http://localhost:5000/auth/getEmployeeSalary', {
                    params: {
                        userEmail: userEmail
                    }
                })
                .then((response) => {
                    setSalData(response.data.response);
                    console.log(response.data.response);
    
                    const sum = response.data.response.reduce((acc, currentValue) => acc + currentValue, 0);
                    setSum(sum)
                    console.log("Total sum:", sum);
    
                })
                .catch((error) => {
                    console.error("Axios Error: ", error);
                });        
    }, []);



    const handleDownloadPDF = () => {
        const doc = new jsPDF();
    
        // Start position for the content
        let yPos = 20;
    
        // Add user details
        if (data) {
            doc.text(`Employee Name: ${data.fullname}`, 20, yPos);
            yPos += 10; // Increment yPos
        }
    
        // Add pay sheet data
        if (paySheetData && paySheetData.length > 0) {
            yPos += 10; // Add some space between user details and pay sheet data
            paySheetData.forEach((entry, index) => {
                doc.text(`Date: ${formatDate(entry.presentDate)}`, 20, yPos);
                doc.text(`Per Hour Salary: ${entry.perHourSalary}`, 20, yPos + 10);
                doc.text(`Per Day Salary: ${entry.perDaySalary}`, 20, yPos + 20);
                yPos += 30; // Increment yPos
            });
        }
    
        // Add total salary
        if (sum) {
            yPos += 10; // Add some space between pay sheet data and total salary
            doc.text(`Total Salary : Rs. ${sum}.00`, 20, yPos);
        }
    
        // Save the document
        doc.save("paySheet.pdf");
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); 
    };

    return (
        <div>
            <div className="top-info">

            {data ? (
                        <div className="user-details-table">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Employee Name</td>
                                        <td>{data?.fullname}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                    ) : (
                        <p>Loading...</p>
                    )}
                <table className='tblkll'>
                    <tbody>
                        <tr>
                            <td>Date</td>
                            <td>Per Hour Salary</td>
                            <td>Per Day Salary</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : paySheetData && paySheetData.length > 0 ? (
                <div>
                    {paySheetData.map((entry, index) => (
                        <div key={index} className="user-details-table">
                            <table className='hujbj'>
                                <tbody>
                                    <tr>
                                    <td>{formatDate(entry.presentDate)}</td>
                                        <td>{entry.perHourSalary}</td>
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
          <p>Total Salary : Rs. {sum}.00 </p>
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
