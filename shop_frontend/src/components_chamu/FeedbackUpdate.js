import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import '../F_CSS/Form.css';
import { useParams } from 'react-router-dom';

const FeedbackUpdate = () => {
  const { UID } = useParams();

  const [updatedInfo, setUpdatedInfo] = useState({
    name: '',
    email: '',
    comment: '',
    rating: '',
  });

  const [hover, setHover] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/getonereview/${UID}`)
      .then(res => {
        setUpdatedInfo(res.data.user);
      })
      .catch(error => {
        alert('Error fetching user information:', error);
        console.error(`Error fetching user information: ${error}`);
      });
  }, [UID]);

  const handleRatingChange = (ratingValue) => {
    setUpdatedInfo({ ...updatedInfo, rating: ratingValue });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo({ ...updatedInfo, [name]: value });
  };

  const sendUpdatedData = () => {
    console.log(updatedInfo);
    axios.put(`http://localhost:3001/api/updatereview/${UID}`, updatedInfo)
      .then(() => {
        alert("Review Updated successfully");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className='feedback-container'>
      <h2>Share Your Feedback</h2>
      <div className='flex'>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label key={i}>
              <input
                className='star-input'
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => handleRatingChange(ratingValue)}
              />
              <FaStar
                className="star"
                color={ratingValue <= (hover || updatedInfo.rating) ? "#ffc107" : "#e4e5e9"}
                size={30}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      {showAlert && <p className="revalert-message">Please select a rating.</p>}
      <p>{updatedInfo.rating} stars rating..</p>
      <textarea
        className='revtextarea'
        name="name"
        placeholder="Name"
        value={updatedInfo.name}
        onChange={handleChange}
      />
      <textarea
        className='revtextarea'
        name="email"
        placeholder="Email"
        value={updatedInfo.email}
        onChange={handleChange}
      />
      <textarea
        className='revtextarea'
        name="comment"
        placeholder="Write your feedback here..."
        value={updatedInfo.comment}
        onChange={handleChange}
      />
      <button className='revsubmit' onClick={sendUpdatedData}>Submit</button>
    </div>
  );
};

export default FeedbackUpdate;
