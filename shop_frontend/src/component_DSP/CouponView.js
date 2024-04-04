import logo from "../image/logo.jpg";
import  axios  from 'axios';
import React, { useState, useEffect } from 'react';



function CouponView(){
    const [coupons , setCoupons] = useState([])
    const currentDate = new Date();
    const date = currentDate.toISOString().split('T')[0]; // Extracting date part only
    


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


      
    useEffect(()=>{
        if (coupons.length === 0) {
          getCouponsDB();
          console.log("Get data From DB");
          console.log(date)
        }
      },)

    return (
        <div>
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
    );
}

export default CouponView;
