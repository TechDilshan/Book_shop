import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import UserForm from './UserForm';
import AdminDisplay from './AdminDisplay';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Foot from '../footer';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [displayTable, setDisplayTable] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    Axios.get('http://localhost:3001/api/users')
      .then((response) => {
        setUsers(response.data?.response || []);
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  };

  const addUser = (data) => {
    setSubmitted(true);
    setIsEdit(false);

    const payload = {
      id: data.id,
      name: data.name,
      imgId: data.imgId,
      price: data.price,
      sdes: data.sdes,
      des: data.des,
      item: data.item,
      stock: data.stock,
    };

    Axios.post('http://localhost:3001/api/createuser', payload)
      .then((response) => {
        getUsers();
        setSubmitted(false);
        setDisplayTable(true);
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  };

  const updateUser = (data) => {
    setSubmitted(true);
    setIsEdit(false);

    const payload = {
      id: data.id,
      name: data.name,
      imgId: data.imgId,
      price: data.price,
      sdes: data.sdes,
      des: data.des,
      item: data.item,
      stock: data.stock,
    };

    Axios.post('http://localhost:3001/api/updateuser', payload)
      .then((response) => {
        getUsers();
        setSubmitted(false);
        setDisplayTable(true);
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  };

  const deleteUser = (data) => {
    Axios.post('http://localhost:3001/api/deleteuser', data)
      .then((response) => {
        getUsers();
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  };

  const handleDisplayButtonClick = () => {
    setDisplayTable(true);
    setSelectedUser({});
    setIsEdit(false); // Reset isEdit when displaying the table
  };

  return (
    <div class="w-calc(100% - 100px) mx-auto mt-10 lg:ml-10 lg:mr-8" style={{ backgroundColor: '#c3ddec' }}>
        
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center mb-4">
          <div className="flex items-center ml-10 ">
            <a href="/users" className="mr-10 hover:text-gray-300">Add Product</a>
            <a href="#" className="mr-10 hover:text-gray-300" onClick={handleDisplayButtonClick}>Display Product</a> 
          </div>
          <div className="flex items-center mr-10 ">
            <a href="#" className="mr-10 hover:text-gray-300">My Account <i className="fas fa-user"></i></a>
            <a href="/" className="hover:text-gray-300">Logout</a>
          </div>
        </nav>
      
    <Box sx={{ width: 'calc(100% - 100px)', margin: 'auto', marginTop: '100px' }}>
      
      {displayTable ? (
        <AdminDisplay
          rows={users}
          selectedUser={(user) => {
            setSelectedUser(user);
            setIsEdit(true);
            setDisplayTable(false);
          }}
          deleteUser={deleteUser}
        />
      ) : (
        <div>
          <UserForm
            addUser={addUser}
            updateUser={updateUser}
            submitted={submitted}
            data={selectedUser}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </div>
      )}
    </Box>

    <div>
        <Foot/>
      </div>
    </div>
  );
};

export default Users;
