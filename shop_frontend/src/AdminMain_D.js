import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PrintDocStyles_D.css';
import './AdminStyle_D.css';
import Foot from './footer';
import Navi from './Navi';

export default function AllPapers() {
    const [allpaperSizes, setAllPaperSizes] = useState([]);
    const [addSection, setAddSection] = useState(false);
    const [paperSize, setPaperSize] = useState("");
    const [colour, setColour] = useState("");
    const [side, setSide] = useState("");
    const [price, setPrice] = useState("");
    const [selectedPaper, setSelectedPaper] = useState(null); // State to hold selected paper for editing

    //Deleting a paper size
    const handleDelete = (priceChartid) => {
        const confirmation = window.confirm("Are you sure you want to delete this paper size?");
        if (confirmation) {
            axios.delete(`http://localhost:3003/printprice/delete/${priceChartid}`)
                .then(() => {
                    alert("Paper Size Deleted Successfully");
                    getAllPaperSizes();
                })
                .catch((err) => {
                    alert(err.message);
                });
        } else {
            // Printing order manager clicked cancel, do nothing
        }
    };
    
    //Getting the data from the DB
    const getAllPaperSizes = () =>{
        axios.get("http://localhost:3003/printprice/")
            .then((res) => {
                setAllPaperSizes(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
      };

    // Function to handle both adding new data and updating existing data
    function handleSubmit(e) {
        e.preventDefault();

        const newPaperSize = {
            paperSize,
            colour,
            side,
            price
        };

        if (selectedPaper) {
            // If selectedPaper exists, update
            axios.put(`http://localhost:3003/printprice/update/${selectedPaper._id}`, newPaperSize)
                .then(() => {
                    alert("Price Of The Paper Updated Successfully");
                    setAddSection(false);
                    getAllPaperSizes(); // Refresh the paper sizes list
                    setSelectedPaper(null); // Reset selectedPaper after updating
                })
                .catch((err) => {
                    alert(err.message);
                });
        } else {
            // If selectedPaper is null, add
            axios.post("http://localhost:3003/printprice/add", newPaperSize)
                .then(() => {
                    alert("New Paper Size Added Successfully");
                    // Clear the form after successful submission
                    resetForm();
                    getAllPaperSizes(); // Refresh the paper sizes list
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    }

    // Function to reset add form & update form
    function resetForm() {
        setPaperSize("");
        setColour("");
        setSide("");
        setPrice("");
        setSelectedPaper(null);
    }

    // Function to handle updating
    function handleUpdateClick(paper) {
        setPaperSize(paper.paperSize);
        setColour(paper.colour);
        setSide(paper.side);
        setPrice(paper.price);
        setSelectedPaper(paper); // Set the selectedPaper for updating
        setAddSection(true); // Show the form
    }

    // Get data from the database
    useEffect(() => {
        getAllPaperSizes();
    }, []);

    return (
        <div>
            <div>
        <Navi/>
      </div>
            {!addSection && (
                <div>
                    <h1 className='Allpapertop'>All Paper Sizes</h1>
                    <table className="admintable">
                        <thead>
                            <tr>
                                <th>Paper Size</th>
                                <th>Colour</th>
                                <th>Double/Single-Sided</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allpaperSizes.map((paper, index) => (
                                <tr key={index}>
                                    <td>{paper.paperSize}</td>
                                    <td>{paper.colour}</td>
                                    <td>{paper.side}</td>
                                    <td>{paper.price}</td>
                                    <td>
                                        <button className='btnAction' onClick={() => handleUpdateClick(paper)}>Update</button>
                                        <button className='btnAction' onClick={() => handleDelete(paper._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className='btnadd' onClick={() => { setAddSection(true); resetForm(); }}>Add New Paper</button>
                    <button className='btnviewuser'>View User Chart</button>
                </div>
            )}

            {addSection && (
                <div id="form1">
                    <h2 className='mainTopic'>Printing Price Chart Form</h2>
                    <button type="button" onClick={() => { setAddSection(false); resetForm(); }} className='btnViewChart'>View Chart</button>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="paperSize" className='subtopics'> Paper Size: </label>
                        <input
                            type="text"
                            name="paperSize"
                            value={paperSize}
                            onChange={(e) => setPaperSize(e.target.value)}
                            required
                            disabled={selectedPaper ? true : false} // Disable if selectedPaper(update form) is working
                        />
                        <br /><br />

                        <label htmlFor="colour" className='subtopics'> Colour: </label>
                        <select
                            name="colour"
                            value={colour}
                            onChange={(e) => setColour(e.target.value)}
                            required
                            disabled={selectedPaper ? true : false} // Disable if selectedPaper is working
                        >
                            <option value="">Select Color</option>
                            <option value="Black and White">Black and White</option>
                            <option value="Coloured">Coloured</option>
                        </select>
                        <br /><br />

                        <label htmlFor="side" className='subtopics'> Double/Single Sided: </label>
                        <select
                            name="side"
                            value={side}
                            onChange={(e) => setSide(e.target.value)}
                            required
                            disabled={selectedPaper ? true : false} // Disable if selectedPaper is working
                        >
                            <option value="">Select Sidedness</option>
                            <option value="Double-Sided">Double-Sided</option>
                            <option value="Single-Sided">Single-Sided</option>
                        </select>
                        <br /><br />

                        <label htmlFor="price" className='subtopics'> Price: </label>
                        <input
                            type="number"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                        <br /><br />

                        <button type="submit" className='btn1'>{selectedPaper ? "Update Price" : "Submit Paper Size"}</button>
                    </form>
                </div>
            )}
            <div>
        <Foot/>
      </div>
        </div>
    );
}