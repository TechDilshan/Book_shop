import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../F_CSS/Form.css';
import { FaStar } from 'react-icons/fa';

import StarRating from '../components_chamu/StarRating';
import { Link } from 'react-router-dom';


const FeedbackDisplay = () => {

    const loggedInUserEmail = "1234@gmail.com";

    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [starCounts, setStarCounts] = useState({});
    const [totalAverage, setTotalAverage] = useState(0);
    const [searchRating, setSearchRating] = useState(null);
    const [isRatingSelected, setIsRatingSelected] = useState(false);
        

    const handleDelete = (cusId) => {
        axios.delete(`http://localhost:3001/api/deletereview/${cusId}`)
          .then(() => {
            alert("Review deleted successfully!");
            getReviewDB();
         })
          .catch((err) => {
            alert(err.message);
          });
      };

      const getReviewDB = () =>{
        axios.get('http://localhost:3001/api/getreview')
            .then(response => {
                setFeedback(response.data);
                setLoading(false);
                const counts = calculateStarCounts(response.data);
                setStarCounts(counts);
                setTotalAverage(calculateTotalAverage(response.data));
            })
            .catch(error => {
                console.error('Error fetching feedback:', error);
                setLoading(false);
            });
    };

    

    useEffect(() => {
            getReviewDB();
    }, []);

    

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
        const totalAverage = totalStars / (starCounts);
        return totalAverage.toFixed(1);
    };




    const handleSearchChange = (event) => {
        const rating = parseInt(event.target.value);
        setSearchRating(rating);
    };

         

    const filteredFeedback = searchRating
        ? feedback.filter((item) => item.rating === searchRating)
        : feedback;





    
    // const data = {
    //     labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    //     datasets: [
    //         {
    //             label: 'Star Counts',
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)'
    //             ],
    //             borderColor: [
    //                 'rgba(255, 99, 132, 1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)'
    //             ],
    //             borderWidth: 1,
    //             data: Object.values(starCounts)
    //         }
    //     ]
    // };

    // const options = {
    //     scales: {
    //         x: {
    //             type : 'category'
    //         },

    //         y: {
    //             display: false
    //         }
    //     }
    // };

    


    return (
        <div>
            <h2 className='text-2xl font-bold   ' >Feedback from Customers</h2>

            <div>
                
                <input
                    type="number"
                    placeholder="Search by rating..."
                    min = "1"
                    max = "5"
                    className='searchrev-input'
                    onChange={handleSearchChange}
                />
            </div>




            {loading ? (
                <p>Loading feedback...</p>
            ) : (
                <div>
                    {filteredFeedback.length === 0 ? (
                        <p>No feedback available</p>
                    ) : (

                        filteredFeedback.map((item, index) => (

                            <div key={index} className="feedback-item ">
                                <h3>{item.name}</h3>
                                <h4>{item.email}</h4>

                                <p className='flex'>Rating: {[...Array(item.rating)].map((_, i) => (
                                    <FaStar key={i} color= "#ffc107" size = {20} />
                                ))}
                                
                                </p>
                                <p>{item.comment}</p>

                                {item.email === loggedInUserEmail && (
                                    <div>
                                        <button className='p-3'>
                                            <Link to={`/feedbackupdate/${item._id}`}>Edit</Link>
                                        </button>
                                        <button
                                            className="btnrev btn-review-delete p-3"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}

                    {/* <div>
                        <Bar data={data} options={options} />
                    </div> */}



                    <div>

                        {Object.keys(starCounts).map((rating, index) => (
                            <p key = {index}>
                                {rating} star Count: {starCounts[rating]}
                            </p>
                            
                        ))}
                    </div>


                    <p>Total Average: {totalAverage}</p>
                    
                </div>
            )}

            <br />
            

            <br />
            <StarRating />

            {/* <br />
            <AdminFeedbackPage /> */}
            
        </div>
    );


};

export default FeedbackDisplay;
