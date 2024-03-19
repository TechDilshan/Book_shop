// StockDetails.js

import React from 'react';
//import './stockDetails.css'; // Import your CSS file
import PromoPage from './PromoPage';

function Dashboard() {
  return (
    <div className='flex mx-auto'>
    <div className="h-screen sticky top-0 bg-gray-100 shadow-xl w-64">
      <div className="px-8 pt-10">
        <div className="py-4 text-black text-2xl font-bold pt-5">Rathi Intech</div>
        <nav className="mt-8 pt-10">
          <a className="block my-6 py-2.5 px-4 rounded transition duration-200 bg-gray-300 hover:bg-gray-700 hover:text-white" href="couponpage" target="iframe_a">Manage Coupon</a>
          <a className="block my-6 py-2.5 px-4 rounded transition duration-200 bg-gray-300 hover:bg-gray-700 hover:text-white" href="couponpage" target="iframe_a">Genarate Report</a>
          <a className="block my-6 py-2.5 px-4 rounded transition duration-200 bg-gray-300 hover:bg-gray-700 hover:text-white" href="promopage" target="iframe_a">Test Coupons</a>
          <a className="block my-6 py-2.5 px-4 rounded transition duration-200 bg-gray-300 hover:bg-red-500 hover:text-white"href="">Logout</a>
        </nav>
      </div>
    </div>
    <div className="md:container md:mx-auto ">
        
    <header className="flex justify-between items-center m-10">
        <img src="css/logo.png" alt="Logo" className="w-16" />
        <div className="text-center">
          <h1 className="text-2xl font-bold">Promotion & Coupon Management Dashboard</h1>
          <h4 className="text-sm text-gray-600">Promotion and Coupon Manager</h4>
        </div>
        <div className="flex items-center">

          <div className="text-center">
            <p className="font-medium">Welcome</p>
            <button className="bg-green-500 text-white rounded-md px-4 py-2">DILINA</button>
          </div>
        </div>
      </header>

      <hr className="horizontal-line"/>

      <main>
        <iframe src="couponpage"name="iframe_a"  className=" columns-2"height="600px" width="100%" title="Iframe Example"></iframe>
      </main>

    </div>
    </div>
  );
}

export default Dashboard;
