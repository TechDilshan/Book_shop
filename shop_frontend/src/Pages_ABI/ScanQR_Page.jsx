import React from 'react'
import ScanQR from '../Components_ABI/ScanQR'
import Dashboard from '../Components_ABI/Dashboard'

const ScanQR_Page = () => {
  return (
    <div className='scanQR_Page'>
      <Dashboard />
        <ScanQR />
    </div>
  )
}

export default ScanQR_Page