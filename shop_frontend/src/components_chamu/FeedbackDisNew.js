import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import StarRating from '../components_chamu/StarRating';

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
        const totalStars = filteredFeedback.reduce((acc, item) => acc + item.rating, 0);
        const starCounts = filteredFeedback.length;
        const totalAverage = totalStars / starCounts;
        return totalAverage.toFixed(1);
    };

    const handleSearchChange = (event) => {
        const rating = parseInt(event.target.value);
        setSearchRating(rating);
    };

    const filteredFeedback = feedback.filter((item) => item.productId === pdId);
    const filteredStarCounts = calculateFilteredStarCounts(filteredFeedback);
    const filteredTotalAverage = calculateFilteredTotalAverage(filteredFeedback);

    return (
        <div>
            <h2 className='text-2xl font-bold'>Feedback for this Product</h2>

            <div>
                <input
                    type="number"
                    placeholder="Search by rating..."
                    min="1"
                    max="5"
                    className='searchrev-input'
                    onChange={handleSearchChange}
                />
            </div>

            <div>
                pro Id itm: {pdId}
            </div>

            {loading ? (
                <p>Loading feedback...</p>
            ) : (
                <div>
                    {filteredFeedback.length === 0 ? (
                        <p>No feedback available</p>
                    ) : (
                        filteredFeedback.map((item, index) => (
                            <div key={index} className="feedback-item">
                                <h3>proId : {item.productId}</h3>
                                <h3>{item.name}</h3>
                                <h4>{item.email}</h4>
                                <p className='flex'>Rating: {[...Array(item.rating)].map((_, i) => (
                                    <FaStar key={i} color="#ffc107" size={20} />
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
                    <div>
                        {Object.keys(filteredStarCounts).map((rating, index) => (
                            <p key={index}>
                                {rating} star Count: {filteredStarCounts[rating]}
                            </p>
                        ))}
                    </div>
                    <p>Total Average: {filteredTotalAverage}</p>
                </div>
            )}
            <br />
            <StarRating productId={pdId} email={loggedInUserEmail}/>
        </div>
    );
};

export default FeedbackDisNew;
