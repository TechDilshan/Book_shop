import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import UserForm from './UserForm';
import AdminDisplay from './AdminDisplay';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Foot from '../footer';
import '../CSS_C/navi.css';
import logo from '../image/logo.jpg';

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
      const getAdminDetails = () => {
        Axios.get('https://book-shop-dep.vercel.app/api/users')//http://localhost:3001/api/users
          .then((response) => {
            setUsers(response.data?.response || []);
          })
          .catch((error) => {
            console.error('Axios Error: ', error);
          });
      };
      getAdminDetails();
      const intervalId = setInterval(getAdminDetails, 1000);
      return () => clearInterval(intervalId);
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

    Axios.post('https://book-shop-dep.vercel.app/api/createuser', payload)//http://localhost:3001/api/createuser
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

    Axios.post('https://book-shop-dep.vercel.app/api/updateuser', payload)//http://localhost:3001/api/updateuser
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
    Axios.post('https://book-shop-dep.vercel.app/api/deleteuser', data)//http://localhost:3001/api/deleteuser
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
    <div class="w-calc(100% - 100px) mx-auto mt-2 lg:ml-2 lg:mr-2" style={{ backgroundColor: '#c3ddec' }}>

    <div class="menu-body">
      <nav>
      <ul class='nav-bar'>
          <li class='logo'><a href='/users'><img src={logo}/></a></li>
          <input type='checkbox' id='check' />
          <span class="menu">
              <li><a href="/users" class="phone-logo"><img src={logo}/></a></li>
              <li><a href="/users">Add Product</a></li>
              <li><a href="#" onClick={handleDisplayButtonClick}>Display Product</a></li>
              <li><a href="#">My Account <i className="fas fa-user"></i></a></li>
              <label for="check" class="close-menu"><i class="fas fa-times"></i></label>
              <li><a href="/">Logout</a></li>
          </span>
          <label for="check" class="open-menu"><i class="fas fa-bars"></i></label>
      </ul>
      </nav>
    </div>
      
    <Box sx={{ width: 'calc(100% - 100px)', margin: 'auto', marginTop: '40px' }}>
      
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
