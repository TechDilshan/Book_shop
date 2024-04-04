import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
    
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState('');
    const [email, setEmail] = useState(''); 
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/reviews/add', { rating, comment, email, name});
            
            setRating(null);
            setComment('');
            setName ('');
            setEmail('');
           
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            
            {/*star rating component*/}
            <textarea placeholder = "Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            <textarea placeholder = "Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <textarea placeholder="Write your feedback here..." value={comment} onChange={(e) => setComment(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default FeedbackForm;
