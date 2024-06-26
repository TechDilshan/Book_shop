import React,{useState} from 'react';
import { FaStar } from 'react-icons/fa';
import  axios  from 'axios';
import '../F_CSS/Form.css';
// import DatePicker from 'react-datepicker';

const StarRating = ({ productId , email }) => {
    
    
    const [proId, setProId] = useState(productId);
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);  
    const [showAlert, setShowAlert] = useState(false);
    const [nameError, setNameError] = useState("");
    const [purchaseDate, setPurchaseDate] = useState("");
    const [companyFeedback, setcompanyFeedback] = useState("");
    const [suggestions, setSuggestions] = useState("");


    function sendData(e){
        e.preventDefault();

        if (!name || name.trim().split(/\s+/).length < 2) {
           
            setNameError("Please enter your full name (Atleast 2 names).");
            return;
            
        
        }

        if (rating) {

            const newRating ={
                rating,comment,email,name,productId, purchaseDate, companyFeedback, suggestions

            }

            console.log(newRating);
            axios.post("http://localhost:3001/api/addreview",newRating)
            
            .then(()=>{
                alert("Review added successfully");
                window.location.reload();

                
    
            }).catch((err)=>{
            alert(err.message); 
            })
        

        } else {
            setShowAlert(true);
        }

    }

    function handleNameChange(e) {

        const value = e.target.value;
        
        if (!/\d/.test(value)) {
            setName(value);

            if (value.trim().split(/\s+/).length >= 2) {
                setNameError(""); 
            }
        }
    }

    // const handleDateChange = date => {
    //     setSelectedDate(date);
    // };
    


// function handleNameChange(e) {

//     const value = e.target.value;
//     if (!/\d/.test(value)) {
//         setName(value);
//     }
// }

    

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

            

            <textarea className='revtextarea' placeholder="Name" value={name} onChange={handleNameChange} />
            {nameError && <p className="revalert-message">{nameError}</p>}
            
            <textarea className='revtextarea' placeholder="Email" value={email} />

            
            <textarea  className='revtextarea'placeholder="Write your feedback here..." value={comment} onChange={(e) => setComment(e.target.value)} />

            <br />
           
            <h3>For Rathiy Intech Reference</h3>
            <input className='revtextarea' placeholder="Enter Purchase Date" type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
            <textarea className='revtextarea' placeholder="Suggestions/Report Issues..." value={suggestions} onChange={(e) => setSuggestions(e.target.value)} />
            <textarea className='revtextarea' placeholder="Company Feedback..." value={companyFeedback} onChange={(e) => setcompanyFeedback(e.target.value)} />

            <form onSubmit={sendData}>
                <button className='revsubmit' type="submit">Submit</button>
            </form>
    
        </div>

       
    );

    }

export default StarRating;