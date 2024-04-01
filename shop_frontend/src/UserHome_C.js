import React, { useEffect, useState } from 'react';
import { Box, Button, TextField} from '@mui/material';
import ProductItem_C from './ProductItem_C';
import Navi from './Navi';
import Axios from 'axios';
import { AiOutlinePlus ,AiOutlineSearch } from 'react-icons/ai';
import './CSS_C/ProductHomeCSS_C.css';



const UserHome_C = () => {
  const [users, setUsers] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showAllBook, setShowAllBook] = useState(false);
  const [showAllSchool, setShowAllSchool] = useState(false);
  const [showAllTech, setShowAllTech] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBarFocused, setSearchBarFocused] = useState(false);

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

   // Filtered items based on search term
   const filteredUsers = users.filter(user => {
    if (searchTerm.trim() === '') {
      return false; // If search term is empty, hide all items
    } else {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  // Determine which items to display based on search bar focus
  let visibleUsers;
  if (searchBarFocused) {
    visibleUsers = filteredUsers;
  } else {
    visibleUsers = showAll ? users : filteredUsers.slice(0, 8);
  }

  const bookItems = users.filter(user => user.item === 'bookitem');
  const visibleUsersBook = showAllBook ? bookItems : bookItems.slice(0, 8);

  const schoolItems = users.filter(user => user.item === 'schoolitem');
  const visibleUsersSchool = showAll ? schoolItems : schoolItems.slice(0, 8);

  const techItem = users.filter(user => user.item === 'techitem');
  const visibleUsersTech = showAll ? techItem : techItem.slice(0, 8);

  const mobileItem  = users.filter(user => user.item === 'mobileitem');
  const visibleUsersMobile = showAll ? mobileItem : mobileItem.slice(0, 8);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      toggleDropdown(); // Close the dropdown after navigation
    }
  };

  const [userEmail, setUserEmail] = useState('');
  useEffect(() => {
    // Retrieve the email from sessionStorage
    const email = sessionStorage.getItem('userEmail');
    setUserEmail(email);
  }, []);

  console.log(userEmail)

  return (
    
    <div class="w-calc(100% - 100px) mx-auto mt-10 lg:ml-10 lg:mr-8">
      <div>
        <Navi/>
      </div>


      <div class="flex justify-end w-full px-2">
        <div class="flex space-x-4 w-full max-w-screen-lg items-center">
          <div class="relative inline-block text-left">
            <button
              type="button"
              class="inline-flex justify-center items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={toggleDropdown}
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              Category
            </button>

            {isOpen && (
              <div class="dropdown-menu">
                <div class="py-1">
                  <a href="#" class="dropdown-item" onClick={() => scrollToSection("book-items-section")}>All Items</a>
                  <a href="#" class="dropdown-item" onClick={() => scrollToSection("book-items-section")}>Book Items</a>
                  <a href="#" class="dropdown-item" onClick={() => scrollToSection("school-items-section")}>School Items</a>
                  <a href="#" class="dropdown-item" onClick={() => scrollToSection("tech-items-section")}>Tech Items</a>
                  <a href="#" class="dropdown-item" onClick={() => scrollToSection("mobile-items-section")}>Mobile Items</a>
                </div>
              </div>
            )}
          </div>

          <input
            type="text"
            class="block flex-grow px-2 py-1 text-blue-900 bg-white border border-blue-900 rounded-full focus:border-blue-900 focus:ring-blue-900 focus:outline-none focus:ring focus:ring-opacity-40 sm:px-4 sm:py-2 sm:text-base"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setSearchBarFocused(true)}
            onBlur={() => setSearchBarFocused(false)}
          />
        </div>
      </div>

      <div class="bg-light-blue-50 p-2 flex flex-col">
        <div class="flex flex-wrap justify-center">
          {visibleUsers.map((user) => (
            <div key={user.id} class="flex-shrink-0 m-2 md:m-1">
              <ProductItem_C rows={[user]} />
            </div>
          ))}
        </div>
      </div>




      <div id="book-items-section" class="product-section">
  <div class="section-header">
    <div>Book Items Products</div>
    {showAllBook && (
      <button
        onClick={() => setShowAllBook(false)}
        class="show-less-button"
      >
        Show less
      </button>
    )}
  </div>
  <div class="product-grid">
    {visibleUsersBook.map((user) => (
      <div key={user.id} class="product-item">
        <ProductItem_C rows={[user]} />
      </div>
    ))}
    {!showAllBook && (
      <button
        onClick={() => setShowAllBook(true)}
        class="show-more-button"
      >
        See more
      </button>
    )}
  </div>
</div>

<div id="school-items-section" class="product-section">
  <div class="section-header">
    <div>School Items Products</div>
    {showAllSchool && (
      <button
        onClick={() => setShowAllSchool(false)}
        class="show-less-button"
      >
        Show less
      </button>
    )}
  </div>
  <div class="product-grid">
    {visibleUsersSchool.map((user) => (
      <div key={user.id} class="product-item">
        <ProductItem_C rows={[user]} />
      </div>
    ))}
    {!showAllSchool && (
      <button
        onClick={() => setShowAllSchool(true)}
        class="show-more-button"
      >
        See more
      </button>
    )}
  </div>
</div>

<div id="tech-items-section" class="product-section">
  <div class="section-header">
    <div>Tech Items Products</div>
    {showAllTech && (
      <button
        onClick={() => setShowAllTech(false)}
        class="show-less-button"
      >
        Show less
      </button>
    )}
  </div>
  <div class="product-grid">
    {visibleUsersTech.map((user) => (
      <div key={user.id} class="product-item">
        <ProductItem_C rows={[user]} />
      </div>
    ))}
    {!showAllTech && (
      <button
        onClick={() => setShowAllTech(true)}
        class="show-more-button"
      >
        See more
      </button>
    )}
  </div>
</div>

<div id="mobile-items-section" class="product-section">
  <div class="section-header">
    <div>Mobile Items Products</div>
    {showAllMobile && (
      <button
        onClick={() => setShowAllMobile(false)}
        class="show-less-button"
      >
        Show less
      </button>
    )}
  </div>
  <div class="product-grid">
    {visibleUsersMobile.map((user) => (
      <div key={user.id} class="product-item">
        <ProductItem_C rows={[user]} />
      </div>
    ))}
    {!showAllMobile && (
      <button
        onClick={() => setShowAllMobile(true)}
        class="show-more-button"
      >
        See more
      </button>
    )}
  </div>
</div>

      



    </div>
  );
};

export default UserHome_C;
