import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, TextField,  Dialog, DialogContent } from '@mui/material';
import ProductItem_C from './ProductItem_C';
import Navi from '../Navi';
import Foot from '../footer';
import Axios from 'axios';
import { AiOutlinePlus ,AiOutlineSearch } from 'react-icons/ai';
import '../CSS_C/ProductHomeCSS_C.css';



const UserHome_C = () => {
  const [users, setUsers] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showAllBook, setShowAllBook] = useState(false);
  const [showAllSchool, setShowAllSchool] = useState(false);
  const [showAllTech, setShowAllTech] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [maxPrice, setMaxPrice] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [category, setCategory] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

    const getUsers = () => {
      const fetchUsers = () => {
        Axios.get('https://book-shop-dep.vercel.app/api/users')//'http://localhost:3001/api/users'
          .then((response) => {
            setUsers(response.data?.response || []);
            setLoading(false); 
          })
          .catch((error) => {
            console.error('Axios Error: ', error);
          });
      };

      fetchUsers();
      const intervalId = setInterval(fetchUsers, 1000);
      return () => clearInterval(intervalId);
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

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const handleOkButtonClick = () => {
   
    console.log(minPrice,maxPrice);
    const filtered = users.filter(user => {
      const isInPriceRange = (user.price >= minPrice && user.price <= maxPrice);
      const isMatchingCategory = (user.item === category);
      return isInPriceRange && isMatchingCategory;
    });
    // Update the state variable with filtered items
    setFilteredItems(filtered);
    console.log(filteredItems);
    // Close the form
    setShowForm(false);
  };

  const clearFilteredItems = () => {
    setFilteredItems([]);
    setSearchTerm('');
  };

  return (
    
    <div class="w-calc(100% - 100px) mx-auto mt-2 lg:ml-2 lg:mr-2" style={{ backgroundColor: "#e0f2fe" }}>
      <div>
        <Navi/>
      </div>
      
      {loading ? (
           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
           <CircularProgress size={150} />
         </div>
      ) : (
        <>

      <div class="flex justify-end w-full px-2">
        <div class="flex space-x-4 w-full max-w-screen-lg items-center" >

        {(filteredItems.length > 0 || visibleUsers.length > 0) && (
          <button onClick={clearFilteredItems} className="flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Clear
          </button>
        )}

        

        <button onClick={toggleFormVisibility} className="flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M2 4a1 1 0 011-1h14a1 1 0 011 1v1a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm1 4a1 1 0 011-1h5a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm1 4a1 1 0 011-1h8a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1z" clipRule="evenodd" />
          </svg>
          Filter
        </button>

          {showForm && (
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-300 w-96 h-82 shadow-lg rounded-lg border-4 border-black border-solid z-50">

                <div className="relative flex flex-col h-full">
                  <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={toggleFormVisibility}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <DialogContent className="p-4">
                  <form>
                      <input 
                        type="number" 
                        placeholder="Max Price" 
                        className="w-full mb-2 p-2 border rounded-md" 
                        value={maxPrice} 
                        onChange={(e) => setMaxPrice(e.target.value)} 
                      />
                      <input 
                        type="number" 
                        placeholder="Min Price" 
                        className="w-full mb-2 p-2 border rounded-md" 
                        value={minPrice} 
                        onChange={(e) => setMinPrice(e.target.value)} 
                      />
                      <label htmlFor="category" className='itemRow'>Product Category: </label>
                      <select
                        id="category"
                        className="w-full mb-4 p-2 border rounded-md"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">Select Category</option>
                        <option value="bookitem">Book Item</option>
                        <option value="schoolitem">School Item</option>
                        <option value="techitem">Tech Item</option>
                        <option value="mobileitem">Mobile Item</option>
                      </select>
                      <div className="flex justify-end">
                        <button 
                          className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2" 
                          type="button"
                          onClick={handleOkButtonClick}
                        >
                          Filter
                        </button>
                        <button 
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-gray-300" 
                          type="button"
                          onClick={toggleFormVisibility}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </DialogContent>
                </div>
              </div>
            )}




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

      <div class="bg-light-blue-50 p-2 flex flex-col" style={{ backgroundColor: "#e0f2fe" }}>
        <div class="flex flex-wrap justify-center">
          {visibleUsers.map((user) => (
            <div key={user.id} class="flex-shrink-0 m-2 md:m-1">
              <ProductItem_C rows={[user]} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-light-blue-50 p-2 flex flex-col" style={{ backgroundColor: "#e0f2fe" }}>
        <div className="flex flex-wrap justify-center">
          {filteredItems.map((user) => (
            <div key={user.id} className="flex-shrink-0 m-2 md:m-1">
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


      <div class="container_p">
        <div class="image-container_p">
          <img src="https://www.franklinprints.com/images/upload/images/flyer-brochure-printing.jpg" alt="Placeholder"/>
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



      <div>
        <Foot/>
      </div>
      </>
      )}
    </div>
      
  );
};

export default UserHome_C;
