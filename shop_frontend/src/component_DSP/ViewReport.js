import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import CouponReport from './CouponReport';

function ViewReport() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCouponsDB = () => {
    setLoading(true);
    axios.get("http://localhost:3001/api/getcoupon/")
      .then((res) => {
        setCoupons(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }

        
  useEffect(()=>{
    getCouponsDB()
  })

  return (
    <div>

      {error && <p>Error: {error}</p>}
      {coupons.length > 0 && (
        <div>
          <CouponReport coupons={coupons} />
        </div>
      )}
      { coupons.length === 0 && (
        <p>No coupons available to display.</p>
      )}
    </div>
  );
}

export default ViewReport;
