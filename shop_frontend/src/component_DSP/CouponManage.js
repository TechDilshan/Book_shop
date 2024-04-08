import React, { useState, useEffect } from 'react';
import  axios  from 'axios';
import { Link } from 'react-router-dom';
import logo from '../image/logo.jpg'

function CouponManage() {

    const [couponId , setCouponId] = useState('COUPON01');
    const [discountType, setDiscountType] = useState('Free_Deliver');
    const [discountPercentage, setDiscountPercentage] = useState('0');
    const [fixedAmount, setFixedAmount] = useState('');
    const [minCount , setMinCount] = useState();
    const [ExpDate , setExpDate] = useState("(Exp Date)");
    const [description , setDescription] = useState('Description');
    const [couponVisibility, setCouponVisibility] = useState('All_Users');
    const [cusId, setCustomerId] = useState('');

    const [coupons , setCoupons] = useState([])

    const [searchQuery, setSearchQuery] = useState('');
    const [originalCoupons, setOriginalCoupons] = useState([]);

    const [IdSet,setIdSet] = useState(null);

    const getCouponsDB = () =>{
      axios.get("http://localhost:3001/api/getcoupon/")
      .then((res) =>{
        setCoupons(res.data);    
        setOriginalCoupons(res.data);
      })
      .catch((err) =>{
        alert(err.message);
      });
    }

    const handleDelete = (cusId) => {
      axios.delete(`http://localhost:3001/api/deletecoupon/${cusId}`)
        .then(() => {
          alert("Student deleted successfully!");
          getCouponsDB();
         // setSearchQuery(''); // Clear the search query after deletion
        })
        .catch((err) => {
          alert(err.message);
        });
    };


    const handleupdate = (cusId) => {
      ClearData();
      axios.get(`http://localhost:3001/api/getcoupon/${cusId}`)
        .then((res) => {
          console.log(res.data.user)
          setCouponId(res.data.user.couponId);
          setDiscountType(res.data.user.discountType);
          setCouponVisibility(res.data.user.couponVisibility            );
          setDiscountPercentage(res.data.user.discountPercentage);
          setFixedAmount(res.data.user.fixedAmount);
          setMinCount(res.data.user.minCount);
          setExpDate(res.data.user.ExpDate);
          setDescription(res.data.user.description);
          setCustomerId(res.data.user.cusId);
          setIdSet(res.data.user._id)

        })
        .catch((err) => {
          alert(err.message);
        });
    };
    const ClearData = () =>{
      setCouponId("");
      setDiscountType('');
      setCouponVisibility('All_Users');
      setDiscountPercentage("0");
      setFixedAmount("");
      setMinCount("");
      setExpDate("(Exp Date)");
      setDescription("");
      setCustomerId("");
      setIdSet("");

      document.getElementById('couponCode').value = "";
      //document.getElementById('discountType').value = 'freeDeliver';
      //document.getElementById('discountPercentage').value = "";
      //document.getElementById('fixedAmount').value = "";
      document.getElementById('minPurchaseCount').value = "";
      document.getElementById('expirationDate').value = 'Today';
      document.getElementById('description').value = "";
      //document.getElementById('couponVisibility').value = 'allUsers';
      //document.getElementById('cusId').value = "";

    }

    function sendUpdatedData(){
      const cpnup ={
        couponId,
        discountType,
        discountPercentage,
        fixedAmount,
        minCount,
        ExpDate,
        couponVisibility,
        cusId,
        description
      }


    
      axios.put(`http://localhost:3001/api/updatecoupon/${IdSet}`,cpnup).then(()=>{
          
      alert("Coupon Updated successfully");
      getCouponsDB();
      ClearData();
  
      }).catch((err)=>{
         
          alert(err.message); 
      })}


    function sendData(e){
      e.preventDefault();      


      const newCoupon ={
        couponId,
        discountType,
        discountPercentage,
        fixedAmount,
        minCount,
        ExpDate,
        couponVisibility,
        cusId,
        description
      }



      console.log(newCoupon);
      axios.post("http://localhost:3001/api/addcoupon",newCoupon).then(()=>{
          
         

      alert("Coupon added successfully");
      getCouponsDB();
      ClearData();
          

      }).catch((err)=>{
         
          alert(err.message); 
      })
  }

  

    useEffect(()=>{
      if (coupons.length === 0) {
        getCouponsDB();
        console.log("Get data From DB");
      }
    },)
  
  
    const handleDiscountTypeChange = (event) => {
      setDiscountType(event.target.value);

      if (discountType === "Percentage_Discount") {
        setDiscountPercentage('0');
        setFixedAmount('');
      } else if (discountType === "fixedAmount") {
        setFixedAmount('0');
        setDiscountPercentage('');
      }

      
    };
  
    const handleCouponVisibilityChange = (event) => {
      setCouponVisibility(event.target.value);

        setCustomerId('');
    };


    const handleInputChange = (e) => {
      const query = e.target.value.toLowerCase();
      setSearchQuery(query);
  
      // Filter students based on the search query as you type
      const filteredCoupons = originalCoupons.filter(coupon =>
        coupon.couponId.toLowerCase().includes(query) || coupon.ExpDate.toLowerCase().includes(query)
      );
      setCoupons(filteredCoupons);
    };
      
  return (
    <div class="w-full h-screen px-24 bg-white">
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


<br/>

   
    <div class="flex">
 
 <div class="container mx-auto">
 <div class="bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-center py-10 px-20 rounded-lg shadow-md relative">
           <img src={logo} class="w-20 mx-auto mb-4 rounded-lg" />
           <h3 class="text-2xl font-semibold mb-4">{description}<br />{discountPercentage} % </h3>
           <div class="flex items-center space-x-2 mb-1">
             <span id="cpnCode" class="border-dashed border text-white px-4 py-2 rounded-l" value="STEALDEAL20">{couponId}</span>
             <button onClick={() => navigator.clipboard.writeText(couponId)}> <span id="cpnBtn" class="border border-white bg-white text-purple-600 px-4 py-2 rounded-r cursor-pointer">Copy Code</span> 
             </button>
           </div>
           <p class="text-sm">Valid Till: {ExpDate}</p>
           
     <div class="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
     <div class="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>
     

         </div>
       </div>
</div>
<br/>

    <div class="overflow-x-auto overflow-y-auto">
        <table class="w-full border-collapse border border-gray-300">
            <thead>
                <tr class="bg-gray-200">
                    <th class="border-y border-gray-100 bg-gray-50/50 p-2">Coupon Code</th>
                    <th class="border-y border-gray-100 bg-gray-50/50 p-2">Discount Type</th>
                    <th class="border-y border-gray-100 bg-gray-50/50 p-2">Minimum Purchase Count</th>
                    <th class="border-y border-gray-100 bg-gray-50/50 p-2">Expiration Date</th>
                    <th class="border-y border-gray-100 bg-gray-50/50 p-2">Description</th>
                    <th class="border-y border-gray-100 bg-gray-50/50 p-2">Coupon Visibility</th>
                    <th class="border-y border-gray-100 bg-gray-50/50 p-2">Edit</th>
                    <th class="border-y border-gray-100 bg-gray-50/50 p-2">Delete</th>
                </tr>
            </thead>
            <tbody id="attendees-list">

            {coupons.map((cpn) => (
            <tr key={cpn._id}>
              <td class="border border-gray-300 px-4 py-2">{cpn.couponId}</td>
              <td class="border border-gray-300 px-4 py-2"><i>Type</i><b>{cpn.discountType}</b><br/>  <i>Percentage</i><b>{cpn.discountPercentage}%</b><br/>   <i>Amount</i><b>RS: {cpn.fixedAmount} </b></td>
              <td class="border border-gray-300 px-4 py-2">{cpn.minCount}</td>
              <td class="border border-gray-300 px-4 py-2">{cpn.ExpDate}</td>
              <td class="border border-gray-300 px-4 py-2">{cpn.description}</td>
              <td class="border border-gray-300 px-4 py-2"><i>User_Type</i><b>{cpn.couponVisibility} </b><br/><i> Customer ID</i><b>{cpn.cusId}</b></td>
              <td class="border border-gray-300 px-4 py-2">
            
              <button
                  className="btn btn-danger"
                  onClick={() => handleupdate(cpn._id)}  >
                            <svg class="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path fill-rule="evenodd" d="M8 7V2.2a2 2 0 0 0-.5.4l-4 3.9a2 2 0 0 0-.3.5H8Zm2 0V2h7a2 2 0 0 1 2 2v.1a5 5 0 0 0-4.7 1.4l-6.7 6.6a3 3 0 0 0-.8 1.6l-.7 3.7a3 3 0 0 0 3.5 3.5l3.7-.7a3 3 0 0 0 1.5-.9l4.2-4.2V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z" clip-rule="evenodd"/>
    <path fill-rule="evenodd" d="M17.4 8a1 1 0 0 1 1.2.3 1 1 0 0 1 0 1.6l-.3.3-1.6-1.5.4-.4.3-.2Zm-2.1 2.1-4.6 4.7-.4 1.9 1.9-.4 4.6-4.7-1.5-1.5ZM17.9 6a3 3 0 0 0-2.2 1L9 13.5a1 1 0 0 0-.2.5L8 17.8a1 1 0 0 0 1.2 1.1l3.7-.7c.2 0 .4-.1.5-.3l6.6-6.6A3 3 0 0 0 18 6Z" clip-rule="evenodd"/>
  </svg>
              </button>
                </td>

                <td class="border border-gray-300 px-4 py-2">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(cpn._id)}
                >
                  <svg class="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
  </svg>
                </button>
              </td>
              <td>
                <Link to={`/update/${cpn._id}`} className="btn btn-success">
  
                </Link>
                </td>
            </tr>
          ))}
               
                <tr>
                  
                    <td class="border border-gray-300 px-4 py-2">
                        <div class="mb-4">
                        <label for="couponCode" class="block text-sm font-medium text-gray-600">Coupon Code</label>
                        <input type="text" id="couponCode" name="couponCode" class="mt-1 p-2 w-full border rounded-md"   value={couponId}                   
                        onChange={(e)=>{
                        setCouponId(e.target.value);
                        setDiscountType('Free_Deliver');
                        setCouponVisibility('All_Users');

                    }}
                    />
                    </div>
                    </td>
                    <td class="border border-gray-300 px-4 py-2">


                    <div className="mb-4">
        <label htmlFor="discountType" className="block text-sm font-medium text-gray-600">
          Discount Type
        </label>
        <select
          id="discountType"
          name="discountType"
          className="mt-1 p-2 w-full border rounded-md"
          value={discountType}
          onChange={ handleDiscountTypeChange}
        >
          <option value="Free_Deliver">Free Deliver</option>
          <option value="Percentage_Discount">Percentage Discount</option>
          <option value="fixedAmount">Fixed Amount</option>
        </select>
      </div>

      {discountType === 'Percentage_Discount' && (
        <div className="mb-4">
          <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-600">
            Discount Percentage
          </label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
      )}

      {discountType === 'fixedAmount' && (
        <div className="mb-4">
          <label htmlFor="fixedAmount" className="block text-sm font-medium text-gray-600">
            Fixed Amount
          </label>
          <input
            type="number"
            id="fixedAmount"
            name="fixedAmount"
            value={fixedAmount}
            onChange={(e) => setFixedAmount(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
      )} 
                    </td>

                    <td class="border border-gray-300 px-4 py-2">
                    <div class="mb-4">
        <label for="minPurchaseCount" class="block text-sm font-medium text-gray-600">Minimum Purchase Count</label>
        <input type="number" id="minPurchaseCount" name="minPurchaseCount" value={minCount} class="mt-1 p-2 w-full border rounded-md"  onChange={(e) => setMinCount(e.target.value)}/>
      </div>
      </td>
                    <td class="border border-gray-300 px-4 py-2">
                    <div class="mb-4">
        <label for="expirationDate" class="block text-sm font-medium text-gray-600">Expiration Date</label>
        <input type="datetime-local" id="expirationDate" name="expirationDate" class="mt-1 p-2 w-full border rounded-md" value={ExpDate} onChange={(e) => setExpDate(e.target.value)}/>
      </div></td>
      <td class="border border-gray-300 px-4 py-2">
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-600">Description</label>
        <textarea id="description" name="description" placeholder='Type Description Here...' rows="3" value={description} className="mt-1 p-2 w-full border rounded-md border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      </td>

      <td class="border border-gray-300 px-4 py-2">
      <div className="mb-4">
        <label htmlFor="couponVisibility" className="block text-sm font-medium text-gray-600">
          Coupon Visibility
        </label>
        <select
          id="couponVisibility"
          name="couponVisibility"
          className="mt-1 p-2 w-full border rounded-md"
          value={couponVisibility}
          onChange={handleCouponVisibilityChange} >
       
          <option value="All_Users">All Users</option>
          <option value="One_User">One User</option>
        </select>
      </div>

      {couponVisibility === 'One_User' && (
        <div className="mb-4" id="customerIdField">
          <label htmlFor="cusId" className="block text-sm font-medium text-gray-600">
            Customer ID
          </label>
          <input
            type="text"
            id="cusId"
            name="cusId"
            value={cusId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
      )}
      </td>
                    <td class="border border-gray-300 px-4 py-2">
                        <button class="p-2 text-red-600 " onClick={ClearData}>
                            <svg class="w-6 h-6 " stroke="currentColor" fill="none"  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                            <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
                            </svg>
                        </button>
                        
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="flex w-2/3 justify-center mx-auto mt-8">
        <div>
       
        
        {IdSet ? 
            <button onClick={sendUpdatedData} class="select-none font-bold  text-xs py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-900 text-white shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 flex  gap-3 mt-4" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" stroke-width="2" class="h-4 w-4"><path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                </svg> 
               "UPDATE COUPON" 

            </button>
            
            : 
            <button onClick={sendData} class="select-none font-bold  text-xs py-2 px-4 rounded-lg  bg-gray-700 hover:bg-gray-900 text-white shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 flex  gap-3 mt-4" type="submit">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
</svg>

           "ADD COUPON" 
          
            </button>
        }


            {IdSet ?
            <button class=" m-2 ml-10 select-none font-bold  text-xs py-2 px-4 rounded-lg bg-red-900 hover:bg-red-600 text-white shadow-red-900/10 hover:shadow-lg hover:shadow-gray-900" onClick={ClearData}>
                            CANCEL
                        </button>:""
                        }
            
        </div>


    </div>

    



    <div class="w-full pt-5 px-4 mb-8 mx-auto text-center ">
        
    </div>

</div>








  );
}

export default CouponManage;



