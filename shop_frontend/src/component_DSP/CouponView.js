import logo from "../image/logo.jpg";
import  axios  from 'axios';
import React, { useState, useEffect } from 'react';
import Navi from '../Navi';
import Foot from '../footer';


function CouponView(){
    const [coupons , setCoupons] = useState([])
    const currentDate = new Date();
    const date = currentDate.toISOString().split('T')[0]; // Extracting date part only
    const [searchQuery, setSearchQuery] = useState('');


    const getCouponsDB = () =>{
        axios.get("http://localhost:3001/api/getcoupon/")
        .then((res) =>{
          setCoupons(res.data);    
            console.log(res.data);
        })
        .catch((err) =>{
          alert(err.message);
        });
      }


      const handleInputChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
    
        // Filter students based on the search query as you type
        const filteredCoupons = coupons.filter(coupon =>
          coupon.couponId.toLowerCase().includes(query) || coupon.ExpDate.toLowerCase().includes(query)
        );
        setCoupons(filteredCoupons);
      };


      
    useEffect(()=>{
        if (coupons.length === 0) {
          getCouponsDB();
          console.log("Get data From DB");
          console.log(date)
        }
      },)

    return (
      <div>
      <div className=' w-[100%]' >
         <Navi/>
      </div>

<div className="m-10">
      <div class="flex">
        <h1 class="text-3xl font-bold mb-4 w-full">Coupon & Promotion Management</h1>
      </div>



    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-black">Search</label>
      <div class="relative">
    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-300 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
    </div>
    <input type="text" id="default-search" value={searchQuery} onChange={handleInputChange} class="block w-full p-4 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by Coupon Code, Exp.Date..." required/>

      </div>
  </div>
        <div className=" grid justify-center mt-10 ml-[-50%]">
          
        {coupons.map((cpn) => (
            <div key={cpn._id}>
            <div className="w-[00px] h-[200px] relative">
                <div className="w-[870px] h-[159px] left-0 top-0 content-center">
                    <div className="w-[870px] h-[159px] left-0 top-0 absolute bg-white rounded-[5px] border border-stone-300" />
                    <div className="w-[100px] h-[159px] left-0 top-0 absolute">
                        <div className="w-[100px] h-[159px] left-0 top-0 absolute bg-indigo-500 bg-opacity-10 rounded-tl-[5px] rounded-bl-[5px]" />
                        <div className="w-[100px] left-0 top-[40px] absolute text-center">
                            {
                                cpn.discountType == "Percentage_Discount" ? 
                                
                            <div>
                            <span className="text-cyan-600 text-[34px] font-medium font-['Poppins'] leading-10">{cpn.discountPercentage}%
                            <br />
                            </span><span className="text-cyan-600 text-[34px] font-normal font-['Poppins'] leading-10">off</span>
                            </div>
                                :
                                
                                <div>    
                                <span className="text-cyan-600 text-[34px] font-medium font-['Poppins'] leading-10">Rs {cpn.fixedAmount}</span>
                                <br />
                                <span className="text-cyan-600 text-[34px] font-normal font-['Poppins'] leading-10">off</span>
                                </div>
                            }
                            
                        </div>
                   
                    <div className="w-[150px] h-[158px] ml-[100px] m-1">
                        <img src={logo}/>
                    </div>
                    </div>
                    {
                                cpn.discountType == "Percentage_Discount" ? 
                                
                             <div className="w-[364px] h-[29px] left-[352px] top-[22px] absolute text-zinc-800 text-[21px] font-medium font-['Poppins']">{cpn.discountPercentage}% Off Coupon | </div>
                                :
                                
                                 <div className="w-[364px] h-[29px] left-[352px] top-[22px] absolute text-zinc-800 text-[21px] font-medium font-['Poppins']">Rs {cpn.fixedAmount} Off Coupon | </div>
                            }
                   
                    <div className="w-[343px] h-[70px] left-[282px] top-[69px] absolute text-center text-neutral-600 text-base font-normal font-['Poppins']">{cpn.description}</div>



                    <div className="w-[200px] h-10 left-[655px] top-[21px] absolute">
                        <div className="w-[200px] h-10 left-0 top-0 absolute bg-cyan-600 rounded-[5px]" />
                        <div className="left-[80px] top-[8px] absolute text-center text-white text-[15px] font-semibold font-['Poppins']">Code : {cpn.couponId}</div>
                    </div>

                    <div className="w-[200px] h-10 left-[570px] top-[21px] absolute">
                    <button onClick={() => navigator.clipboard.writeText(cpn.couponId)} className="w-[120px] h-10 left-[40px]  bg-gray-400 absolute text-center hover:bg-red-500 text-white text-[15px] rounded-[50px] font-semibold font-['Poppins']" > 
                        Copy Code
                     </button>
                   </div>

                    <div className="w-[142px] h-[22px] left-[684px] top-[60px] absolute">
                        <div className="w-4 h-4 py-[0.39px] left-0 top-[4px] absolute justify-center items-center inline-flex" />

                        {
                                cpn.ExpDate >= date ? 
                                
                                <div className="w-[121px] h-[22px] left-[21px] top-0 absolute text-cyan-600 text-[15px] font-medium font-['Poppins']">Coupon verified</div>
                                :
                                
                                <div className="w-[150px] h-[22px] left-[21px] top-0 absolute text-red-600 text-[15px] font-medium font-['Poppins']">Coupon Expired</div>
                            }
                       
                    </div>
                    <div className="w-[150px] h-[22px] left-[655px] top-[90px] absolute text-stone-500 text-[15px] font-normal font-['Poppins']">Min Purchase Count : {cpn.minCount}</div>
                    <div className="w-[300px] h-[22px] left-[600px] top-[130px] absolute text-stone-500 text-[15px] font-normal font-['Poppins']"> Expire Date : {cpn.ExpDate}</div>

                    </div>

            </div> 
            
            </div>




          ))}

           
        </div>   
        <div>
        <Foot/>
      </div>
         </div>
    );
}

export default CouponView;
