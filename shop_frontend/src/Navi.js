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
      <div className="flex items-center ml-10 ">
        <a href="#" className="mr-10 hover:text-gray-300">Home</a>
        <a href="#" className="mr-10 hover:text-gray-300">About Us</a>
        <a href="#" className="mr-10 hover:text-gray-300">Printing</a>
        
      </div>
     


      <div className="flex items-center mr-10 ">
        <a href="/shopping-cart" className="mr-10 hover:text-gray-300"><i className="fa-solid fa-cart-shopping"></i></a>
        <a href="#" className="mr-2 hover:text-gray-300">My Account <i className="fas fa-user"></i></a>
        
      </div>
    </nav>
  );
};

export default NaviBar;
