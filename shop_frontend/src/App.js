// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import './index.css';
import 'tailwindcss/tailwind.css';
import { FaShoppingCart } from 'react-icons/fa';


export default function App() {
  return (

   
<div className="flex justify-center items-center h-screen bg-slate-100">
  <div className="flex flex-col p-1 space-y-1 bg-white rounded-md shadow-md border border-gray-300 hover:border-2 hover:border-blue-500 transition duration-300 hover:bg-gray-200">
    <div>
      <div className="bg-gray-100 rounded-md overflow-hidden mb-1 cursor-pointer">
        <img className="mx-auto w-full h-40 hover:scale-105" src="https://yarlmart.lk/wp-content/uploads/2021/09/ATLAS-CR-BOOK-120-PAGES.jpg" alt="product" />
      </div>
    </div>

    <div className="flex flex-col space-y-1">
      <div className="flex flex-col mb-1 space-y-1 text-center md:text-center">
        <div>
          <div className="text-xxs inline-block px-2 py-1 text-white bg-blue-500 shadow-md w-full">
            CR Book
          </div>
        </div>
        <div className="max-w-xs text-xs font-medium mb-1">
          Atles 80 page CR book
        </div>
        <div className="flex flex-row justify-between items-center mb-1 space-y-1 text-center md:text-left">
          <p className="text-xxs font-bold">LKR. 299.00</p>
        </div>
        <div className="flex items-center justify-between mb-1 space-y-1 text-center md:text-left">
          <div className="flex items-center space-x-2 mr-6"> {/* Added mr-4 for right margin */}
            <button className="px-2 py-1 bg-gray-200 rounded-md">-</button>
            <input type="number" className="text-xs w-12 h-8 text-sm text-center border-gray-300 rounded-md" defaultValue="1" min="1" readOnly />
            <button className="px-2 py-1 bg-gray-200 rounded-md">+</button>
          </div>
          <button className="w-20 h-8 bg-blue-700 text-white border-b-1 border-blue-700 hover:bg-blue-800 hover:border-blue-800 hover:shadow-lg text-xs rounded-md flex justify-center items-center space-x-1">
            <FaShoppingCart />
            <span>Add</span>
          </button>
        </div>

        <div className="flex items-center space-x-1 group">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:animate-ping"></div>
          <div className="text-xs">
            50+ pcs. in stock
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


 
  




    




  
   



    
  )
}



