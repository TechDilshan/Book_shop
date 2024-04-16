import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../F_CSS/AdminFeedback.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import AdminFrame from './AdminFrame';


const AdminFeedbackPage = () => {

   const [adminName] = useState("Admin");
   const [feedbackList, setFeedbackList] = useState([]);
   const [searchRating, setSearchRating] = useState(null);
   const [productIdFilter, setProductIdFilter] = useState(null);
   const [starCounts, setStarCounts] = useState({});
   const [totalAverage, setTotalAverage] = useState(0);
   const [isGeneratingReport, setIsGeneratingReport] = useState(false);



   useEffect(() => {
      fetchFeedback();
   }, []);



   const fetchFeedback = async () => {

      try {
         const response = await axios.get('http://localhost:3001/api/getreview');
         setFeedbackList(response.data);
         const counts = calculateStarCounts(response.data);
         setStarCounts(counts);
         setTotalAverage(calculateTotalAverage(response.data));
      
      
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



   const calculateStarCounts = (feedbackData) => {
      const counts = {
         1: 0,
         2: 0,
         3: 0,
         4: 0,
         5: 0
      };


      feedbackData.forEach((item) => {
         counts[item.rating] += 1;
      });

      return counts;
   };



   const calculateTotalAverage = (feedbackData) => {
      const totalStars = feedbackData.reduce((acc, item) => acc + item.rating, 0);
      const starCounts = feedbackData.length;

      const totalAverage = totalStars / starCounts;
      return totalAverage.toFixed(1);
   
   };



   const handleSearchRating = (rating) => {
      setSearchRating(rating);
   
   };



   const handleProductIdFilterChange = (event) => {
      const productId = parseInt(event.target.value);
      setProductIdFilter(productId);
  
   };



   const filteredFeedback = feedbackList.filter((item) => 
      (!searchRating || item.rating === searchRating) &&
      (!productIdFilter || item.productId === productIdFilter)
   
   );



   const generateReport = () => {

      setIsGeneratingReport(true);
      console.log('Generating report...');
     
      const doc = new jsPDF();
      
      const reportContent = document.getElementById('report-content');
     
     
      html2canvas(reportContent).then((canvas) => {
        
         const imgData = canvas.toDataURL('image/png');
         const imgWidth = 210;
         const imgHeight = (canvas.height * imgWidth) / canvas.width;
         doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
         doc.save('feedback_report.pdf');
         setIsGeneratingReport(false);
         
         console.log('Report generated successfully!');
      });
   
   
   };





   return (

      

      <div className="admin-dashboard">

         <AdminFrame />

         <h2 className='admin-heading'>Welcome, {adminName}</h2>
         
         
         <button className='admlogout-button'>Logout</button>

         <div className="admin-options">
            <button className='admin-report' onClick={generateReport}>Generate Report</button>
        
         </div>

         <br />
       
       
         <div>

            <input
                  type="number"
                  placeholder="Filter by Product ID..."
                  className='admsearch-input'
                  onChange={handleProductIdFilterChange}
            />


            <div className="admsearch-rating">
               <button onClick={() => handleSearchRating(null)}>All</button>
               <button onClick={() => handleSearchRating(1)}>1 Star</button>
               <button onClick={() => handleSearchRating(2)}>2 Stars</button>
               <button onClick={() => handleSearchRating(3)}>3 Stars</button>
               <button onClick={() => handleSearchRating(4)}>4 Stars</button>
               <button onClick={() => handleSearchRating(5)}>5 Stars</button>
          
            </div>
            
         </div>

         <div id='report-content' className='feedback-list'>

               {Object.keys(starCounts).map((rating, index) => (
                  <p key = {index} className='star-count'>
                     {rating} star Count: {starCounts[rating]}
                  </p>
               ))}


            <p className='admtotal-average'>Total Average: {totalAverage}</p>
            
            
            <div>

               <h2 className='feedback-heading'>Feedback List</h2>
               
               
               <table className='feedback-table'>
                 
                  <thead>
                     <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Rating</th>
                        <th>Product ID</th>
                        <th>Comment</th>

                        {!isGeneratingReport && <th className='admtable-heading'>Action</th> }
                     </tr>
                  
                  </thead>
                  
                  <tbody>
                  
                     {filteredFeedback.map((feedback) => (
                        
                        <tr key={feedback._id}>
                           <td>{feedback.name}</td>
                           <td>{feedback.email}</td>
                           <td>{feedback.rating}</td>
                           <td>{feedback.productId}</td>
                           <td>{feedback.comment}</td>
                          
                          
                           {!isGeneratingReport && (
                              <td>
                                 <button className='admdelete-button' onClick={() => handleDeleteFeedback(feedback._id)}>Delete</button>
                              </td>
                           )}
                        
                        </tr>
                  
                      ))}
                 
                 
                 
                  </tbody>
               
               
               
               </table>
           
           
           
           
           
            </div>
         </div>

         
      </div>
   );
};

export default AdminFeedbackPage;
