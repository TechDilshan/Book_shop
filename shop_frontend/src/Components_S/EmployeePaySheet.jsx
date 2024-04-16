import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css_ss/details.css';
import { Link } from "react-router-dom";

function EmployeePaySheet() {


    const [data, setData] = useState([]);
    const userEmail = sessionStorage.getItem('email');

  
    const getpaysheet = () => {
        axios
            .get('http://localhost:5000/auth/getpaysheet', {
                params: {
                    userEmail: userEmail
                }
            })
            .then((response) => {
                setData(response.data.response);
                console.log(response.data)
            })
            .catch((error) => {
                console.error("Axios Error: ", error);
            });
    };
  
    useEffect(() => {
        getpaysheet();
    }, []);


  return (
    <div>

{data ? (
                        <div className="user-details-table">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Date:</td>
                                        <td>{data?.presentDate}</td>
                                    </tr>
                                    <tr>
                                        <td>Per Hour Salary: </td>
                                        <td>{data?.perHourSalary}</td>
                                    </tr>
                                    <tr>
                                        <td>Per Day Salary::</td>
                                        <td>{data?.perDaySalary}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    ) : (
                        <p>Loading...</p>
                    )}
    </div>
  )
}

export default EmployeePaySheet