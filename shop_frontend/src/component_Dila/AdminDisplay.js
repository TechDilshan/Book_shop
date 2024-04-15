import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from "@mui/material";
import { Paper } from "@mui/material";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import StockUpdate_C from './StockUpdate_C';


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
  const [loadingcy, setLoadingcy] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const [stockup, setStockUp] = useState(0);

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
      setLoadingcy(false); 
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

  const filteredRows = selectedCategory === 'All' ? rows : 
    selectedCategory === 'outstock' ? rows.filter(row => row.stock === 0) :
    rows.filter(row => row.item === selectedCategory);

    const visibleRows = searchTerm.trim() === '' ? [] : filteredRows.filter(row => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return row.name.toLowerCase().includes(searchTermLowerCase) || row.id.toString().includes(searchTermLowerCase);
    });
    
    const handleStockButtonClick = (id) => {
      // Use the 'stock' state value when the button is clicked
      console.log("Stock Value:", stockup, "id is:", id);
      StockUpdate_C({ productId: id, stk: stockup, type: "admin" });
    };

  
  return (
    <div className="mb-8">
      {loadingcy ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress size={150} />
        </div>
      ) : (
        <>

          <div className="mb-25">
          

            <button onClick={() => handleCategoryButtonClick('All')} className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-2 mb-2">All Items</button>
            <button onClick={() => handleCategoryButtonClick('bookitem')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2">Book Items</button>
            <button onClick={() => handleCategoryButtonClick('schoolitem')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2">School Items</button>
            <button onClick={() => handleCategoryButtonClick('mobileitem')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2">Mobile Items</button>
            <button onClick={() => handleCategoryButtonClick('techitem')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2">Tech Items</button>
            <button onClick={() => handleCategoryButtonClick('outstock')} className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-2 mb-2">Out Of Stock</button>

          {selectedCategory && (
            <PDFDownloadLink document={<MyDocument data={filteredRows} />} fileName={`${selectedCategory}Products.pdf`} className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2 ml-32">
              {({ blob, url, loading, error }) => (loading ? 'Download PDF' : 'Download PDF')}
            </PDFDownloadLink>
          )}
        </div>

        <input
            type="text"
            className="block flex-grow px-2 py-1 mb-8 mt-8 text-blue-900 bg-white border border-blue-900 rounded-full focus:border-blue-900 focus:ring-blue-900 focus:outline-none focus:ring focus:ring-opacity-40 sm:px-4 sm:py-2 sm:text-base"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setSearchBarFocused(true)}
            onBlur={() => setSearchBarFocused(false)}
          />


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
                  <TableCell>Stock Update</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

              {visibleRows.map((row) => {
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
                        <TableCell>{row.stock} </TableCell>
                        <TableCell>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="number"
                            id="stockup"
                            name="stockup"
                            value={row.stockup}
                            defaultValue={0}
                            min={0}
                            onChange={(e) => setStockUp(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === '-' || e.key === 'e' || e.key === '.' || e.key === ',') {
                                e.preventDefault();
                              }
                            }}

                            className="border border-blue-500 px-2 py-1 rounded w-24"
                          />
                          <button 
                            onClick={handleStockButtonClick.bind(null, row.id)}
                            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                          >
                            Update Stock
                          </button>
                        </div>
                      </TableCell>
                        <TableCell>
                          <Button onClick={() => handleUpdateButtonClick(row.id)}>Update</Button>
                          <Button onClick={() => deleteUser({ id: row.id })}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}


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
                        <div className="flex items-center space-x-2">
                          <input 
                            type="number"
                            id="stockup"
                            name="stockup"
                            value={row.stockup}
                            defaultValue={0}
                            min={0}
                            onChange={(e) => setStockUp(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === '-' || e.key === 'e' || e.key === '.' || e.key === ',') {
                                e.preventDefault();
                              }
                            }}

                            className="border border-blue-500 px-2 py-1 rounded w-24"
                          />
                          <button 
                            onClick={handleStockButtonClick.bind(null, row.id)}
                            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                          >
                            Update Stock
                          </button>
                        </div>
                      </TableCell>


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
        </>
      )}
    </div>
  );
};

export default AdminDisplay;