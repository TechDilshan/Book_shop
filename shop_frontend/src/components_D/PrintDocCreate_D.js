import React, { useState } from 'react';
import axios from 'axios';
import '../components_D/PrintDocStyles_D.css';

const PrintRequestForm = () => {
  const [formData, setFormData] = useState({
    document: null,
    colour: 'blackWhite',
    copies: 1,
    slides: 1,
    orientation: 'portrait',
    doubleSided: false,
    singleSide: false,
    paperSize: 'A4',
    otherOptions: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      doubleSided: name === 'doubleSided' ? checked : false,
      singleSide: name === 'singleSide' ? checked : false,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  };

  return (
    <div id = "form1">
      <h2 className='topicMain'>Print Request Form</h2>
      <form onSubmit={handleSubmit}>
        
        <label htmlFor="document" className='topicSubs'>Upload Document (PDF/JPG): </label>
        <input
          type="file"
          id="document"
          name="document"
          accept=".pdf, .jpg"
          onChange={handleInputChange}
          required
        />
        <br/>

        <label htmlFor="colour" className='topicSubs'>Type: </label>
        <select
          id="colour"
          name="colour"
          className='boxesforInSe'
          value={formData.colour}
          onChange={handleInputChange}
          required
        >
          <option value="blackWhite">Black & White</option>
          <option value="coloured">Coloured</option>
        </select>
        <br/>

        <label htmlFor="copies" className='topicSubs'>Number of Copies: </label>
        <input
          type="number"
          id="copies"
          name="copies"
          className='boxesforInSe'
          value={formData.copies}
          onChange={handleInputChange}
          min="1"
          required
        />
        <br/>

        <label htmlFor="slides" className='topicSubs'>Number of Slides: </label>
        <input
          type="number"
          id="slides"
          name="slides"
          className='boxesforInSe'
          value={formData.slides}
          onChange={handleInputChange}
          min="1"
          required
        />
        <br/>

        <label htmlFor="orientation" className='topicSubs'>Orientation: </label>
        <select
          id="orientation"
          name="orientation"
          className='boxesforInSe'
          value={formData.orientation}
          onChange={handleInputChange}
          required
        >
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
        </select>
        <br/>

        <label>
        Double-sided
          <input
            type="checkbox"
            className='doubleS'
            id="doubleSided"
            name="doubleSided"
            checked={formData.doubleSided}
            onChange={handleInputChange}
          />
        </label>

        <label>
        Single-sided
          <input
            type="checkbox"
            className='singleS'
            id="singleSide"
            name="singleSide"
            checked={formData.singleSide}
            onChange={handleInputChange}
          />
        </label>
        <br/>

        <label htmlFor="paperSize" className='topicSubs'>Paper Size: </label>
        <select
          id="paperSize"
          name="paperSize"
          className='boxesforInSe'
          value={formData.paperSize}
          onChange={handleInputChange}
          required
        >
          <option value="a1">A1</option>
          <option value="a2">A2</option>
          <option value="a3">A3</option>
          <option value="a4">A4</option>
          <option value="a5">A5</option>
          <option value="a6">A6</option>
          <option value="a7">A7</option>
          <option value="a8">A8</option>
        </select>
        <br/>

        <label htmlFor="otherOptions" className='topicSubs'>Other Options: </label>
          < textarea rows="10" cols="12"
            id="otherOptions"
            name="otherOptions"
            className='boxesforInSe'
            value={formData.otherOptions}
            onChange={handleInputChange}
        />
        <br/>

        <button type="submit" className='btnSub'>Submit Print Request</button>
      </form>
    </div>
  );
};

export default PrintRequestForm;