import React, { useState } from 'react';
import Navi from '../Navi';
import Foot from '../footer';
import '../components_D/PrintOrderReadStyle_D.css';

function UpdateForm({ printOrder, onUpdate }) {
  const [formData, setFormData] = useState({
    colour: printOrder.colour,
    copies: printOrder.copies,
    slides: printOrder.slides,
    orientation: printOrder.orientation,
    doubleSided: printOrder.doubleSided,
    singleSide: !printOrder.doubleSided,
    paperSize: printOrder.paperSize,
    otherOptions: printOrder.otherOptions,
});

    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
    
      // If checkbox is clicked
      if (type === 'checkbox') {
        // If the clicked checkbox is singleS, uncheck doubleS and vice versa
        if (name === 'singleSide' && checked) {
          setFormData((prevData) => ({
            ...prevData,
            singleSide: true,
            doubleSided: false,
          }));
        } else if (name === 'doubleSided' && checked) {
          setFormData((prevData) => ({
            ...prevData,
            singleSide: false,
            doubleSided: true,
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            [name]: checked,
          }));
        }
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send PUT request to update the printing order
        onUpdate(formData);
    };

    return (
        <div>
            <div>
                <Navi/>
            </div>
            <div id="formUpdate_D">
                <h2 className="TopicUpdate_D">Update Printing Order</h2>
                <form onSubmit={handleSubmit}>
                <label htmlFor="colour" className='topicSubs'>Type: </label>
                    <select
                      id="colour"
                      name="colour"
                      className='boxesforInSe_D'
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
                      className='boxesforInSe_D'
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
                      className='boxesforInSe_D'
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
                      className='boxesforInSe_D'
                      value={formData.orientation}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Orientation</option>
                      <option value="Portrait">Portrait</option>
                      <option value="Landscape">Landscape</option>
                    </select>
                    <br/>
                    <table>
                      <td>
                        <label>
                          Double-Sided
                          <input
                            type="checkbox"
                            className='dSide'
                            id="doubleSided"
                            name="doubleSided"
                            checked={formData.doubleSided}
                            onChange={handleInputChange}
                          />
                      </label>
                      </td>
                      <td>
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
                      </td>
                    </table>
                    <br/> 

                    <label htmlFor="paperSize" className='topicSubs'>Paper Size: </label>
                    <select
                      id="paperSize"
                      name="paperSize"
                      className='boxesforInSe_D'
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
                        className='boxesforInSe_D'
                        value={formData.otherOptions}
                        onChange={handleInputChange}
                    />
                    <br/>
                    <button type="submit" className='btnUpdate_D'>Update Printing Order</button>
                </form>
            </div>
            <br/><br/>
            <div>
                <Foot/>
            </div>
        </div>
    );
}

export default UpdateForm;
