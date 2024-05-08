import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../F_CSS/AdminFeedback.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import AdminFrame from './AdminFrame';
import FeedbackReport from './FeedbackReport';


const AdminReferencePage = () => {

   const [adminName] = useState("Admin");
   const [feedbackList, setFeedbackList] = useState([]);
   
   const [productIdFilter, setProductIdFilter] = useState(null);
   
   



   useEffect(() => {
      fetchFeedback();
   }, []);



   const fetchFeedback = async () => {

      try {
         const response = await axios.get('http://localhost:3001/api/getreview');
         setFeedbackList(response.data);
         console.log(response.data);    
      
      
      } catch (error) {
         console.error('Error fetching feedback:', error);
      }


   };



   const handleDeleteFeedback = async (id) => {
      try {
         await axios.delete(`http://localhost:3001/api/deletereview/${id}`);
         alert("Review deleted successfully!");
         fetchFeedback();
     
      } catch (error) {
         console.error('Error deleting feedback:', error);
      }
  
   };




   const handleProductIdFilterChange = (event) => {
      const productId = parseInt(event.target.value);
      setProductIdFilter(productId);
  
   };



//    const filteredFeedback = feedbackList.filter((item) => 
//       (!searchRating || item.rating === searchRating) &&
//       (!productIdFilter || item.productId === productIdFilter)
   
//    );



   

   return (

      

      <div className="admin-dashboard">
{/* 
         <div className="admin-options">
            <button className='admin-report' onClick={generateReport}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
               <path fill-rule="evenodd" d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 0 0 3 3h.27l-.155 1.705A1.875 1.875 0 0 0 7.232 22.5h9.536a1.875 1.875 0 0 0 1.867-2.045l-.155-1.705h.27a3 3 0 0 0 3-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0 0 18 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM16.5 6.205v-2.83A.375.375 0 0 0 16.125 3h-8.25a.375.375 0 0 0-.375.375v2.83a49.353 49.353 0 0 1 9 0Zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 0 1-.374.409H7.232a.375.375 0 0 1-.374-.409l.526-5.784a.373.373 0 0 1 .333-.337 41.741 41.741 0 0 1 8.566 0Zm.967-3.97a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H18a.75.75 0 0 1-.75-.75V10.5ZM15 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H15Z" clip-rule="evenodd" />
            </svg>

            Generate Report</button>
        
         </div> */}

         <br />
       
       
         

            
            
            <div>

               <h2 className='feedback-heading'>Feedback List</h2>
               
               
               <table className='feedback-table'>
                 
                  <thead>
                     <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Suggestions/Issues</th>
                        <th>company Feedback</th>

                        <th className='admtable-heading'>Action</th> 
                     </tr>
                  
                  </thead>
                  
                  <tbody>
                  
                     {feedbackList.map((feedback) => (
                        feedback.suggestions && (
                        <tr key={feedback._id}>
                           <td>{feedback.name}</td>
                           <td>{feedback.email}</td>
                           <td>{feedback.purchaseDate}</td>
                           <td>{feedback.suggestions}</td>
                           <td>{feedback.companyFeedback}</td>
                          
                          
                           
                              <td>
                                 <button className='admdelete-button' onClick={() => handleDeleteFeedback(feedback._id)}>
                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="w-6 h-6">
                                    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                 </svg>


                                 </button>
                              </td>
                           
                        
                        </tr>
                  
                      )))}
                 
                 
                 
                  </tbody>
               
               
               
               </table>
           
           
           
           
           
            </div>
         </div>

         
      
   );
};

export default AdminReferencePage;
