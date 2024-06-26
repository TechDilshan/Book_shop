
import React, { useState, useEffect } from 'react';  // Import useEffect
import { useLocation , useParams} from 'react-router-dom';
import axios from 'axios';


const PromoPage = () => {
  const tot = 100; 
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [coupons , setCoupons] = useState([])
  const [couponCode , setcouponCode]=useState()

  const [subtotal, setSubtotal] = useState(tot);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(tot);

  const [cpntype , setCpntype] = useState("");
  const [cpnPer , setCpnPer] = useState(null);
  const [cpnAmount , setCpnAmount] = useState(null);


  const clearCoupon = () =>{
    setCpntype(null);
    setCpnPer(null);
    setCpnAmount(null);
    setTotal(tot)
    setSubtotal(tot)
    setDiscount(0)
    setcouponCode()
    setIsCouponApplied(false)
    document.getElementById('coupon').value = '';
    
  }



  const getCouponsDB = () =>{
    axios.get("http://localhost:3001/api/getcoupon/")
    .then((res) =>{
      setCoupons(res.data);    
    })
    .catch((err) =>{
      alert(err.message);
    });
  }

  

  const onChangeCouponTxt = (event) =>{
    const inputValue = event.target.value;
    setcouponCode(inputValue)
  }


  const handleApplyCoupon = (event) => {

      // If a coupon has already been applied, return early
  if (isCouponApplied) {
    return;
  }

  console.log(coupons);


  console.log("RuN THIS LINE");
  console.log(couponCode)

    const matchingCoupon = coupons.find(coupon => coupon.couponId == couponCode);


    if (matchingCoupon) {
     
      console.log("handleApplyCoupon");
      console.log("handleApplyCoupon");
      console.log(matchingCoupon)

      const today = new Date();
      const expirationDate = new Date(matchingCoupon.ExpDate);
  
      if (expirationDate < today) {
        alert("Coupon has expired and cannot be applied.");
        return;
      }

      setCpntype(matchingCoupon.discountType);

      if(matchingCoupon.discountType == "Percentage_Discount"){
      const couponPercentage = matchingCoupon.discountPercentage;

      setCpnPer(couponPercentage)
      const discountValue = subtotal * (couponPercentage / 100);
      const newSubtotal = subtotal - discountValue;
      
      setDiscount(discountValue);
      setSubtotal(newSubtotal);
     // setTax(newSubtotal * 0.2);
      setTotal(newSubtotal );
      setIsCouponApplied(true);

      console.log(newSubtotal)
      console.log(couponCode)
      }
      else if(matchingCoupon.discountType == "fixedAmount"){
        const discountValue = matchingCoupon.fixedAmount;
        setCpnAmount(discountValue);

        const newSubtotal = subtotal - discountValue;
      
        if (newSubtotal >= 0 ){
                setDiscount(discountValue);
      setSubtotal(newSubtotal);
     // setTax(newSubtotal * 0.2);
      setTotal(newSubtotal );
      setIsCouponApplied(true);
        }
        else{
          alert("This Coupon is not valid for this order");
        }


      }
      

    
    }else {
        alert("Invalid coupon code.");
      }

  };




  console.log(coupons)




useEffect(()=>{
  if (coupons.length === 0) {
    getCouponsDB();
    console.log("Get data From DB");
  }
},)


  return (

    <div class="flex justify-center my-0">

   
      <div class="flex flex-col w-full p-8  text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
        <div class="flex-1">

     
          <div class="my-4 mt-6 -mx-2 lg:flex">
            <div class="lg:px-2 lg:w-1/2">
              <div class="p-4 bg-gray-100 rounded-full">
                <h1 class="ml-2 font-bold uppercase">Coupon Code</h1>
              </div>
              <div class="p-4">
                <p class="mb-4 italic">If you have a coupon code, please enter it in the box below</p>
                <div class="justify-center md:flex">
                  <div className="flex items-center w-full h-13 pl-3 bg-white bg-gray-100 border rounded-full">
                   
                    <input
                      type="text"
                      name="code"
                      id="coupon"
                      onChange={onChangeCouponTxt}
                      placeholder="Apply coupon"
                      
                      className="w-full bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none"
                    />
                    <button
                      type="submit"
                      onClick={() => {
                        handleApplyCoupon();
                      }}
                      className="text-sm flex items-center px-3 py-1 text-white bg-gray-800 rounded-full outline-none md:px-4 hover:bg-gray-700 focus:outline-none active:outline-none"
                    >
                      <svg
                        aria-hidden="true"
                        data-prefix="fas"
                        data-icon="gift"
                        className="w-8"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z"
                        />
                      </svg>
                      <span className="font-medium">Apply coupon</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="p-4 mt-6 bg-gray-100 rounded-full">
                <h1 class="ml-2 font-bold uppercase">Instruction for seller</h1>
              </div>
              <div class="p-4">
                <p class="mb-4 italic">If you have some information for the seller you can leave them in the box below</p>
                <textarea class="w-full h-24 p-2 bg-gray-100 rounded"></textarea>
              </div>
            </div>
            <div class="lg:px-2 lg:w-1/2">
              <div class="p-4 bg-gray-100 rounded-full">
                <h1 class="ml-2 font-bold uppercase">Order Details</h1>
              </div>
              <div class="p-4">
                <p class="mb-6 italic">Shipping and additionnal costs are calculated based on values you have entered</p>
                  <div class="flex justify-between border-b">
                    <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      Subtotal
                    </div>
                    <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      LKR {tot}
                    </div>
                  </div>

                    <div class="flex justify-between pt-4 border-b">
                      <div class="flex lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-gray-800">
                        Coupon {": "}{couponCode}
                      </div>
                      <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-green-700">
                      LKR -{discount}
                      </div>
                    </div>

                      {isCouponApplied?
                                          <div class="flex justify-between pt-4 border-b">
                                          <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                           Coupon Applyed   <span> / </span>
                                           <button type="submit" onClick={clearCoupon} > Remove <svg aria-hidden="true" data-prefix="far" data-icon="trash-alt" class="w-4 text-red-600 hover:text-red-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12zM432 80h-82.41l-34-56.7A48 48 0 00274.41 0H173.59a48 48 0 00-41.16 23.3L98.41 80H16A16 16 0 000 96v16a16 16 0 0016 16h16v336a48 48 0 0048 48h288a48 48 0 0048-48V128h16a16 16 0 0016-16V96a16 16 0 00-16-16zM171.84 50.91A6 6 0 01177 48h94a6 6 0 015.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12z"/></svg> </button>
                                          </div>
                                          {cpnPer ? 
                                             <div class="lg:px-4 lg:py-2 my-2  lg:text-lg font-bold text-center text-gray-900">
                                                 {cpnPer}%  : {cpntype}
                                            </div>
                                          :
                                          <div class="lg:px-4 lg:py-2 my-2  lg:text-lg font-bold text-center text-gray-900">
                                            Rs.{cpnAmount} /=  {cpntype}
                                          </div>
                                          }

                                        </div>

                      :""}




                    <div class="flex justify-between pt-4 border-b">
                      <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                        New Subtotal
                      </div>
                      <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      LKR {subtotal}
                      </div>
                    </div>


                    <div class="flex justify-between pt-4 border-b">
                      <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                        Tax
                      </div>
                      <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      LKR{tax}
                      </div>
                    </div>


                    <div class="flex justify-between pt-4 border-b">
                      <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                        Total
                      </div>
                      <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      LKR{total}
                      </div>
                    </div>


                  <a href="#">
                    <button class="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                      <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" class="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"/></svg>
                      <span class="ml-2 mt-5px">Procceed to checkout</span>
                    </button>
                  </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>


  );
}

export default PromoPage;
