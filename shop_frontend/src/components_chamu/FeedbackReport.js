import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../F_CSS/AdminFeedback.css';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
   page: {
     flexDirection: 'column',
     padding: 20,
   },
   table: {
     width: '100%',
     border: '1px solid #000',
     borderCollapse: 'collapse',
     marginBottom: 20,
     fontSize: 12,
   },
   tableRow: {
     borderBottom: '1px solid #000',
   },
   tableCell: {
     padding: 8,
     borderRight: '1px solid #000',
   },
 
   topic: {
     fontSize: 18,
     fontWeight: 'bold',
     marginBottom: 20,
     color: '#333', 
     padding: 10, 
     marginTop: 20,
   },
 });


const AdminFeedbackPage = () => {

   const [adminName] = useState("Admin");
   const [feedbackList, setFeedbackList] = useState([]);
   const [searchRating, setSearchRating] = useState(null);
   const [productIdFilter, setProductIdFilter] = useState(null);
   const [starCounts, setStarCounts] = useState({});
   const [totalAverage, setTotalAverage] = useState(0);
   const [selectedCategory, setSelectedCategory] = useState('All');



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

   const MyDocument = ({ data }) => (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.topic}>Rathiy Intech Customer Reviews and Feedback List</Text>
          <View style={styles.table}>
            {data.map((row) => (
              <View key={row.id} style={styles.tableRow}>
                
                <Text style={styles.tableCell}> Product ID : {row.productId}</Text>
                <Text style={styles.tableCell}> Name : {row.name}</Text>
                <Text style={styles.tableCell}> Email : {row.email}</Text>
                <Text style={styles.tableCell}> Rating : {row.rating}</Text>
                <Text style={styles.tableCell}> Comment : {row.comment}</Text>
                


              </View>
            ))}
          </View>
        </Page>
      </Document>
    );






   return (

      

      <div className="admin-dashboard">

       
         <div >
         {selectedCategory && (
            <PDFDownloadLink document={<MyDocument data={filteredFeedback} />} fileName={`Reviews and Feedback.pdf`} className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-5 w-[150px] flex ">
              {({ blob, url, loading, error }) => (loading ? 'Generate Report' : 'Generate Report')}
            </PDFDownloadLink>
          )}

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
