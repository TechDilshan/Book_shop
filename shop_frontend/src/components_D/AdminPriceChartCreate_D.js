import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components_D/AdminStyle_D.css';

const AddPaperSize = () => {
  
  const [paperSize, setPaperSize] = useState("");
  const [colour, setColour] = useState("");
  const [side, setSide] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newPaperSize = {
      paperSize,
      colour,
      side,
      price
    }

    // Adding a paper size through the form to the DB
    axios.post("http://localhost:3003/printprice/add", newPaperSize)
      .then(() => {
        alert("New paper size added successfully")
        // Clear the form after successful submission
        setPaperSize("");
        setColour("");
        setSide("");
        setPrice("")
      })
      .catch((err) => {
        alert(err);
      });
  }

  // mapping db vals into display vals
  function mapValue(value) {
    switch(value) {
      case "blackAndWhite":
        return "Black and White";
      case "coloured":
        return "Coloured";
      case "double":
        return "Double-sided";
      case "single":
        return "Single-sided";
      default:
        return value;
    }
  }

  return (
    <div id="form1">
      <h2 className='mainTopic'>Printing Price Chart Form</h2>
      <form onSubmit={handleSubmit}>

        <label htmlFor="paperSize" className='subtopics'> Paper Size: </label>
        <input
          type="text"
          name="paperSize"
          className='boxoutSeInput_D'
          value={paperSize}
          onChange={(e) => {
            setPaperSize(e.target.value)
          }}
          required
        />
        <br /><br />

        <label htmlFor="colour" className='subtopics'> Colour: </label>
        <select
          name="colour"
          className='boxoutSeInput_D'
          value={colour}
          onChange={(e) => {
            setColour(e.target.value)
          }}
          required
        >
          <option value="">Select Color</option>
          <option value="blackAndWhite">Black and White</option>
          <option value="coloured">Coloured</option>
        </select>
        <br /><br />

        <label htmlFor="side" className='subtopics'> Double/Single Sided: </label>
        <select
          name="side"
          className='boxoutSeInput_D'
          value={side}
          onChange={(e) => {
            setSide(e.target.value)
          }}
          required
        >
          <option value="">Select Sidedness</option>
          <option value="double">Double-Sided</option>
          <option value="single">Single-Sided</option>
        </select>
        <br /><br />

        <label htmlFor="price" className='subtopics'> Price: </label>
        <input
          type="number"
          name="price"
          className='boxoutSeInput_D'
          value={price}
          onChange={(e) => {
            setPrice(e.target.value)
          }}
          required
        />
        <br /><br />

        <button type="submit" className='btn'>Submit Paper Size</button>
      </form>
    </div>
  );
}

export default AddPaperSize;
