import React, { useState } from 'react';
import './PrintDocStyles_D.css';

function PrintRequestForm() {
  const [showForm, setShowForm] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault(); 
  };

  const handleFormToggle = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      {showForm ? (
        <div id="form1">
          <h2 className='topicMain'>Print Request Form</h2>
          <button onClick={handleFormToggle} className='btnViewChart' >View Price Chart</button>
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
                      value={formData.colour}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Colour</option>
                      <option value="Black and White">Black & White</option>
                      <option value="Coloured">Coloured</option>
                    </select>
                    <br/>

                    <label htmlFor="copies" className='topicSubs'>Number of Copies: </label>
                    <input
                      type="number"
                      id="copies"
                      name="copies"
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
                      value={formData.orientation}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Orientation</option>
                      <option value="Portrait">Portrait</option>
                      <option value="Landscape">Landscape</option>
                    </select>
                    <br/>

                    <label>
                    Double-Sided
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
                    Single-Sided
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
                      value={formData.paperSize}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="A1">A1</option>
                      <option value="A2">A2</option>
                      <option value="A3">A3</option>
                      <option value="A4">A4</option>
                      <option value="A6">A6</option>
                      <option value="A7">A7</option>
                      <option value="A8">A8</option>
                    </select>
                    <br/>

                    <label htmlFor="otherOptions" className='topicSubs'>Other Options: </label>
                      < textarea rows="10" cols="12"
                        id="otherOptions"
                        name="otherOptions"
                        value={formData.otherOptions}
                        onChange={handleInputChange}
                    />
                    <br/>

                    <button type="submit" className='btnSub'>Submit Print Request</button>
        </form>
      </div>
      ) : (
        <div>
          <button onClick={handleFormToggle} className='btnPlace2' >Place Order</button>
        </div>
      )}
    </div>
  );
}

export default PrintRequestForm;
