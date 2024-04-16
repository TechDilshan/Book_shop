import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import StarRating from '../components_chamu/StarRating';
import '../F_CSS/FeedbackDis.css';


const FeedbackDisNew = ({ productId }) => {
    
    const loggedInUserEmail = sessionStorage.getItem('userEmail');

    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [starCounts, setStarCounts] = useState({});
    const [totalAverage, setTotalAverage] = useState(0);
    const [searchRating, setSearchRating] = useState(null);
    const [pdId] = useState(productId);



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
            })
            .catch(error => {
                console.error('Error fetching feedback:', error);
                setLoading(false);
            });
    };



    useEffect(() => {
        getReviewDB();
    }, [productId]);



    const calculateFilteredStarCounts = (filteredFeedback) => {

        const counts = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        };


        filteredFeedback.forEach((item) => {
            counts[item.rating] += 1;
        });

        return counts;
    };




    const calculateFilteredTotalAverage = (filteredFeedback) => {

        if (filteredFeedback.length === 0) {
            return 0; 
        }

        const totalStars = filteredFeedback.reduce((acc, item) => acc + item.rating, 0);
        const starCounts = filteredFeedback.length;
        
        const totalAverage = totalStars / starCounts;
        return totalAverage.toFixed(1);
    };
    


    const handleSearchChange = (event) => {
        const rating = parseInt(event.target.value);
        setSearchRating(rating);
    };



    const allFeedback = feedback.filter((item) => item.productId === pdId);

    const filteredFeedback = allFeedback.filter((item) => !searchRating || item.rating === searchRating);

    const filteredStarCounts = calculateFilteredStarCounts(allFeedback);
    const filteredTotalAverage = calculateFilteredTotalAverage(allFeedback);


    




    return (

        <div className='feedback-containers'>
            <h2 className='feedback-title'>Feedback from Customers</h2>


           

            <div className='star-counts'>

                    <div className='total-average-container'>

                        <p className='revtotal-average'>{filteredTotalAverage}</p>


                        <div className='flex'>

                            {[...Array(Math.floor(filteredTotalAverage))].map((_, i) => (
                                <FaStar key={i} className='star-icon' color="#ffc107" size={20} />
                            ))}


                            {filteredTotalAverage % 1 !== 0 && (
                                <FaStarHalfAlt className='star-icon' color="#ffc107" size={20} />
                            )}



                            {[...Array(5 - Math.ceil(filteredTotalAverage))].map((_, i) => (
                                <FaStar key={i} className='star-icon' color="#ccc" size={20} />
                            ))}


                        </div>


                    </div>


                    <div className='star-counts-container'>


                        {Object.keys(filteredStarCounts).map((rating, index) => (
                            <div key={index} className='star-count-bar'>
                                <span className='star-count-text'>{rating} star Count:({filteredStarCounts[rating]})</span>
                                <div className='revbar' style={{ width: `${filteredStarCounts[rating] * 20}px` }}></div>
                            </div>
                        ))}


                    </div>



            </div>





                
                

            <div className='searchrev-container'>

                <input
                    type="number"
                    placeholder="Search by rating..."
                    min="1"
                    max="5"
                    className='searchrev-input'
                    onChange={handleSearchChange}
                />

            </div>


           <p className='feedback-count'>Total feedbacks: {filteredFeedback.length}</p>

           <br />

            {/* <div>
                pro Id itm: {pdId}
            </div> */}



            {loading ? (
                <p className='revloading-message'>Loading feedback...</p>


            ) : (
                <div>

                    {filteredFeedback.length === 0 ? (

                        <p className='no-feedback-message'>No feedback available</p>
                    ) : (

                        filteredFeedback.map((item, index) => (

                            <div key={index} className="feedback-item">

                                {/* <h3>proId : {item.productId}</h3> */}
                                <h3 className='feedback-name'>{item.name}</h3>
                                <h4 className='feedback-email'>{item.email}</h4>
                                

                                <div className="feedback-rating">


                                <p className='rating-label'></p>
                                 {[...Array(item.rating)].map((_, i) => (
                                    <FaStar key={i} className='star-icon' color="#ffc107" size={20} />

                                ))}

                                </div>
                                <p className='feedback-comment'>{item.comment}</p>


                                {item.email === loggedInUserEmail && (
                                    
                                    <div className='revuser-actions'>

                                        <button className='revedit-button'>
                                            <Link to={`/feedbackupdate/${item._id}`}>Edit</Link></button>

                                        <button
                                            className='revdelete-button'
                                            onClick={() => handleDelete(item._id)}>

                                            Delete
                                            </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}


                    

                </div>
            )}

            <br />

            <StarRating productId={pdId} email={loggedInUserEmail}/>

        </div>
    );
};

export default FeedbackDisNew;
