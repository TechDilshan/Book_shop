import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../F_CSS/AdminFeedback.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import AdminFrame from './AdminFrame';
import FeedbackReport from './FeedbackReport';


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

         <div className="admin-options">
            <button className='admin-report' onClick={generateReport}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
               <path fill-rule="evenodd" d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 0 0 3 3h.27l-.155 1.705A1.875 1.875 0 0 0 7.232 22.5h9.536a1.875 1.875 0 0 0 1.867-2.045l-.155-1.705h.27a3 3 0 0 0 3-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0 0 18 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM16.5 6.205v-2.83A.375.375 0 0 0 16.125 3h-8.25a.375.375 0 0 0-.375.375v2.83a49.353 49.353 0 0 1 9 0Zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 0 1-.374.409H7.232a.375.375 0 0 1-.374-.409l.526-5.784a.373.373 0 0 1 .333-.337 41.741 41.741 0 0 1 8.566 0Zm.967-3.97a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H18a.75.75 0 0 1-.75-.75V10.5ZM15 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H15Z" clip-rule="evenodd" />
            </svg>

            Generate Report</button>
        
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
