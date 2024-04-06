import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateCoupon() {

  const [uuid , setuuid] = useState(null);
  const { UID } = useParams();
  const [couponInfo, setCouponInfo] = useState(null);
  
  const [updatedInfo, setUpdatedInfo] = useState({
    couponId: '',
    discountType: '',
    discountPercentage: '',
    fixedAmount: '',    
    minCount: '', 
    ExpDate: '',
    description: '',    
    couponVisibility:'',
    cusId: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo(prevState => ({
      ...prevState,
      [name]: value // Update the corresponding field in updatedInfo state
    }));
  };

  



  function sendUpdatedData(e){

    console.log(updatedInfo);
    axios.put(`http://localhost:3001/api/updatecoupon/${UID}`,updatedInfo).then(()=>{
        
    alert("Coupon Updated successfully");
        

    }).catch((err)=>{
       
        alert(err.message); 
    })
}



  useEffect(() => {
  
    axios.get(`http://localhost:3001/api/getcoupon/${UID}`)
      .then(res => {
        
        setCouponInfo(res.data.user);
        setUpdatedInfo(res.data.user); 
        console.log(res.data.user)
      
      })
      .catch(error => {
        alert('Error fetching user information:', error)
        console.error(`Error fetching user information: ${error}`, );
      });
  }, [UID]);


  return (
    <div className="container mx-auto px-[20%] py-10">
      <form onSubmit={sendUpdatedData} className="space-y-4">
        
        <div className="mb-4">
          <label htmlFor="couponId" className="block text-sm font-medium text-gray-600">Coupon Code</label>
          <input type="text" id="couponId" name="couponId" value={updatedInfo.couponId} onChange={handleInputChange}  className="mt-1 p-2 w-full border rounded-md"/>
        </div>

   
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Discount Type</label>
          <select id="discountType" name="discountType" value={updatedInfo.discountType} onChange={handleInputChange}  className="mt-1 p-2 w-full border rounded-md" >
            <option value="Percentage_Discount">Percentage Discount</option>
            <option value="fixedAmount">Fixed Amount</option>
            <option value="Free_Deliver">Free Shipping</option>
          </select>
        </div>

        <div className="mb-4" id="discountPercentageField">
          <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-600">Discount Percentage</label>
          <input type="number" id="discountPercentage" name="discountPercentage" value={updatedInfo.discountPercentage} onChange={handleInputChange}  className="mt-1 p-2 w-full border rounded-md"/>
        </div>

       
        <div className="mb-4" id="fixedAmountField" >
          <label htmlFor="fixedAmount" className="block text-sm font-medium text-gray-600">Fixed Amount</label>
          <input type="number" id="fixedAmount" name="fixedAmount" value={updatedInfo.fixedAmount} onChange={handleInputChange}  className="mt-1 p-2 w-full border rounded-md"/>
        </div>

       
        <div className="mb-4">
          <label htmlFor="minCount" className="block text-sm font-medium text-gray-600">Minimum Purchase Count</label>
          <input type="number" id="minCount" name="minCount" value={updatedInfo.minCount} onChange={handleInputChange}   className="mt-1 p-2 w-full border rounded-md"/>
        </div>

       
        <div className="mb-4">
          <label htmlFor="ExpDate
" className="block text-sm font-medium text-gray-600">Expiration Date</label>
          <input type="date" id="ExpDate" name="ExpDate" value={updatedInfo.ExpDate} onChange={handleInputChange}  className="mt-1 p-2 w-full border rounded-md"/>
        </div>

       
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">description</label>
          <textarea id="description" name="description" value={updatedInfo.description} onChange={handleInputChange}  rows="3" className="mt-1 p-2 w-full border rounded-md"></textarea>
        </div>

      
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Coupon Visibility</label>
          <select id="couponVisibility" name="couponVisibility" value={updatedInfo.couponVisibility} onChange={handleInputChange}  className="mt-1 p-2 w-full border rounded-md" >
            <option value="All_Users">All Users</option>
            <option value="One_User">One User</option>
          </select>
        </div>

        
        <div className="mb-4" id="cusIdField" >
          <label htmlFor="cusId" className="block text-sm font-medium text-gray-600">Customer ID</label>
          <input type="text" id="cusId" name="cusId" value={updatedInfo.cusId} onChange={handleInputChange}  className="mt-1 p-2 w-full border rounded-md"/>
        </div>

      
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"> {uuid ? "Update Product" : "Add Product"}</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateCoupon;
