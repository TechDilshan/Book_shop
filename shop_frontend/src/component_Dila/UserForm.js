import React, { useEffect, useState } from "react";
import { Button, Grid, Input, Typography } from "@mui/material";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import Axios from 'axios';

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
      const response = await Axios.get('http://localhost:3001/api/getmaxid');
      const maxId = response.data?.maxId || 0; 
      isEdit ? setId(data.id) : setId(maxId + 1);
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
    let uploadedImgId = imgId;
    if (imageUpload) {
      uploadedImgId = await uploadFile();
    }

    setImgId(uploadedImgId);
    isEdit ? updateUser({ id, name, price, sdes, des, item, stock, imgId: uploadedImgId }) : addUser({ id, name, price, sdes, des, item, stock, imgId: uploadedImgId });
  };

  const handleSaveButtonClick = () => {
    handleUserDataUpdate();
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


  return (
   < div style={{ color: "#000000" }}>
    <Grid
      container
      spacing={2}
      sx={{
        backgroundColor: "#ffffff",
        marginBottom: "30px",
        marginTop: "30px",
        display: "block",
      }}
    >

      <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
        <Typography
          component={"label"}
          htmlFor="id"
          sx={{
            color: "#000000",
            marginRight: "20px",
            fontSize: "16px",
            width: "100px",
            display: "block",
          }}
        >
          ID
        </Typography>
        <Input
          type="number"
          id="id"
          name="id"
          sx={{
            width: "400px",
          }}
          value={id}
          onChange={(e) => setId(e.target.value)}
          readOnly  
        />
      </Grid>

      <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
        <Typography
          component={"label"}
          htmlFor="id"
          sx={{
            color: "#000000",
            marginRight: "20px",
            fontSize: "16px",
            width: "100px",
            display: "block",
          }}
        >
          Name
        </Typography>
        <Input
          type="text"
          id="name"
          name="name"
          sx={{
            width: "400px",
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>


      <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
        <Typography
          component={"label"}
          htmlFor="id"
          sx={{
            color: "#000000",
            marginRight: "20px",
            fontSize: "16px",
            width: "100px",
            display: "block",
          }}
        >
          Price
        </Typography>
        <Input
          type="number"
          id="price"
          name="price"
          sx={{
            width: "400px",
          }}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
        <Typography
          component={"label"}
          htmlFor="sdes"
          sx={{
            color: "#000000",
            marginRight: "20px",
            fontSize: "16px",
            width: "100px",
            display: "block",
          }}
        >
          Short Description
        </Typography>
        <Input
          type="text"
          id="sdes"
          name="sdes"
          sx={{
            width: "400px",
          }}
          value={sdes}
          onChange={(e) => setSdes(e.target.value)}
        />
      </Grid>


      <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
        <Typography
          component={"label"}
          htmlFor="id"
          sx={{
            color: "#000000",
            marginRight: "20px",
            fontSize: "16px",
            width: "100px",
            display: "block",
          }}
        >
          Description
        </Typography>
        <Input
          type="text"
          id="des"
          name="des"
          sx={{
            width: "400px",
          }}
          value={des}
          onChange={(e) => setDes(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
<Typography
  component={"label"}
  htmlFor="id"
  sx={{
    color: "#000000",
    marginRight: "20px",
    fontSize: "16px",
    width: "100px",
    display: "block",
  }}
>
  Categories
</Typography>

<table style={{ marginLeft: "150px", borderSpacing: "0" }}>
<tr>
  <td>
    <label htmlFor="bookitem" style={{ marginRight: "10px" }}>
      Book Item
    </label>
  </td>
  <td>
    <Input
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
    <Input
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
    <Input
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
    <Input
      type="radio"
      id="mobileitem"
      name="item"
      value="mobileitem"
      onChange={(e) => setItem(e.target.value)}
    />
  </td>
</tr>
</table>

</Grid>



      <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
        <Typography
          component={"label"}
          htmlFor="stock"
          sx={{
            color: "#000000",
            marginRight: "20px",
            fontSize: "16px",
            width: "100px",
            display: "block",
          }}
        >
          Available stock
        </Typography>
        <Input
          type="number"
          id="stock"
          name="stock"
          sx={{
            width: "400px",
          }}
          value={stock}
          defaultValue={0}
          onChange={(e) => setStock(e.target.value)}
        />
      </Grid>
      
    </Grid>
    
    <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end", // Aligns the drop-down box to the right
          position: "absolute",
          top: "250px", // Adjust as needed
          right: "200px",
          width: "300px", // Maximizes the drop-down box size
          
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        >
        <div
          className="App"
          style={{
            width: "500px", // Utilizes full width of the grid item
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
                backgroundColor: "#404040", // Change the background color to dark blue
                color: "white", // Change the text color to white for better visibility
                border: "1px solid darkblue", // Add border to match the background color
                borderRadius: "5px", // Add border radius for rounded corners
                padding: "10px 15px", // Add padding for better appearance
                cursor: "pointer", // Change cursor to pointer when hovering over
              }}
              />


        </Grid>
    




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

    </div>
  );
};

export default UserForm;
