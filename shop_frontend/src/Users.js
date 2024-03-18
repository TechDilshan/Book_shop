import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import UserForm from './UserForm';
import AdminDisplay from './AdminDisplay';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
          <Button onClick={handleDisplayButtonClick}>Display Users</Button>
        </div>
      )}
    </Box>
  );
};

export default Users;
