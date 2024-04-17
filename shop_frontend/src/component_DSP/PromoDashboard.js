// StockDetails.js

import React from 'react';

import logo from '../image/logo.jpg'
import Navi from '../Navi';
import Foot from '../footer';
import { useNavigate} from 'react-router-dom'
import axios from 'axios'


function Dashboard() {
  const navigate = useNavigate()
  const handleLogout =()=>{
    axios.get('http://localhost:5000/auth/logout')
    .then(res => {
      if(res.data.status){
        sessionStorage.removeItem('userEmail');
        //window.location.reload();
        navigate('/')
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div >
      <div className='fixed w-[100%]' >
         <Navi/>
      </div>
       
      
    <div className='flex' >
      
    <div className="h-screen  bg-gray-100 shadow-xl w-64">
      <div className="px-8 pt-20">
        <div className="py-4 text-black text-2xl font-bold pt-5">Rathi Intech</div>
        <nav className="mt-8 pt-10">
          <a className="block my-6 py-2.5 px-4 rounded transition duration-200 bg-gray-300 hover:bg-gray-700 hover:text-white" href="couponpage" target="iframe_a">Manage Coupon</a>
          <a className="block my-6 py-2.5 px-4 rounded transition duration-200 bg-gray-300 hover:bg-gray-700 hover:text-white" href="viwerepo" target="iframe_a">Genarate Report</a>
          <a className="block my-6 py-2.5 px-4 rounded transition duration-200 bg-gray-300 hover:bg-gray-700 hover:text-white" href="promopagetest" target="iframe_a">Test Coupons</a>
          <button  onClick={handleLogout}>
          <a className="block my-6 py-2.5 px-4 rounded transition duration-200 bg-gray-300 hover:bg-red-500 hover:text-white"href="/">Logout</a>
          </button>
        </nav>
      </div>
    </div>

    {/* Header start */}
    <div className="md:container md:mt-[250px] ">
        
    <header className="flex justify-between items-center m-20">
        <img src={logo} alt="Logo" className="w-20" />
        <div className="text-center">
          <h1 className="text-2xl font-bold">Promotion & Coupon Management Dashboard</h1>
          <h4 className="text-sm text-gray-600">Promotion and Coupon Manager</h4>
        </div>
        <div className="flex items-center">

          <div className="text-center">
            <p className="font-medium">Welcome</p>
            <a href='/promomprofile' target="iframe_a"> 
            <button className="bg-green-500 text-white rounded-md px-4 py-2">DILINA</button>
            </a>
          </div>
        </div>
      </header>

    
<hr className='mt-[-50px]'/>
      <main>
        <iframe src="couponpage"name="iframe_a"  className=" columns-3 pt-2 "height="600px" width="100%" title="Iframe Example"></iframe>
      </main>

    </div>
    </div>
    <div>
        <Foot/>
      </div>
    </div>
  );
}

export default Dashboard;
