import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './ShoppingNote.css'; // Import the CSS file
import Navi from './Navi';
import Foot from './footer';

const ShoppingNote = () => {
  const [notes, setNotes] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    const userEmail = sessionStorage.getItem('userEmail');
    setEmail(userEmail);
    getMessage();


    
  }, []);

  const getMessage = () => {
    const FetchDetails = () => {  // Send a GET request to the server to fetch 
      Axios.get('http://localhost:3001/api/getmessage')
        .then((response) => {
          setNotes(response.data?.response || []); 
        })
        .catch((error) => {
          console.error('Axios Error: ', error);  
        });
    };
  FetchDetails(); // Call FetchDetails function 
    const intervalId = setInterval(FetchDetails, 1000); 
    return () => clearInterval(intervalId); 
  };

  const userEmail = sessionStorage.getItem('userEmail');
  const filteredNotes = notes.filter(note => note.email === userEmail);
  // const fetchNotes = async () => {
  //   try {
  //     const response = await axios.get('/api/notes');
  //     setNotes(response.data);
  //   } catch (error) {
  //     console.error('Error fetching notes:', error);
  //   }
  // };

  const createMessage = () => {

     const userEmail = sessionStorage.getItem('userEmail');

     if (filteredNotes.length == 0) {
              const payload = {
                email: userEmail,
                name: name,
                phoneNumber: phoneNumber,
                note: noteText,
            }
          
            Axios.post('http://localhost:3001/api/createmessage', payload) // Send a POST request to the server to create a new cart item
            .then((response) => {
                // Handle response if needed
            })
            .catch((error) => {
                console.error('Axios Error: ', error);
            });
     }
     else{
      console.log("cant add");
        alert("Can't Add more than one note");
     }

   
  };

  const updateMessage = () => {
    if (filteredNotes.length > 0) {
        const lastNote = filteredNotes[filteredNotes.length - 1];
        const { name, phoneNumber, note } = lastNote;

        setName(name);
        setPhoneNumber(phoneNumber);
        setNoteText(note);
    } else {
        console.log("No notes available to update");
    }
}


const updateM = () => {
  if (email) { // Ensure that an ID is available before attempting to update
      const payload = {
          email:email,
          name: name,
          phoneNumber: phoneNumber,
          note: noteText,
      };

      console.log(payload);

      Axios.post('http://localhost:3001/api/updatemessage', payload)
          .then((response) => {
              console.log("Success");
          })
          .catch((error) => {
              console.error('Axios Error: ', error);
          });
  } else {
      console.error("No ID available for update");
  }
};

const deleteMessage = () => {
  Axios.post('http://localhost:3001/api/deletemessage', { email: userEmail })
      .then((response) => {
      })
      .catch((error) => {
        console.error('Axios Error: ', error)
      });
}

  // const deleteNote = async (id) => {
  //   try {
  //     await axios.delete(`/api/notes/${id}`);
  //     setNotes(notes.filter((note) => note._id !== id));
  //   } catch (error) {
  //     console.error('Error deleting note:', error);
  //   }
  // };

  return (
    <div><Navi />
    <div className="container">
      <h1 className="heading">Shopping Notes</h1>
      <form>
        <div className="form-input">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly
          />
        </div>
        <div className="form-input">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-input">
          <input
            type="tel"
            placeholder="title"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-input">
          <textarea
            placeholder="Note"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            required
          />
        </div>
        <div className="btn-container">
          
        </div>
      </form>
      <div className="btn-container action-buttons">
      <button onClick={createMessage}>Add Note</button>
      <button onClick={updateM}>Update</button></div>
      <ul className="notes-list">
        {filteredNotes.map((note) => (
          <li key={note._id}>
            <div>Email: {note.email}</div>
            <div>Name: {note.name}</div>
            <div>Phone Number: {note.phoneNumber}</div>
            <div>Note: {note.note}</div>
          </li>
        ))}
      </ul>
      <div className="btn-container action-buttons">
        <button onClick={updateMessage}>Go To Update</button>
        <button onClick={deleteMessage}>Delete</button>
      </div>
    
    </div>
    <Foot/>
    </div>
  );
};

export default ShoppingNote;
