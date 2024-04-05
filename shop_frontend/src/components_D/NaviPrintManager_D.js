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
      <a href="/AdminMain_D" className="mr-10 hover:text-gray-300">Home</a>
        <a href="/PrintingOrderDisplayAdmin_D" className="mr-10 hover:text-gray-300">All Printing Orders</a>
        <a href="/PriceChartDisplay_D" className="mr-10 hover:text-gray-300">Price Chart</a>
      </div>
     


      <div className="flex items-center mr-10 ">
        <a href="#" className="mr-10 hover:text-gray-300">My Account <i className="fas fa-user"></i></a>
        <a href="/" className="hover:text-gray-300">Logout</a>
      </div>
    </nav>
  );
};

export default NaviBar;
