import React, { useState } from 'react';

const NaviBar = () => {
  const [showSubCategories, setShowSubCategories] = useState(false);

  const handleMouseEnter = () => {
    setShowSubCategories(true);
  };

  const handleMouseLeave = () => {
    setShowSubCategories(false);
  };

  const handleSubCategoryMouseEnter = () => {
    setShowSubCategories(true);
  };

  const handleSubCategoryMouseLeave = () => {
    setShowSubCategories(false);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center mb-4">
      {/* Left side: Home, Category, About, ContactUs */}
      <div className="flex items-center">
        <a href="#" className="mr-4 hover:text-gray-300">Home</a>
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <button className="mr-4 hover:text-gray-300">Category</button>
          {showSubCategories && (
            <div className="absolute bg-white text-gray-800 py-2 px-4 shadow-lg rounded-md mt-2" onMouseEnter={handleSubCategoryMouseEnter} onMouseLeave={handleSubCategoryMouseLeave}>
              <a href="#" className="block hover:bg-gray-200 py-1">Book Items</a>
              <a href="#" className="block hover:bg-gray-200 py-1">School Items</a>
              <a href="#" className="block hover:bg-gray-200 py-1">Tech Items</a>
              <a href="#" className="block hover:bg-gray-200 py-1">Mobile Items</a>
            </div>
          )}
        </div>
        <a href="#" className="mr-4 hover:text-gray-300">About</a>
        <a href="#" className="hover:text-gray-300">Contact Us</a>
      </div>
      {/* Right side: My Account and Cart icon */}
      <div className="flex items-center">
        <a href="#" className="mr-4 hover:text-gray-300">My Account</a>
        <a href="#" className="hover:text-gray-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </nav>
  );
};

export default NaviBar;
