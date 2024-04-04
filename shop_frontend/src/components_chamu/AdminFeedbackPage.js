import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../F_CSS/AdminFeedback.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const AdminFeedbackPage = () => {

   const [adminName] = useState("Admin");
   const [feedbackList, setFeedbackList] = useState([]);
   const [searchRating, setSearchRating] = useState(null);
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



   const handleSearchChange = (event) => {

      const rating = parseInt(event.target.value);
      setSearchRating(rating);
 
    };



   const filteredFeedback = searchRating
      ? feedbackList.filter((item) => item.rating === searchRating)
      : feedbackList;

   
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

         <h2>Welcome, {adminName}</h2>

         <button>Logout</button>
         
         <div className="admin-options">
            <button onClick={generateReport}>Generate Report</button>
            
         </div>

         <div>

            <input
               type="number"
               placeholder="Search by rating..."
               min="1"
               max="5"
               className='search-input'
               onChange={handleSearchChange}
            />
         </div>

         <div id='report-content'>

            {Object.keys(starCounts).map((rating, index) => (
                <p key = {index}>
                    {rating} star Count: {starCounts[rating]}
                </p>
                        
            ))}
            
        


            <p>Total Average: {totalAverage}</p>


         <div>

            <h2>Feedback List</h2>

            <table className='feedback-table'>
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Rating</th>
                     <th>Comment</th>

                     {!isGeneratingReport && <th>Action</th> }
                 
                  </tr>
               </thead>

               <tbody>

                  {filteredFeedback.map((feedback) => (

                     <tr key={feedback._id}>

                        <td>{feedback.name}</td>
                        <td>{feedback.email}</td>
                        <td>{feedback.rating}</td>
                        <td>{feedback.comment}</td>

                        {!isGeneratingReport && (

                        <td>

                            
                           <button className='delete-button' onClick={() => handleDeleteFeedback(feedback._id)}>Delete</button>
                            
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
