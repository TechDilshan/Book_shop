import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Paper } from "@mui/material";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  table: {
    width: '100%',
    border: '1px solid #000',
    borderCollapse: 'collapse',
    marginBottom: 20,
    fontSize: 12,
  },
  tableRow: {
    borderBottom: '1px solid #000',
  },
  tableCell: {
    padding: 8,
    borderRight: '1px solid #000',
  },

  topic: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', 
    padding: 10, 
    marginTop: 20,
  },
});


const AdminDisplay = ({ rows, selectedUser, deleteUser }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/users');
    window.location.reload();
  };

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(rows.map(async (row) => {
        try {
          const url = await getDownloadURL(ref(storage, `images/${row.imgId}`));
          return { id: row.id, url };
        } catch (error) {
          console.error('Error fetching image URL:', error);
          return null;
        }
      }));
      setImageUrls(urls.filter(url => url !== null));
    };
    fetchImageUrls();
  }, [rows]);

  const handleUpdateButtonClick = (id) => {
    const selectedUserData = rows.find(row => row.id === id);
    selectedUser(selectedUserData);
  };
  
  const handleCategoryButtonClick = (category) => {
    setSelectedCategory(category);
  };

  const MyDocument = ({ data }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.topic}>Rathiy Intech {selectedCategory} Available Item List</Text>
        <View style={styles.table}>
          {data.map((row) => (
            <View key={row.id} style={styles.tableRow}>
              <Text style={styles.tableCell}> Product ID : {row.id}</Text>
              <Text style={styles.tableCell}> Product Name : {row.name}</Text>
              <Text style={styles.tableCell}> Available Stock : {row.stock}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
  
  

  const filteredRows = selectedCategory === 'All' ? rows : rows.filter(row => row.item === selectedCategory);

  return (
    <div>

      <Button onClick={() => handleCategoryButtonClick('All')}>All Items</Button>
      <Button onClick={() => handleCategoryButtonClick('bookitem')}>Book Items</Button>
      <Button onClick={() => handleCategoryButtonClick('schoolitem')}>School Items</Button>
      <Button onClick={() => handleCategoryButtonClick('mobileitem')}>Mobile Items</Button>
      <Button onClick={() => handleCategoryButtonClick('techitem')}>Tech Items</Button>

      {selectedCategory && (
        <PDFDownloadLink document={<MyDocument data={filteredRows} />} fileName={`${selectedCategory}Products.pdf`}>
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Short Description</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => {
              const imageUrlObj = imageUrls.find(urlObj => urlObj.id === row.id);
              const imageUrl = imageUrlObj ? imageUrlObj.url : null;
              return (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    {imageUrl ? (
                      <img src={imageUrl} alt={`Photo-${row.id}`} style={{ width: '50px', height: '50px' }} />
                    ) : (
                      <div>No Image</div>
                    )}
                  </TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.sdes}</TableCell>
                  <TableCell>{row.des}</TableCell>
                  <TableCell>{row.item}</TableCell>
                  <TableCell>{row.stock}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleUpdateButtonClick(row.id)}>Update</Button>
                    <Button onClick={() => deleteUser({ id: row.id })}>Delete</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  );
};

export default AdminDisplay;
