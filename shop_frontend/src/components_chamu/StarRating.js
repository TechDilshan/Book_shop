import React,{useState} from 'react';
import { FaStar } from 'react-icons/fa';
import  axios  from 'axios';
import '../F_CSS/Form.css';

const StarRating = ({ productId , email }) => {
    
    
    const [proId, setProId] = useState(productId);
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);  
    const [showAlert, setShowAlert] = useState(false);
    const [nameError, setNameError] = useState("");


    function sendData(e){
        e.preventDefault();

        if (!name || name.trim().split(/\s+/).length < 2) {
           
            setNameError("Please enter your full name.");
            return;
        }

        if (rating) {

            const newRating ={
                rating,comment,email,name,productId

        }

        console.log(newRating);
        axios.post("http://localhost:3001/api/addreview",newRating).then(()=>{
            
           
  
        alert("Review added successfully");

            
  
        }).catch((err)=>{
           
            alert(err.message); 
        })
        
    } else {
        
        setShowAlert(true);
    }
}

    

    return (

        <div className='feedback-container'>

            <h2>Share Your Feedback</h2>

        

            <div className='flex'>

                {[...Array(5)].map((star, i) => {
                
                const ratingValue = i + 1;
            
                return (

            

                <label key = {i}>
                    <input className='star-input'

                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => {setRating(ratingValue); setShowAlert(false);}}
                    />

                    <FaStar

                        className="star"
                        color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                        size={30}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                    />
                </label>

                );



             })}

            </div>

            {showAlert && <p className = "revalert-message">Please select a rating.</p>}

            <p>{rating} stars rating..</p>
            <text type='number' values='productId' hidden></text>
            <textarea className='revtextarea' placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <textarea className='revtextarea' placeholder="Email" value={email} />
            <textarea  className='revtextarea'placeholder="Write your feedback here..." value={comment} onChange={(e) => setComment(e.target.value)} />
            <form onSubmit={sendData}>
                <button className='revsubmit' type="submit">Submit</button>
            </form>
    
        </div>

       
    );

    }

export default StarRating;