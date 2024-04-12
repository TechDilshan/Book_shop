import React, { useState, useEffect } from 'react';
import StarRating from './StarRating'; 
import axios from 'axios';
import FeedbackForm from './FeedbackUpdate';

const ProductReviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/reviews/product/${productId}`)
            .then(response => {
                setReviews(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                setLoading(false);
            });
    }, [productId]);

    return (
        <div>
            {loading ? (
                <p>Loading reviews...</p>
            ) : (
                <>
                    {reviews.length === 0 ? (
                        <p>No reviews</p>
                    ) : (
                        <div>
                            {reviews.map((review, index) => (
                                <div key={index}>
                                    <p>Rating: {review.rating}</p>
                                    <p>Comment: {review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <StarRating />
                
                    
                </>
            )}
        </div>
    );
};

export default ProductReviews;
