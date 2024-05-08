import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../F_CSS/AdminFeedback.css';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from  '../image/logo.jpg';



const styles = StyleSheet.create({


   page: {
     flexDirection: 'column',
     padding: 20,
   },

   logo: {
      position: 'absolute',
      top: 0,
      left: 10,
      width: 100, 
      height: 100, 
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
     padding: 10,
     borderRight: '1px solid #000',
   },

 
   topic: {
     fontSize: 18,
     fontStyle: 'Sans-serif',
     fontWeight: 'bold',
     marginLeft: 100,
     marginBottom: 30,
     color: 'blue', 
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

   const MyDocument = ({ data }) => (

      <Document>
        <Page size="A4" style={styles.page}>

        <Image src={logo} style={styles.logo} />

         
          <Text style={styles.topic}>Customer Reviews and Feedback List</Text>
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
                        <th className='admtable-heading'>Action</th>

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


                           <td>
                                 <button className='admdelete-button' onClick={() => handleDeleteFeedback(feedback._id)}>
                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="w-6 h-6">
                                    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                 </svg>


                                 </button>
                              </td>
                          

                        
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
