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

            <br />
           

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




            <br />
                
                

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

                                <br />
                                <p className='feedback-comment'>{item.comment}</p>


                                {item.email === loggedInUserEmail && (
                                    
                                    <div className='revuser-actions'>

                                        <button className='revedit-button'>
                                            <Link to={`/feedbackupdate/${item._id}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#005abb" class="w-6 h-6">
                                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                            </svg>


                                                </Link></button>

                                        <button
                                            className='revdelete-button'
                                            onClick={() => handleDelete(item._id)}>

                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="w-6 h-6">
                                                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                            </svg>

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
