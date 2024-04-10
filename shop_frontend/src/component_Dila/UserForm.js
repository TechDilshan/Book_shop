import React, { useEffect, useState } from "react";
import { Button, Grid, Input, Typography, LinearProgress, CircularProgress } from "@mui/material";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import Axios from 'axios';
import { useMediaQuery } from '@mui/material';
import '../components_D/PrintDocStyles_D.css';

const UserForm = ({ addUser, updateUser, submitted, data, isEdit, setIsEdit }) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [imgId, setImgId] = useState('');
  const [price, setPrice] = useState(0);
  const [sdes, setSdes] = useState('');
  const [des, setDes] = useState('');
  const [item, setItem] = useState('');
  const [stock, setStock] = useState(0);

  const [imageUpload, setImageUpload] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingcy, setLoadingcy] = useState(true);

  useEffect(() => {
    if (!submitted || isEdit) {
      setId(0);
      setName('');
      setImgId('');
      setPrice(0);
      setSdes('');
      setDes('');
      setItem('');
      setStock(0);
      setImagePreview(null);
      fetchMaxIdAndSetId();
    }
    if (isEdit) {
      setId(data.id);
      setName(data.name);
      setImgId(data.imgId);
      setPrice(data.price);
      setSdes(data.sdes);
      setDes(data.des);
      setItem(data.item);
      setStock(data.stock);

      setImagePreview(data.imageUrl);
    }
  }, [submitted, isEdit, data]);

  const fetchMaxIdAndSetId = async () => {
    try {
      const response = await Axios.get('https://book-shop-dep.vercel.app/api/getmaxid'); //http://localhost:3001/api/getmaxid
      const maxId = response.data?.maxId || 0; 
      isEdit ? setId(data.id) : setId(maxId + 1);
      setLoadingcy(false); 
    } catch (error) {
      console.error('Axios Error (getMaxId): ', error);
    }
  };

  const uploadFile = async () => {
    if (imageUpload == null) return null;
    const imgX = v4();
    const imageRef = ref(storage, `images/${imgX}`);
    
    try {
      await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(imageRef);
      setImageUrls((prev) => [...prev, url]);
      return imgX;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleUserDataUpdate = async () => {
    setLoading(true); // Set loading to true when upload starts

    try {
      let uploadedImgId = imgId;
      if (imageUpload) {
        uploadedImgId = await uploadFile();
      }

      setImgId(uploadedImgId);
      isEdit ? updateUser({ id, name, price, sdes, des, item, stock, imgId: uploadedImgId }) : addUser({ id, name, price, sdes, des, item, stock, imgId: uploadedImgId });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after upload completes (whether successful or not)
    }
  };

  const handleSaveButtonClick = async () => {
    await handleUserDataUpdate();
    setIsEdit(false); // Reset isEdit after handling update
  };

//drag and drop
const handleDrop = (event) => {
event.preventDefault();
const file = event.dataTransfer.files[0];
if (file) {
  setImageUpload(file);
  const previewUrl = URL.createObjectURL(file);
  setImagePreview(previewUrl);
}
};

const handleDragOver = (event) => {
event.preventDefault();
};

const handleFileInputChange = (event) => {
const file = event.target.files[0];
if (file) {
  setImageUpload(file);
  const previewUrl = URL.createObjectURL(file);
  setImagePreview(previewUrl);
}
};
const isMobile = useMediaQuery('(max-width:600px)');

  return (
   < div style={{ color: "#000000" }}>


    

    {loadingcy ? (
           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
           <CircularProgress size={150} />
         </div>
      ) : (
        <>

      <div id="formPorder">
          <h2 className='topicMain'>{isEdit ? "Update Product Item" : "Add New Product Item"}</h2>
          <form>

            <label htmlFor="id" className='topicSubs'>Product ID: </label>
            <input
              type="number"
              id="id"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              readOnly  
              className='boxesforInSe_D'
            />
            <br/>

            <label htmlFor="id" className='topicSubs'>Product Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='boxesforInSe_D'
            />
            <br/>

            <label htmlFor="id" className='topicSubs'>Product Price: </label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='boxesforInSe_D'
            />
            <br/>

            <label htmlFor="id" className='topicSubs'>Short Description: </label>
            <input
              type="text"
              id="sdes"
              name="sdes"
              value={sdes}
              onChange={(e) => setSdes(e.target.value)}
              className='boxesforInSe_D'
            />
            <br/>

            <label htmlFor="id" className='topicSubs'>Long Description: </label>
            <input
              type="text"
              id="des"
              name="des"
              value={des}
              onChange={(e) => setDes(e.target.value)}
              className='boxesforInSe_D'
            />
            <br/>

           

            <label htmlFor="id" className='topicSubs'>Product Category: </label>
            <table style={{ marginLeft: "50px", borderSpacing: "0" }}>
              <tr>
                <td>
                  <label htmlFor="bookitem" style={{ marginRight: "10px", display: "block" }}>
                    Book Item
                  </label>
                </td>
                <td>
                  <input
                    type="radio"
                    id="bookitem"
                    name="item"
                    value="bookitem"
                    onChange={(e) => setItem(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="schoolitem" style={{ marginRight: "10px" }}>
                    School Item
                  </label>
                </td>
                <td>
                  <input
                    type="radio"
                    id="schoolitem"
                    name="item"
                    value="schoolitem"
                    onChange={(e) => setItem(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="techitem" style={{ marginRight: "10px" }}>
                    Tech Item
                  </label>
                </td>
                <td>
                  <input
                    type="radio"
                    id="techitem"
                    name="item"
                    value="techitem"
                    onChange={(e) => setItem(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="mobileitem" style={{ marginRight: "10px" }}>
                    Mobile Item
                  </label>
                </td>
                <td>
                  <input
                    type="radio"
                    id="mobileitem"
                    name="item"
                    value="mobileitem"
                    onChange={(e) => setItem(e.target.value)}
                  />
                </td>
              </tr>
              </table>
            <br/>


            {isMobile && (
                <Grid
                  item
                  xs={12} // Take up full width on extra small screens
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // Center align on mobile
                    marginTop: "20px", // Adjust top margin for better spacing
                  }}
                >
                  <div
                    className="App"
                    style={{
                      width: "80%", // Adjust width for better fit on mobile
                      height: "250px",
                      border: "2px dashed #ccc",
                      borderRadius: "5px",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#9B9B9B",
                    }}
                  >
                    <p>Drag & Drop</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      style={{ display: "none" }}
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ width: "80%", height: "180px", marginTop: "10px" }} // Adjust width for better fit
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    style={{
                      width: "80%", // Adjust width for better fit
                      marginTop: "10px",
                      backgroundColor: "#404040",
                      color: "white",
                      border: "1px solid darkblue",
                      borderRadius: "5px",
                      padding: "10px 15px",
                      cursor: "pointer",
                    }}
                  />
                </Grid>
              )}

              {!isMobile && (
                <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "300px", // Maximizes the drop-down box size
                  marginBottom: "20px",
                  marginLeft: "20px",
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                >
                <div
                  className="App"
                  style={{
                    
                    width: "500px", 
                    height: "250px",
                    border: "2px dashed #ccc",
                    borderRadius: "5px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#9B9B9B",
                  }}
                >
                  <p>Drag & Drop</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        style={{ display: "none" }}
                      />
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{ width: "180px", height: "180px", marginTop: "10px" }}
                        />
                      )}
                    </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        style={{
                          width: "500px",
                          marginTop: "10px",
                          backgroundColor: "#404040", 
                          color: "white", 
                          border: "1px solid darkblue", 
                          borderRadius: "5px",
                          padding: "10px 15px",
                          cursor: "pointer", 
                      }}
                      />


                </Grid>
              )}


            <label htmlFor="copies" className='topicSubs'>Availabl Stock: </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={stock}
              defaultValue={0}
              onChange={(e) => setStock(e.target.value)}
              className='boxesforInSe_D'
            />
            <br/>

            <div style={{ color: "#000000" }}>
                {loading && <LinearProgress />}
            </div>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                <Button
                  sx={{
                    margin: "auto",
                    marginBottom: "20px",
                    backgroundColor: "#0047ab",
                    color: "#ffffff",
                    padding: "10px 50px",
                    "&:hover": {
                      opacity: "0.7",
                      backgroundColor: "#0047ab",
                    },
                  }}
                  onClick={handleSaveButtonClick}
                >
                  {isEdit ? "Update Product" : "Add Product"}
                </Button>
                
              </div>
                    
                    
          </form>

          
        </div>










        </>
      )}



    </div>
  );
};

export default UserForm;
